'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    location: Joi.object().keys({
      country: Joi.string().required(),
      city: Joi.string().required(),
    }),
  };
};
