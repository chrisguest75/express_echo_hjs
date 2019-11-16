var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  request_values = [
    {request_key:"path", request_value:req.path}, 
    {request_key:"protocol", request_value:req.protocol}, 
    {request_key:"method", request_value:req.method},
    {request_key:"httpVersion", request_value:req.httpVersion},
    {request_key:"hostname", request_value:req.hostname},
    {request_key:"host", request_value:req.host},
    {request_key:"ip", request_value:req.ip}
  ]

  Object.keys(req.headers).forEach(function(key) {
    request_values.push({ request_key:key, request_value:req.headers[key]});
  });  
  res.render('index', { title: 'Express', request_values: request_values  });
});

router.get('/ping', function(req, res, next) {
  res.statusCode = 200
  res.send("pong")
});

router.get('/wait', function(req, res, next) {
  console.log(req.query.time);
  res.statusCode = 200
  res.send("pong")
});

module.exports = router;
