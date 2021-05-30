const Joi = require("joi");

const schemaUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ru", "uk", "ua"] },
    })
    .required(),
  password: Joi.string().min(6).max(32).required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateUser = (reg, _res, next) => {
  return validate(schemaUser, reg.body, next);
};

module.exports.validateSubscription = (reg, _res, next) => {
  return validate(schemaSubscription, reg.body, next);
};
