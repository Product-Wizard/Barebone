import { Dialect } from "sequelize";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'; // Example of an optional type constraint
    PORT?: string; // Example of an optional variable
    API_KEY: string; // Example of a required variable
    DATABASE_HOST: string;
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_DIALECT: Dialect;
    DATABASE_PORT: string;
    DEFAULT_PASSWORD: string;
    SERVER_PORT: string;
  }
}