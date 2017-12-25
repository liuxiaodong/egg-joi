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

  app.post('/notautothrow', function* () {
    let { error, value} = this.validate(app.validator.users.register, false);
    if (error) {
      this.throw('error')
    }
    let data = this.request.body;
    this.status = 201;
    this.body = value;
  });

  app.post('/checkquerydata/:id', function* () {
    let data = Object.assign({}, this.request.body, this.query, this.params)
    console.log(data);
    let { error, value} = this.validate(app.validator.users.register, data, false);
    if (error) {
      this.throw('error data')
    }
    this.status = 201;
    this.body = value;
  });  
};
