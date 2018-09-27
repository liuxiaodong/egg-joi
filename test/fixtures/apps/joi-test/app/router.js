'use strict';

module.exports = app => {
  app.post('/users', function* () {
    this.validate(app.validator.users.register);
    const data = this.request.body;
    this.status = 201;
    this.body = data;
  });

  app.post('/location', function* () {
    this.validate(app.validator.task.test.location);
    const data = this.request.body;
    this.status = 201;
    this.body = data;
  });

  app.post('/notautothrow', function* () {
    const { error, value } = this.validate(app.validator.users.register, false);
    if (error) {
      this.throw('error');
    }
    const data = this.request.body;
    console.log(data);
    this.status = 201;
    this.body = value;
  });

  app.post('/checkquerydata/:id', function* () {
    const data = Object.assign({}, this.request.body, this.query, this.params);
    console.log(data);
    const { error, value } = this.validate(app.validator.users.register, data, false);
    if (error) {
      this.throw('error data');
    }
    this.status = 201;
    this.body = value;
  });


  app.post('/resulthandle', function* () {
    const data = this.validate(app.validator.users.register, this.request.body);
    this.status = 201;
    this.body = data;
  });
};
