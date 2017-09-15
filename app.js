'use strict';

const Joi = require('joi');
const path = require('path');

module.exports = app => {
    const directory = path.join(app.config.baseDir, 'app/validator');
    app.Joi = Joi;
    app.loader.loadToApp(
        directory,
        'validator'
    );
};
