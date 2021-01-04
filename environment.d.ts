declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOGIN_EMAIL: string;
      LOGIN_PASSWORD: string;
    }
  }
}

export {};
