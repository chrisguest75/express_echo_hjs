var express = require('express');
var handlers = require('../handlers/handlers')
var router = express.Router();

/* GET home page. */
router.get('/', handlers.handleEcho);
router.post('/', handlers.handleEcho);
router.delete('/', handlers.handleEcho);
router.patch('/', handlers.handleEcho);
router.put('/', handlers.handleEcho);
router.get('/echo', handlers.handleEcho);
router.post('/echo', handlers.handleEcho);
router.delete('/echo', handlers.handleEcho);
router.patch('/echo', handlers.handleEcho);
router.put('/echo', handlers.handleEcho);

router.get('/ping', handlers.handlePing);
router.post('/ping', handlers.handlePing);
router.delete('/ping', handlers.handlePing);
router.patch('/ping', handlers.handlePing);
router.put('/ping', handlers.handlePing);

router.get('/wait', handlers.handleWait);
router.post('/wait', handlers.handleWait);
router.delete('/wait', handlers.handleWait);
router.patch('/wait', handlers.handleWait);
router.put('/wait', handlers.handleWait);

router.get('/error', handlers.handleError);
router.post('/error', handlers.handleError);
router.delete('/error', handlers.handleError);
router.patch('/error', handlers.handleError);
router.put('/error', handlers.handleError);

router.get('/oom', handlers.handleEcho);

module.exports = router;
