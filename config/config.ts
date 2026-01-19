import dotenv from "dotenv"
import { Dialect } from "sequelize";
dotenv.config();
const config = Object.freeze({
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  DATABASE_DIALECT: (process.env.DATABASE_DIALECT || "mysql") as Dialect,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || "3600"),
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
  SERVER_PORT: parseInt(process.env.SERVER_PORT || "4000"),
  JWT_SECRET: process.env.JWT_SECRET! || "jwt_secret!--==++@23",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "30d",
})

export default config