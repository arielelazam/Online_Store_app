import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  phone: Joi.string().min(9).max(16).required(),
  address: Joi.string().min(6).max(256).required(),
  password: Joi.string().min(6).max(1024).required(),
};

export default registerSchema;
