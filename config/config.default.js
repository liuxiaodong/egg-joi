'use strict';

/**
 * egg-joi default config
 * @member Config#joi
 * @property {String} SOME_KEY - some description
 */
exports.joi = {
  options: {}, // Joi options [https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback]
  locale: {
    'zh-cn': {},
  },
  throw: true, // 是否自动抛出错误，默认 true
  throwHandle: error => { // throw === true   时错误信息统一处理函数，会直接 throw 抛出错误
    return error;
  },
  errorHandle: error => { // throw === false  时错误信息统一处理函数，会作为结果返回 { error, value }
    return error;
  },
  resultHandle: result => { // 返回结果格式化。默认返回结果为 { error, value }，可以根据自己需求格式化数据
    return result;
  },
};
