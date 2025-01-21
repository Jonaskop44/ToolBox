declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_TOKEN: string;
    MAIL_PORT: number;
  }
}
