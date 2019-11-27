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

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

function handleEcho(req, res, next) {
  request_values = process_req(req)
  accept = req.headers["accept"].split(",")
  found = false
  for (accepttype in accept) { 
    if (accept[accepttype] == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.json(request_values)  
      found = true
      break
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Echo', request_values: request_values  });
  }    

}

function handlePing(req, res, next) {
  res.statusCode = 200
  accept = req.headers["accept"].split(",")
  found = false
  for (accepttype in accept) { 
    if (accept[accepttype] == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.json({ message: 'pong' })  
      found = true
      break
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.send("pong")        
  }    
}

async function handleWait(req, res, next) {
  request_values = process_req(req)
  if (req.query.wait != undefined) {  
    await sleep(Number(req.query.wait) * 1000)
  }
  accept = req.headers["accept"].split(",")
  found = false
  for (accepttype in accept) { 
    if (accept[accepttype] == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.json(request_values)  
      found = true
      break
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Wait', request_values: request_values  });
  }    
}

function handleError(req, res, next) {
  request_values = process_req(req)
  if (req.query.error != undefined) {
    res.statusCode = Number(req.query.error)
  }
  else {
    res.statusCode = 200
  }
  accept = req.headers["accept"].split(",")
  found = false
  for (accepttype in accept) { 
    if (accept[accepttype] == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.json(request_values)  
      found = true
      break
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Error', request_values: request_values  });
  }    
}

/* GET home page. */
router.get('/', handleEcho);
router.post('/', handleEcho);
router.delete('/', handleEcho);
router.patch('/', handleEcho);
router.put('/', handleEcho);

router.get('/ping', handlePing);
router.post('/ping', handlePing);
router.delete('/ping', handlePing);
router.patch('/ping', handlePing);
router.put('/ping', handlePing);

router.get('/wait', handleWait);
router.post('/wait', handleWait);
router.delete('/wait', handleWait);
router.patch('/wait', handleWait);
router.put('/wait', handleWait);

router.get('/error', handleError);
router.post('/error', handleError);
router.delete('/error', handleError);
router.patch('/error', handleError);
router.put('/error', handleError);

module.exports = router;
