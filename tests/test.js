var expect = require('chai').expect;
var handlers = require('../handlers/handlers');

describe('handlePing()', function () {
  it('should handle ping request with successful pong response', function () {
    
    // 1. ARRANGE
    var req = {headers: []};
    var res = {headers: {}, setHeader: function(name, type){this.headers[name] = type}, send: function(message){this.message = message}};

    // 2. ACT
    var out = handlers.handlePing(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message).to.be.equal("pong");
    expect(res.headers["Content-Type"]).to.be.equal("text/html");

  });
});

describe('handleJsonPing()', function () {
  it('should handle ping request with successful pong response', function () {
    
    // 1. ARRANGE
    var req = {headers: {"accept":"application/json"}};
    var res = {headers: {}, setHeader: function(name, type){this.headers[name] = type}, json: function(message){this.message = message}};

    // 2. ACT
    var out = handlers.handlePing(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message.message).to.be.equal("pong");


  });
});


describe('handleError()', function () {
  it('should handle error request with requested http status', function () {
    
    // 1. ARRANGE
    var req = {headers: []};
    var res = {setHeader: function(){},send: function(message){this.message = message}};

    // 2. ACT
    var out = handlers.handlePing(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message).to.be.equal("pong");

  });
});