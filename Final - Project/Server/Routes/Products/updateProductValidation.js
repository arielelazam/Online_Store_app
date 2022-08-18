const Joi = require("joi");

function validateUpdateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(10).max(100).required(),
    category: Joi.string().min(2).max(1024).required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().max(1024),
  });
  return schema.validate(product);
}
exports.validateUpdateProduct = validateUpdateProduct;
