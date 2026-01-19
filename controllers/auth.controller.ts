import asyncHandeler from "express-async-handler";
import AuthValidators from "../validators/auth.validators.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../config/config.js";


const adminLogin = asyncHandeler(async (req, res, next) => {
  const { value, error } = AuthValidators.AdminLogin.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const admin = await Admin.findOne({ where: { email: value.email } });
  if (!admin) {
    res.status(400).json({ error: true, message: "incorrect email or password", data: null });
    return;
  }
  const valid = await bcrypt.compare(value.password, admin.dataValues.password!);
  if (!valid) {
    res.status(400).json({ error: true, message: "incorrect email or password", data: null });
    return;
  }
  const token = jwt.sign(
    { email: admin.dataValues.email, id: admin.dataValues.id },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES as any, algorithm: "HS256" }
  );

  res.status(200).json({
    error: false,
    data: admin.getAdminData(),
    message: `login successfully`,
    token: token,
  });
});

const AuthControllers = {
  adminLogin,
};


export default AuthControllers;