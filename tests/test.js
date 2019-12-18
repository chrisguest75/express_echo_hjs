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
  it('should handle ping request with successful pong json response when application/json content type requested', function () {
    
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

describe('handleDefaultEcho()', function () {
  it('should handle echo request with requested http status', function () {
    
    // 1. ARRANGE
    var req = {headers: [], query:{}};
    var res = {setHeader: function(){},send: function(message){this.message = message}, render: function(template, values){this.template = template; this.value = values}};

    // 2. ACT
    var out = handlers.handleEcho(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.template).to.be.equal("index");

  });
});

describe('handleJsonEcho()', function () {
  it('should handle echo request with requested http status response when application/json content type requested', function () {
    
    // 1. ARRANGE
    var req = {headers: {"accept":"application/json"}, query:{}, path:"testpath"};    
    var res = {setHeader: function(){},send: function(message){this.message = message}, json: function(message){this.message = message}};

    // 2. ACT
    var out = handlers.handleEcho(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message["path"]).to.be.equal("testpath");

  });
});

describe('handleUnknownContentPing()', function () {
  it('should handle ping request with successful pong response given unknown content type', function () {
    
    // 1. ARRANGE
    var req = {headers: {"accept":"application/unknown"}};
    var res = {headers: {}, setHeader: function(name, type){this.headers[name] = type}, send: function(message){this.message = message}};

    // 2. ACT
    var out = handlers.handlePing(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message).to.be.equal("pong");
    expect(res.headers["Content-Type"]).to.be.equal("text/html");

  });
});

describe('handleDefaultError()', function () {
  it('should handle error request with requested http status', function () {
    
    // 1. ARRANGE
    var req = {headers: [], query:{}};
    var res = {setHeader: function(){},send: function(message){this.message = message}, render: function(template, values){this.template = template; this.value = values}};

    // 2. ACT
    var out = handlers.handleError(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.template).to.be.equal("index");

  });
});

describe('handle503Error()', function () {
  it('should handle error request with requested http status', function () {
    
    // 1. ARRANGE
    var req = {headers: [], query: {error:"503"}};
    var res = {setHeader: function(){},send: function(message){this.message = message}, render: function(template, values){this.template = template; this.value = values}};


    // 2. ACT
    var out = handlers.handleError(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(503);
    expect(res.template).to.be.equal("index");

  });
});