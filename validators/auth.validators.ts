import Joi from "joi";

interface AdminLogin {
  email: string;
  password: string;
}

const AdminLogin = Joi.object<AdminLogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});



const AuthValidators = {
  AdminLogin,
};

export default AuthValidators;