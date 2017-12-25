'use strict';

module.exports = {
  /**
   * validate data with schema
   *
   * @param  {Object} schema  - validate schema object, see [joi](https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(schema, data, options, autoThrow) {
    if (!schema || !schema.isJoi) {
      this.throw(422, 'joi schema missing');
    }
    if (typeof data === 'boolean') {
      autoThrow = data;
      data = null;
      options = null;
    }
    if (typeof options === 'boolean') {
      autoThrow = options;
      options = null;
    }

    data = data || this.request.body;
    const config = this.app.config || {};
    let languageConfig = {};
    const locale = (this.__getLocale && this.__getLocale()) || (config.i18n && config.i18n.defaultLocale);

    if (locale && config.joi && config.joi.locale) {
      languageConfig = config.joi.locale[locale] || {};
    }

    let _autoThrow = true;
    if (typeof autoThrow === 'boolean') {
      _autoThrow = autoThrow;
    } else if (config.joi && typeof config.joi.throw === 'boolean') {
      _autoThrow = config.joi.throw;
    }
    const {error, value} = this.app.Joi.validate(data, schema, Object.assign({}, (config.joi && config.joi.options), {language: languageConfig}, options));
    if (_autoThrow && error) {
      let message = error.details[0].message;
      this.throw(422, message)
    }

    return {error, value}
  }
};