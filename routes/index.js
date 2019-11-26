var express = require('express');
var router = express.Router();

function process_req(req) {
  request_values = [
    {request_key:"path", request_value:req.path}, 
    {request_key:"protocol", request_value:req.protocol}, 
    {request_key:"method", request_value:req.method},
    {request_key:"httpVersion", request_value:req.httpVersion},
    {request_key:"hostname", request_value:req.hostname},
    {request_key:"host", request_value:req.host},
    {request_key:"ip", request_value:req.ip},
    {request_key:"body", request_value:JSON.stringify(req.body)}
  ]
  
  Object.keys(req.headers).forEach(function(key) {
    request_values.push({ request_key:"header." + key, request_value:req.headers[key]});
  });  

  Object.keys(req.query).forEach(function(key) {
    request_values.push({ request_key:"param." + key, request_value:req.query[key]});
  });  
  
  return request_values;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  request_values = process_req(req)
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Echo', request_values: request_values  });
  }  
});

router.post('/', function(req, res, next) {
  request_values = process_req(req)
  
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Echo', request_values: request_values  });
  }  
});

router.get('/ping', function(req, res, next) {
  res.statusCode = 200
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json({ message: 'pong' })  
  }
  else {
    res.send('Unknown accept ' + req.headers["accept"])        
  }
});

router.post('/ping', function(req, res, next) {
  res.statusCode = 200
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json({ message: 'pong' })  
  }
  else {
    res.send('Unknown accept ' + req.headers["accept"])        
  }
});

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

router.get('/wait', async function(req, res, next) {
  request_values = process_req(req)
  if (req.query.wait != undefined) {  
    await sleep(Number(req.query.wait) * 1000)
  }
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.render('index', { title: 'Wait', request_values: request_values  });
    //res.send('Unknown accept ' + req.headers["accept"])        
  }  
});

router.post('/wait', async function(req, res, next) {
  request_values = process_req(req)
  if (req.query.wait != undefined) {  
    await sleep(Number(req.query.wait) * 1000)
  }
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.render('index', { title: 'Wait', request_values: request_values  });
    //res.send('Unknown accept ' + req.headers["accept"])        
  }  
});

router.get('/error', function(req, res, next) {
  request_values = process_req(req)
  if (req.query.error != undefined) {
    res.statusCode = Number(req.query.error)
  }
  else {
    res.statusCode = 200
  }
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.render('index', { title: 'Error', request_values: request_values  });
    //res.send('Unknown accept ' + req.headers["accept"])        
  }  
});

router.post('/error', function(req, res, next) {
  request_values = process_req(req)
  if (req.query.error != undefined) {
    res.statusCode = Number(req.query.error)
  }
  else {
    res.statusCode = 200
  }
  if (req.headers["accept"] == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.json(request_values)  
  }
  else {
    res.render('index', { title: 'Error', request_values: request_values  });
    //res.send('Unknown accept ' + req.headers["accept"])        
  }  
});

module.exports = router;
