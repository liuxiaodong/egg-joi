'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    register: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).max(50).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.number().required(),
      date: Joi.date()
    }),
  };
};