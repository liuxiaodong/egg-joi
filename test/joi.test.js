'use strict';

const mm = require('egg-mock');
const { app, assert } = require('egg-mock/bootstrap');

describe('test/joi.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/joi-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('emial is required', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/users')
      .set('Accept', 'application/json')
      .expect(422, (req, res) => {
        assert.equal(res.body.message, '"email" is required')
        return done()
      });
  });

  it('phone', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        email: 'test@joi.com',
        password: '123456',
        username: 'abcdef',
        phone: '1234567'
      })
      .expect(201, (req, res) => {
        assert.equal(res.body.phone, '1234567')
        assert.equal((typeof res.body.phone), 'string')    
        return done()
      });
  });  


  it('phone', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        email: 'test@joi.com',
        password: '123456',
        username: 'abcdef',
        phone: 1234567
      })
      .expect(201, (req, res) => {
        assert.equal(res.body.phone, 1234567)        
        return done()
      });
  });  

  it('sub file 1', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/location')
      .set('Accept', 'application/json')
      .send({})
      .expect(422, (req, res) => {
        assert.equal(res.body.message, '"country" is required')
        return done()
      });
  });  

  it('sub file 2', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/location')
      .set('Accept', 'application/json')
      .send({
        country: '中国',
        city: '北京'
      })
      .expect(201, (req, res) => {
        assert.equal(res.body.city, '北京')
        return done()
      });
  }); 

  it('not auto throw 1', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/notautothrow')
      .set('Accept', 'application/json')
      .expect(422, (req, res) => {
        assert.equal(res.body.message, 'error')
        return done()
      });
  });

  it('not auto throw 2', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/notautothrow')
      .set('Accept', 'application/json')
      .send({
        email: 'test@joi.com',
        password: '123456',
        username: 'abcdef',
        phone: '1234567',
        date: new Date()
      })
      .expect(201, (req, res) => {
        assert.equal(res.body.phone, 1234567)
        assert.equal((typeof res.body.phone), 'number')
        return done()
      });
  });    


  it('checkquerydata', (done) => {
    app.mockCsrf();
    app.httpRequest()
      .post('/checkquerydata/987654')
      .set('Accept', 'application/json')
      .send({
        email: 'test@joi.com',
        password: '123456',
        username: 'abcdef',
        phone: '1234567',
        date: new Date()
      })
      .query({
        a: 123,
        b: 456
      })
      .expect(422, (req, res) => {
        assert.equal(res.body.message, 'error data')
        return done()
      });
  });   
});
