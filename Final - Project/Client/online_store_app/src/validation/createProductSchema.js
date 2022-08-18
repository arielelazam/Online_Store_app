import Joi from "joi-browser";

const createProductSchema = {
  name: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(10).max(100).required(),
  category: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().min(10).max(1024),
};

export default createProductSchema;
