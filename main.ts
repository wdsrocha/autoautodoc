import * as puppeteer from "puppeteer";

const towers = [
  { id: "10783", name: "Torre 1" },
  { id: "10787", name: "Torre 2" },
  { id: "10795", name: "Torre 3" },
  { id: "10790", name: "Torre 4" },
  { id: "10792", name: "Torre 5" },
  { id: "10789", name: "Torre 6" },
  { id: "10794", name: "Torre 7" },
  { id: "10791", name: "Torre 8" },
  { id: "10788", name: "Torre 9" },
  { id: "10793", name: "Torre 10" },
];

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function clickOnElement(page, elem, x = null, y = null) {
  const rect = await page.evaluate((el) => {
    const { top, left, width, height } = el.getBoundingClientRect();
    return { top, left, width, height };
  }, elem);

  // Use given position or default to center
  const _x = x !== null ? x : rect.width / 2;
  const _y = y !== null ? y : rect.height / 2;

  await page.mouse.click(rect.left + _x, rect.top + _y);
}

async function scrollDown(page: puppeteer.Page, distance: number) {
  await page.evaluate((distance) => {
    window.scrollBy(0, distance);
  }, distance);
}

async function scrollTo(page: puppeteer.Page, y: number) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
}

async function scrollToTop(page: puppeteer.Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}

async function scrollToBottom(page: puppeteer.Page) {
  await page.evaluate(() => {
    window.scrollTo(0, window.document.body.scrollHeight);
  });
}

async function login(page: puppeteer.Page) {
  await page.goto("https://fvs2.autodoc.com.br/");
  await page.click("#popUp > div > div > div.modal-footer > button");
  await page.type(
    "#login-box-inner > form > div:nth-child(1) > input",
    process.env.LOGIN_EMAIL
  );
  await page.type(
    "#login-box-inner > form > div:nth-child(2) > input",
    process.env.LOGIN_PASSWORD
  );
  await page.click("#login-box-inner > form > div:nth-child(4) > div > button");
}

async function inspectPavement(page: puppeteer.Page) {
  const stepCount = (await page.$$(`#div-locais > div > table > tbody > tr`))
    .length;
  for (let step = 1; step <= stepCount; step++) {
    const element = await page.$(
      `#div-locais > div > table > tbody > tr:nth-child(${step})`
    );
    const elementVisible = await page.$eval(
      `#div-locais > div > table > tbody > tr:nth-child(${step})`,
      (element) => {
        return (
          window.getComputedStyle(element).getPropertyValue("display") !==
          "none"
        );
      }
    );
    if (elementVisible) {
      await scrollTo(page, step * 36);
      await clickOnElement(page, element, 20);
    }
  }
  await scrollToBottom(page);
  await page.click(
    "#tipoAcao > div.div-painel-conteudo > table > tbody > tr > td:nth-child(1) > input[type=radio]"
  );
  await page.select("#status", "1456");
  await page.click("#gravar-inspecao");
  await delay(3000);
}

async function inspectService(page: puppeteer.Page) {
  const pavementCount = (
    await page.$$("#div-locais > div > div > select > option")
  ).length;
  for (let pavement = 1; pavement <= pavementCount; pavement++) {
    try {
      await inspectPavement(page);
    } catch (e) {
      const path = `${Math.random()}.png`;
      await page.screenshot({ path });
      console.error({
        message: `>>> Pavement failed - see screenshot file: ${path}`,
        error: e,
      });
    }

    if (pavement + 1 <= pavementCount) {
      await scrollToTop(page);
      await page.select(
        "#div-locais > div > div > select",
        String(pavement + 1)
      );
      await delay(3000);
    }
  }
  await delay(3000);
}

async function inspectTower(page: puppeteer.Page) {
  await delay(3000);
  const url = page.url();
  const serviceCount = (await page.$$("#tbl-inspecao > tbody > tr")).length;
  for (let i = 1; i <= serviceCount; i++) {
    scrollDown(page, 31 * i);

    const rowElements = await page.$$(
      `#tbl-inspecao > tbody > tr:nth-child(${i}) > td`
    );
    if (!rowElements.length) {
      throw new Error("No row elements found.");
    }

    const serviceName = await page.evaluate(
      (element) => element.textContent,
      rowElements[0]
    );

    let serviceNeedsInspection = false;
    for (let j = 3; j < rowElements.length; j++) {
      const pavementNeedsInspection = await page.evaluate(
        (element) =>
          !String(element.textContent).includes("Status: Inspeção Concluído"),
        rowElements[j]
      );
      if (pavementNeedsInspection) {
        await rowElements[j].click();
        serviceNeedsInspection = true;
      }
    }

    if (!serviceNeedsInspection) {
      continue;
    }

    const element = await page.$(`#tbl-inspecao > tbody > tr:nth-child(${i})`);
    await clickOnElement(page, element, 20);
    await scrollToBottom(page);

    await page.click("#div-botao-acao > input[type=radio]:nth-child(1)");
    await delay(1000);
    await page.click("#editarPavimento");
    await delay(3000);

    try {
      console.log(`>>> Inspecting service ${i} - "${serviceName}"`);
      await inspectService(page);
    } catch (e) {
      const path = `${Math.random()}.png`;
      await page.screenshot({ path });
      console.error({
        message: `>>> Service failed - see screenshot file: ${path}`,
        error: e,
      });
    }
    await page.goto(url);
    await delay(3000);
    await scrollToTop(page);
  }
}

async function inspectAllTowers(page: puppeteer.Page) {
  const url = "https://fvs2.autodoc.com.br/inspecaoReinspecao/index";
  for (let i = 0; i < towers.length; i++) {
    await page.goto(url);
    await page.select("#obra_id", "1354");
    await page.click(
      "body > div.container > div:nth-child(3) > div.div-painel-conteudo > form > table > tbody > tr:nth-child(1) > td:nth-child(3) > input[type=radio]:nth-child(1)"
    );
    await delay(1000);

    const { id: tower, name } = towers[i];
    await page.select("#torre_id", tower);
    await delay(1000);

    await page.click("#servico_id > input[type=checkbox]:nth-child(1)");
    await page.click(
      "body > div.container > div:nth-child(3) > div.div-painel-conteudo > form > table > tbody > tr:nth-child(5) > td > input"
    );

    try {
      console.log(`>>> Inspecting tower ${tower} - "${name}"`);
      await inspectTower(page);
    } catch (e) {
      const path = `${Math.random()}.png`;
      await page.screenshot({ path });
      console.error({
        message: `>>> Tower failed - see screenshot file: ${path}`,
        error: e,
      });
    }
  }
}

async function setup() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const pages = await browser.pages();
  const page = pages[0];
  await login(page);
  return [browser, page] as const;
}

async function testInspectService() {
  const [, page] = await setup();
  page.goto(
    "https://fvs2.autodoc.com.br/inspecaoReinspecao/localTorre?obra_id=1354&pavServ%5B%5D=1-9782&pavimentoServicoParecer%5B%5D=1-9782-1&pavServ%5B%5D=2-9782&pavimentoServicoParecer%5B%5D=2-9782-1&pavServ%5B%5D=3-9782&pavimentoServicoParecer%5B%5D=3-9782-1&pavServ%5B%5D=4-9782&pavimentoServicoParecer%5B%5D=4-9782-1&pavServ%5B%5D=5-9782&pavimentoServicoParecer%5B%5D=5-9782-1&torre_id=10783&naoAvaliado=1&statusInspecao_id%5B%5D=1456&statusInspecao_id%5B%5D=1457&statusInspecao_id%5B%5D=1458&statusInspecao_id%5B%5D=1459&statusInspecao_id%5B%5D=1460&statusInspecao_id%5B%5D=1461&statusInspecao_id%5B%5D=1462"
  );
  await inspectService(page);
}

async function testInspectTower() {
  const [, page] = await setup();
  page.goto(
    "https://fvs2.autodoc.com.br/inspecaoReinspecao/torre?obra_id=1354&tipo=1&torre_id=10787&servico_id%5B%5D=9782&servico_id%5B%5D=9783&servico_id%5B%5D=9784&servico_id%5B%5D=9785&servico_id%5B%5D=9786&servico_id%5B%5D=9787&servico_id%5B%5D=10259&servico_id%5B%5D=8244&servico_id%5B%5D=10549&servico_id%5B%5D=10550&servico_id%5B%5D=11150&servico_id%5B%5D=8263&servico_id%5B%5D=8268&servico_id%5B%5D=11399&servico_id%5B%5D=12419&servico_id%5B%5D=8286&servico_id%5B%5D=8293&servico_id%5B%5D=10260&servico_id%5B%5D=9789&servico_id%5B%5D=9790&servico_id%5B%5D=8321&servico_id%5B%5D=8306&servico_id%5B%5D=8314&servico_id%5B%5D=8315&servico_id%5B%5D=8316&servico_id%5B%5D=8328&servico_id%5B%5D=8332&servico_id%5B%5D=8334&servico_id%5B%5D=8333&servico_id%5B%5D=8330&servico_id%5B%5D=8329&servico_id%5B%5D=8326&servico_id%5B%5D=10551"
  );
  await inspectTower(page);
}

async function run() {
  const [browser, page] = await setup();
  await inspectAllTowers(page);
  await browser.close();
}

(async () => {
  await run();
})();
