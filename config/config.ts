import dotenv from "dotenv"
dotenv.config();
const config = Object.freeze({
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || "mysql",
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || "3600"),
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
  SERVER_PORT: parseInt(process.env.SERVER_PORT || "4000"),
})

export default config