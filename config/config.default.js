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
    throw: true, // 是否自动抛出错误，默认 true
    errorHandle: (error) => { // throw === true    时错误信息统一处理函数
        return error
    },
    throwHandle: (error) => { // throw === false   时错误信息统一处理函数
        return error
    }    
};
