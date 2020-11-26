
'use strict';

module.exports = {
  /**
   * validate data with schema
   *
   * @param  {Object}  schema     - validate schema object, see [joi](https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback)
   * @param  {Object}  [data]     - validate target, default to `this.request.body`
   * @param  {Object}  options    - Joi options
   * @param  {Boolean} autoThrow  - 是否抛出错误
   *
   * @return {Object} result  - { error, value }
   */
  validate(schema, data, options, autoThrow) {
    if (!schema || !this.app.Joi.isSchema(schema)) {
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

    let { error, value } = schema.validate(data, Object.assign({}, (config.joi && config.joi.options), { language: languageConfig }, options));

    if (_autoThrow && error) {
      if (typeof config.joi.throwHandle === 'function') {
        error = config.joi.throwHandle(error);
      }
      this.throw(422, error);
    }

    if (error && typeof config.joi.errorHandle === 'function') {
      error = config.joi.errorHandle(error);
    }

    let result = { error, value };

    if (typeof config.joi.resultHandle === 'function') {
      result = config.joi.resultHandle(result);
    }
    return result;
  },
};
