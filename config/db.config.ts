import { Sequelize } from "sequelize";
import config from "./config.js"


console.log("config data: ", config);
const sequelize = new Sequelize(
  {
    database: config.DATABASE_NAME!,
    username: config.DATABASE_USERNAME!,
    password: config.DATABASE_PASSWORD!,
    host: config.DATABASE_HOST!,
    dialect: config.DATABASE_DIALECT,
    logging: false,
    port: config.DATABASE_PORT,
    // dialectOptions: {
    //   ssl: {
    //     rejectUnauthorized: false // Required for many cloud DB providers
    //   },
    //   connectTimeout: 60000 // 60 seconds (helps with cold starts on Render)
    // },
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 60000, // Timeout for getting a connection from the pool
    //   idle: 10000
    // }
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