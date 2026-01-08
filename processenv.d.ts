
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'; // Example of an optional type constraint
    PORT?: string; // Example of an optional variable
    API_KEY: string; // Example of a required variable
    DATABASE_HOST: string;
    DATABASE_NAME: string;
    DATABASE_DIALECT: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: string;
    DEFAULT_PASSWORD: string;
    SERVER_PORT: string;
  }
}