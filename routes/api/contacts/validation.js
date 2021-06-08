const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/, "Alphanumerics and space")
    .min(2)
    .max(30)
    .required(),
  phone: Joi.string().min(7).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ru", "uk", "ua"] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/, "Alphanumerics and space")
    .min(2)
    .max(30)
    .optional(),
  phone: Joi.string().min(7).max(15).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ru", "uk", "ua"] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateObjectId = (req, _res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next({ status: 400, message: "objectId is not valid" });
  }
  next();
};
