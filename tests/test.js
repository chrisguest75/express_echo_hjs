var expect = require('chai').expect;
var handlers = require('../handlers/handlers');

describe('handlePing()', function () {
  it('should handle ping request with simple pong response', function () {
    
    // 1. ARRANGE
    var req = {headers: []};
    var res = {setHeader: function(){},send: function(message){this.message = "pong"}};

    // 2. ACT
    var out = handlers.handlePing(req, res);

    // 3. ASSERT
    expect(res.statusCode).to.be.equal(200);
    expect(res.message).to.be.equal("pong");

  });
});