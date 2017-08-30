/**
 * @file test/module-return_random_greeting-test.js
 * @author graeme@converse.ai
 * @description This module will take up to 5 inputs as "greetings"
 * and prefix one of them to ", World!" before adding it to the
 * conversation.
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

const request     = require('supertest');
const expect      = require('chai').expect;
const server      = require('./lib/express');

describe('Return Random Greeting', function () {

  it('base', function(done) {
    request(server)
      .post('/')
      .send({
        event: 'MODULE_EXEC',
        payload: {
          moduleId: 'return_random_greeting',
          moduleParam: {
            input_array: undefined
          },
          registrationData: {
          }
        }
      })
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('status').to.equal(0);
        expect(res.body).to.have.property('value');
        done();
      });
  })

  it('return', function(done) {
    request(server)
      .post('/')
      .send({
        event: 'MODULE_EXEC',
        payload: {
          moduleId: 'return_random_greeting',
          moduleParam: {
            input_array: [
              'Hello',
              'Hola',
              'Howdy',
              'Hiya',
              'G\'day'
            ]
          },
          registrationData: {
          }
        }
      })
      .set('X_CONVERSE_APP_TOKEN', require('../app-token'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property('status').to.equal(0);
        expect(res.body).to.have.property('value');
        expect(res.body).to.have.property('value').to.have.property('result');
        var expectedResults = ['Hello, World!', 'Hola, World!', 'Howdy, World!', 'Hiya, World!', 'G\'day, World!'];
        expect(expectedResults).to.include(res.body.value.result);
        done();
      });
  })

});
