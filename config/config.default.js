'use strict';

/**
 * egg-joi default config
 * @member Config#joi
 * @property {String} SOME_KEY - some description
 */
exports.joi = {
    options: {}, // Joi options [https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback]
    locale: {
        'zh-cn': {}
    },
    throw: true // 是否自动抛出错误，默认 true
};
