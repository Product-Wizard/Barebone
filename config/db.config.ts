import { Sequelize } from "sequelize";
import config from "./config"


const sequelize = new Sequelize(
  config.DATABASE_NAME!,
  config.DATABASE_USERNAME!,
  config.DATABASE_PASSWORD!,
  {
    host: config.DATABASE_HOST!,
    dialect: config.DATABASE_DIALECT,
    logging: false,
    port: config.DATABASE_PORT,
  });


export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // process.exit(1);
  }
}

export default sequelize;