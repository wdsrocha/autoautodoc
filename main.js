"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var towers = [
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
function clickOnElement(page, elem, x, y) {
    if (x === void 0) { x = null; }
    if (y === void 0) { y = null; }
    return __awaiter(this, void 0, void 0, function () {
        var rect, _x, _y;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (el) {
                        var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
                        return { top: top, left: left, width: width, height: height };
                    }, elem)];
                case 1:
                    rect = _a.sent();
                    _x = x !== null ? x : rect.width / 2;
                    _y = y !== null ? y : rect.height / 2;
                    return [4 /*yield*/, page.mouse.click(rect.left + _x, rect.top + _y)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function scrollDown(page, distance) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (distance) {
                        window.scrollBy(0, distance);
                    }, distance)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function scrollTo(page, y) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (y) { return window.scrollTo(0, y); }, y)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function scrollToTop(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function () {
                        window.scrollTo(0, 0);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function scrollToBottom(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function () {
                        window.scrollTo(0, window.document.body.scrollHeight);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function login(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto("https://fvs2.autodoc.com.br/")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.click("#popUp > div > div > div.modal-footer > button")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.type("#login-box-inner > form > div:nth-child(1) > input", process.env.LOGIN_EMAIL)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.type("#login-box-inner > form > div:nth-child(2) > input", process.env.LOGIN_PASSWORD)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.click("#login-box-inner > form > div:nth-child(4) > div > button")];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function inspectPavement(page) {
    return __awaiter(this, void 0, void 0, function () {
        var stepCount, step, element, elementVisible;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$$("#div-locais > div > table > tbody > tr")];
                case 1:
                    stepCount = (_a.sent())
                        .length;
                    step = 1;
                    _a.label = 2;
                case 2:
                    if (!(step <= stepCount)) return [3 /*break*/, 8];
                    return [4 /*yield*/, page.$("#div-locais > div > table > tbody > tr:nth-child(" + step + ")")];
                case 3:
                    element = _a.sent();
                    return [4 /*yield*/, page.$eval("#div-locais > div > table > tbody > tr:nth-child(" + step + ")", function (element) {
                            return (window.getComputedStyle(element).getPropertyValue("display") !==
                                "none");
                        })];
                case 4:
                    elementVisible = _a.sent();
                    if (!elementVisible) return [3 /*break*/, 7];
                    return [4 /*yield*/, scrollTo(page, step * 36)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, clickOnElement(page, element, 20)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    step++;
                    return [3 /*break*/, 2];
                case 8: return [4 /*yield*/, scrollToBottom(page)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.click("#tipoAcao > div.div-painel-conteudo > table > tbody > tr > td:nth-child(1) > input[type=radio]")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, page.select("#status", "1456")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, page.click("#gravar-inspecao")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function inspectService(page) {
    return __awaiter(this, void 0, void 0, function () {
        var pavementCount, pavement, e_1, path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$$("#div-locais > div > div > select > option")];
                case 1:
                    pavementCount = (_a.sent()).length;
                    pavement = 1;
                    _a.label = 2;
                case 2:
                    if (!(pavement <= pavementCount)) return [3 /*break*/, 12];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 7]);
                    return [4 /*yield*/, inspectPavement(page)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_1 = _a.sent();
                    path = Math.random() + ".png";
                    return [4 /*yield*/, page.screenshot({ path: path })];
                case 6:
                    _a.sent();
                    console.error({
                        message: ">>> Pavement failed - see screenshot file: " + path,
                        error: e_1
                    });
                    return [3 /*break*/, 7];
                case 7:
                    if (!(pavement + 1 <= pavementCount)) return [3 /*break*/, 11];
                    return [4 /*yield*/, scrollToTop(page)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.select("#div-locais > div > div > select", String(pavement + 1))];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    pavement++;
                    return [3 /*break*/, 2];
                case 12: return [4 /*yield*/, delay(3000)];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function inspectTower(page) {
    return __awaiter(this, void 0, void 0, function () {
        var url, serviceCount, i, rowElements, serviceName, serviceNeedsInspection, j, pavementNeedsInspection, element, e_2, path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay(3000)];
                case 1:
                    _a.sent();
                    url = page.url();
                    return [4 /*yield*/, page.$$("#tbl-inspecao > tbody > tr")];
                case 2:
                    serviceCount = (_a.sent()).length;
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= serviceCount)) return [3 /*break*/, 27];
                    scrollDown(page, 31 * i);
                    return [4 /*yield*/, page.$$("#tbl-inspecao > tbody > tr:nth-child(" + i + ") > td")];
                case 4:
                    rowElements = _a.sent();
                    if (!rowElements.length) {
                        throw new Error("No row elements found.");
                    }
                    return [4 /*yield*/, page.evaluate(function (element) { return element.textContent; }, rowElements[0])];
                case 5:
                    serviceName = _a.sent();
                    serviceNeedsInspection = false;
                    j = 3;
                    _a.label = 6;
                case 6:
                    if (!(j < rowElements.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, page.evaluate(function (element) {
                            return !String(element.textContent).includes("Status: Inspeção Concluído");
                        }, rowElements[j])];
                case 7:
                    pavementNeedsInspection = _a.sent();
                    if (!pavementNeedsInspection) return [3 /*break*/, 9];
                    return [4 /*yield*/, rowElements[j].click()];
                case 8:
                    _a.sent();
                    serviceNeedsInspection = true;
                    _a.label = 9;
                case 9:
                    j++;
                    return [3 /*break*/, 6];
                case 10:
                    if (!serviceNeedsInspection) {
                        return [3 /*break*/, 26];
                    }
                    return [4 /*yield*/, page.$("#tbl-inspecao > tbody > tr:nth-child(" + i + ")")];
                case 11:
                    element = _a.sent();
                    return [4 /*yield*/, clickOnElement(page, element, 20)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, scrollToBottom(page)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, page.click("#div-botao-acao > input[type=radio]:nth-child(1)")];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, delay(1000)];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, page.click("#editarPavimento")];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18:
                    _a.trys.push([18, 20, , 22]);
                    console.log(">>> Inspecting service " + i + " - \"" + serviceName + "\"");
                    return [4 /*yield*/, inspectService(page)];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 22];
                case 20:
                    e_2 = _a.sent();
                    path = Math.random() + ".png";
                    return [4 /*yield*/, page.screenshot({ path: path })];
                case 21:
                    _a.sent();
                    console.error({
                        message: ">>> Service failed - see screenshot file: " + path,
                        error: e_2
                    });
                    return [3 /*break*/, 22];
                case 22: return [4 /*yield*/, page.goto(url)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, scrollToTop(page)];
                case 25:
                    _a.sent();
                    _a.label = 26;
                case 26:
                    i++;
                    return [3 /*break*/, 3];
                case 27: return [2 /*return*/];
            }
        });
    });
}
function inspectAllTowers(page) {
    return __awaiter(this, void 0, void 0, function () {
        var url, i, _a, tower, name_1, e_3, path;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = "https://fvs2.autodoc.com.br/inspecaoReinspecao/index";
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < towers.length)) return [3 /*break*/, 15];
                    return [4 /*yield*/, page.goto(url)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, page.select("#obra_id", "1354")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, page.click("body > div.container > div:nth-child(3) > div.div-painel-conteudo > form > table > tbody > tr:nth-child(1) > td:nth-child(3) > input[type=radio]:nth-child(1)")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, delay(1000)];
                case 5:
                    _b.sent();
                    _a = towers[i], tower = _a.id, name_1 = _a.name;
                    return [4 /*yield*/, page.select("#torre_id", tower)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, delay(1000)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.click("#servico_id > input[type=checkbox]:nth-child(1)")];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, page.click("body > div.container > div:nth-child(3) > div.div-painel-conteudo > form > table > tbody > tr:nth-child(5) > td > input")];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 12, , 14]);
                    console.log(">>> Inspecting tower " + tower + " - \"" + name_1 + "\"");
                    return [4 /*yield*/, inspectTower(page)];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 12:
                    e_3 = _b.sent();
                    path = Math.random() + ".png";
                    return [4 /*yield*/, page.screenshot({ path: path })];
                case 13:
                    _b.sent();
                    console.error({
                        message: ">>> Tower failed - see screenshot file: " + path,
                        error: e_3
                    });
                    return [3 /*break*/, 14];
                case 14:
                    i++;
                    return [3 /*break*/, 1];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, pages, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        headless: false,
                        defaultViewport: null
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    pages = _a.sent();
                    page = pages[0];
                    return [4 /*yield*/, login(page)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, [browser, page]];
            }
        });
    });
}
function testInspectService() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, page;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), page = _a[1];
                    page.goto("https://fvs2.autodoc.com.br/inspecaoReinspecao/localTorre?obra_id=1354&pavServ%5B%5D=1-9782&pavimentoServicoParecer%5B%5D=1-9782-1&pavServ%5B%5D=2-9782&pavimentoServicoParecer%5B%5D=2-9782-1&pavServ%5B%5D=3-9782&pavimentoServicoParecer%5B%5D=3-9782-1&pavServ%5B%5D=4-9782&pavimentoServicoParecer%5B%5D=4-9782-1&pavServ%5B%5D=5-9782&pavimentoServicoParecer%5B%5D=5-9782-1&torre_id=10783&naoAvaliado=1&statusInspecao_id%5B%5D=1456&statusInspecao_id%5B%5D=1457&statusInspecao_id%5B%5D=1458&statusInspecao_id%5B%5D=1459&statusInspecao_id%5B%5D=1460&statusInspecao_id%5B%5D=1461&statusInspecao_id%5B%5D=1462");
                    return [4 /*yield*/, inspectService(page)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function testInspectTower() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, page;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), page = _a[1];
                    page.goto("https://fvs2.autodoc.com.br/inspecaoReinspecao/torre?obra_id=1354&tipo=1&torre_id=10787&servico_id%5B%5D=9782&servico_id%5B%5D=9783&servico_id%5B%5D=9784&servico_id%5B%5D=9785&servico_id%5B%5D=9786&servico_id%5B%5D=9787&servico_id%5B%5D=10259&servico_id%5B%5D=8244&servico_id%5B%5D=10549&servico_id%5B%5D=10550&servico_id%5B%5D=11150&servico_id%5B%5D=8263&servico_id%5B%5D=8268&servico_id%5B%5D=11399&servico_id%5B%5D=12419&servico_id%5B%5D=8286&servico_id%5B%5D=8293&servico_id%5B%5D=10260&servico_id%5B%5D=9789&servico_id%5B%5D=9790&servico_id%5B%5D=8321&servico_id%5B%5D=8306&servico_id%5B%5D=8314&servico_id%5B%5D=8315&servico_id%5B%5D=8316&servico_id%5B%5D=8328&servico_id%5B%5D=8332&servico_id%5B%5D=8334&servico_id%5B%5D=8333&servico_id%5B%5D=8330&servico_id%5B%5D=8329&servico_id%5B%5D=8326&servico_id%5B%5D=10551");
                    return [4 /*yield*/, inspectTower(page)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, browser, page;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), browser = _a[0], page = _a[1];
                    return [4 /*yield*/, inspectAllTowers(page)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, browser.close()];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, run()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
