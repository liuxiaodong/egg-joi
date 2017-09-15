'use strict';

module.exports = {
  /**
   * validate data with schema
   *
   * @param  {Object} schema  - validate schema object, see [joi](https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(schema, data, options) {
    if (!schema || !schema.isJoi) {
      this.throw(422, 'joi schema missing');
    }
    data = data || this.request.body;
    const config = this.app.config || {};
    let languageConfig = {};
    const locale = (this.__getLocale && this.__getLocale()) || (config.i18n && config.i18n.defaultLocale);

    if (locale && config.joi && config.joi.locale) {
      languageConfig = config.joi.locale[locale] || {};
    }
    const {error, value} = this.app.Joi.validate(data, schema, Object.assign({}, (config.joi && config.joi.options), {language: languageConfig}, options));
    if (error) {
      let message = error.details[0].message;
      this.throw(422, message)
    }
  }
};