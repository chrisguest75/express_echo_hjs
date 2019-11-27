var express = require('express');
var router = express.Router();
var os = require('os');

function process_req(req) {
  request_values = [
    {request_key:"path", request_value:req.path}, 
    {request_key:"protocol", request_value:req.protocol}, 
    {request_key:"method", request_value:req.method},
    {request_key:"httpVersion", request_value:req.httpVersion},
    {request_key:"hostname", request_value:req.hostname},
    {request_key:"host", request_value:req.host},
    {request_key:"ip", request_value:req.ip},
    {request_key:"startTime", request_value:req._startTime},
    {request_key:"body", request_value:JSON.stringify(req.body)},
    {request_key:"os.platform", request_value:os.platform()},
    {request_key:"os.release", request_value:os.release()}
  ]

  var memUsage = process.memoryUsage()
  Object.keys(memUsage).forEach(function(key) {
    request_values.push({ request_key:"process." + key, request_value:memUsage[key]});
  });  

  try {
    var resourceUsage = process.resourceUsage()
    Object.keys(resourceUsage).forEach(function(key) {
      request_values.push({ request_key:"process." + key, request_value:resourceUsage[key]});
    });    
  } catch(ex) {
  }

  Object.keys(req.query).forEach(function(key) {
    request_values.push({ request_key:"param." + key, request_value:req.query[key]});
  });  

  Object.keys(req.headers).forEach(function(key) {
    request_values.push({ request_key:"header." + key, request_value:req.headers[key]});
  });  

  Object.keys(process.env).forEach(function(key) {
    request_values.push({ request_key:"env." + key, request_value:process.env[key]});
  });  
  
  return request_values;
}

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

function handlePing(req, res, next) {
  res.statusCode = 200
  found = false
  if (req.headers["accept"] != undefined) {   
    accept = req.headers["accept"].split(",")
    for (accepttype in accept) { 
      if (accept[accepttype] == "application/json") {
        res.setHeader("Content-Type", "application/json");
        res.json({ message: 'pong' })  
        found = true
        break
      }
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.send("pong")        
  }    
}

function createResponse(req, res, title) {
  request_values = process_req(req)
  found = false
  if (req.headers["accept"] != undefined) {     
    accept = req.headers["accept"].split(",")
    for (accepttype in accept) { 
      if (accept[accepttype] == "application/json") {
        res.setHeader("Content-Type", "application/json");
        var doc = {}
        Object.keys(request_values).forEach(function(key) {
          doc[request_values[key].request_key] = request_values[key].request_value
        }); 

        res.json(doc)  
        found = true
        break
      }
    }
  }
  if (found == false) {
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: title, request_values: request_values  });
  }    
}

function handleEcho(req, res, next) {
  createResponse(req, res, 'Echo')
}

async function handleWait(req, res, next) {
  request_values = process_req(req)
  if (req.query.wait != undefined) {  
    await sleep(Number(req.query.wait) * 1000)
  }
  createResponse(req, res, 'Wait')  
}

function handleError(req, res, next) {
  if (req.query.error != undefined) {
    res.statusCode = Number(req.query.error)
  } else {
    res.statusCode = 200
  }
  createResponse(req, res, 'Error')  
}

/* GET home page. */
router.get('/', handleEcho);
router.post('/', handleEcho);
router.delete('/', handleEcho);
router.patch('/', handleEcho);
router.put('/', handleEcho);
router.get('/echo', handleEcho);
router.post('/echo', handleEcho);
router.delete('/echo', handleEcho);
router.patch('/echo', handleEcho);
router.put('/echo', handleEcho);

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

router.get('/oom', handleEcho);

module.exports = router;
