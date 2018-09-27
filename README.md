# egg-joi

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-joi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-joi
[travis-image]: https://img.shields.io/travis/eggjs/egg-joi.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-joi
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-joi.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-joi?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-joi.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-joi
[snyk-image]: https://snyk.io/test/npm/egg-joi/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-joi
[download-image]: https://img.shields.io/npm/dm/egg-joi.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-joi

<!--
Description here.
-->

## Install

```bash
$ npm i egg-joi --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.joi = {
  enable: true,
  package: 'egg-joi',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.joi = {
	options: {},
	locale: {
		'zh-cn': {}
	},
	throw: true, # 校验出错是是否自动抛出错误
	throwHandle: (error) => { return error; }, # throw 为 true 时对抛出的错误做格式化处理
	errorHandle: (error) => { return error; }, # throw 为 false 时错误会作为结果返回，默认 { error, value }，此函数可以对错误做格式化  
	resultHandle: (result) => { return result; } # 对返回结果做处理的函数，默认返回结果 { error, value }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

`app/validator/sessions`

```js
	'use strict';

	module.exports = app => {
	    const Joi = app.Joi;
	    return {
	        login: Joi.object().keys({
	            email: Joi.string().email(),
	            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
	        })
	    }
	};
```

`app/controller/sessions`

```js
	'use strict';

	module.exports = app => {
	  class SessionsController extends app.Controller {
	    * login() {
	      this.ctx.validate(app.validator.sessions.login);
	      // this.ctx.validate(app.validator.sessions.login, this.ctx.request.body);
	      // this.ctx.validate(app.validator.sessions.login, this.ctx.request.body, {abortEarly: false}); see [joi] https://github.com/hapijs/joi/blob/v11.0.1/API.md
	      // let {error, value} = this.ctx.validate(app.validator.sessions.login, false);
	      // let {error, value} = this.ctx.validate(app.validator.sessions.login, this.ctx.request.body, false);
	      // let {error, value} = this.ctx.validate(app.validator.sessions.login, this.ctx.request.body, {abortEarly: false}, false);

	      this.body = 'hello';
	    }
	  }
	  return SessionsController;
	};	
```

## Questions & Suggestions

Please open an issue [here](https://github.com/liuxiaodong/egg-joi/issues).

## License

[MIT](LICENSE)
