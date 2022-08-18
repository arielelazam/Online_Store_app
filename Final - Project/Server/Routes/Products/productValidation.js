const Joi = require("joi");

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(10).max(100).required(),
    category: Joi.string().min(2).max(1024).required(),
    price: Joi.number().min(0).required(),
    phone: Joi.string().min(2).max(256).required(),
    creatorName: Joi.string().min(2).max(256).required(),
    creatorAddress: Joi.string().min(2).max(256).required(),
    image: Joi.string().max(1024),
  });
  return schema.validate(product);
}
exports.validateProduct = validateProduct;
