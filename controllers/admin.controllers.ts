import asyncHandeler from "express-async-handler";
import Admin from "../models/admin.model.js";
import { connectDb } from "../config/db.config.js";
import config from "../config/config.js";
connectDb

/**
 * WARNING⚠⚠🛑: do not add to AuthController Object
 * @param email 
 * @param password 
 * @returns 
 */
export const createAdminProfile = async (email: string, password: string) => {
  await connectDb();
  const validatePasswordInput = password || config.DEFAULT_PASSWORD!
  const hasedPassword = await Admin.hashPassword(validatePasswordInput);
  const admin = await Admin.create({ email, password: hasedPassword, previledge: [] });
  if (!admin) return console.log("error creating admin");
  console.log(admin!.getAdminData(), "password: ", validatePasswordInput);
};

const AuthControllers = {

};


export default AuthControllers;