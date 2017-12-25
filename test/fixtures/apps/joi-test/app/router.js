'use strict';

module.exports = app => {
  app.post('/users', function* () {
    this.validate(app.validator.users.register);
    let data = this.request.body;
    this.status = 201;
    this.body = data;
  });

  app.post('/location', function* () {
    this.validate(app.validator.task.test.location);
    let data = this.request.body;
    this.status = 201;
    this.body = data;
  });  
};
