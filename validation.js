const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    hoten: Joi.string().min(5).max(255).required(),
    diachi: Joi.string().min(5).max(255).required(),
    sodienthoai: Joi.number().min(10).max(10).required(),
  };
  return Joi.validate(data, schema);
};
const orderValidation = (data) => {
  const schema = {};
};

const productValidation = (data) => {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    size: Joi.number(),
    price: Joi.string().required,
    brand: Joi.string().required,
    soluong: Joi.string().required,
    productImage: Joi.string().required,
    mota: Joi.string(),
    date: Joi.date(),
  };
  return Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;

module.exports.productValidation = productValidation;
