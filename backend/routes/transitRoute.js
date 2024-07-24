const express = require('express');
const router = express.Router();
const transitController = require('../controllers/transitController');
const frontcontroller = require('../controllers/frontcontroller');

router.get('/lines', transitController.getLines);

router.get('/test', transitController.testController);

router.get('/line/:id', transitController.getLineById);

router.get('/stop/:id', transitController.getStopById);

router.post('/createstop', transitController.createStop);

router.post('/createline', transitController.createLine);

router.put('/editline/:id', transitController.editline);

router.delete('/deleteline/:id', transitController.deleteline);

router.delete('/deletestop/:id', transitController.deletestop);

//frontend apis

router.post('/route', frontcontroller.acceptroute);

module.exports = router;