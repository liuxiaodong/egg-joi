'use strict';

exports.keys = '123456';
exports.joi = {
  throw: true, // 是否自动抛出错误信息，默认是 true
    // errorHandle: (error) => { // 不自动抛出错误信息时的错误信息统一处理函数
    //     return (error.details && error.details[0] && error.details[0].message) || error;
    // },
  throwHandle: error => { // 自动抛出错误信息(throw) 时的错误信息统一处理函数
    return (error.details && error.details[0] && error.details[0].message) || error;
  },
  resultHandle: result => {
    const { value } = result;
    if (value.username === 'resulthandle') {
      return value;
    }
    return result;
  },
};
