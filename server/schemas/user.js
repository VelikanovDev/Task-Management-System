const Joi = require("joi");

module.exports.createUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
