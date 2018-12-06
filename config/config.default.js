'use strict';

/**
 * egg-joi default config
 * @member Config#joi
 * @property {String} SOME_KEY - some description
 */
exports.joi = {
  options: {}, // Joi options [https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback]
  locale: {
    'zh-cn': {},
  },
  throw: true, // throw error when capture exception
  throwHandle: error => { // when throw is true the error message format
    return error;
  },
  errorHandle: error => { // when throw is false the error message format
    return error;
  },
  resultHandle: result => { // fromat result
    return result;
  },
};
