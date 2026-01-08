import { Sequelize } from "sequelize";
import config from "./config"


const sequelize = new Sequelize({
  database: "",
  username: "",
  password: "",
  host: 'localhost',
  dialect: config.DATABASE_DIALECT /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});



try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}