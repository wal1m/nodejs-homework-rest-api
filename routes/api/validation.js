const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  phone: Joi.string().min(7).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ru", "ca", "ua"] },
    })
    .optional(),
})
  
  const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).optional(),
    phone: Joi.string().min(7).max(15).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "ru", "ca", "ua"] },
      })
      .optional(),
  })

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    next()
  } catch (err) {
    next({status: 400, message:err.message})
  }
}

module.exports.validateCreateContact = (reg, _res, next) => {
  return validate(schemaCreateContact, reg.body, next)
}

module.exports.validateUpdateContact = (reg, _res, next) => {
  return validate(schemaUpdateContact, reg.body, next)
}
