'use strict'

var express = require('express');
var ProyectController = require('../controllers/proyect');

var router = express.Router();

var multipart =require("connect-multiparty");
var multipartMiddleware = multipart({uploadDir:'./uploads'});


router.get('/home', ProyectController.home);
router.get('/test', ProyectController.test);
router.get('/proyect/:id?', ProyectController.getProyect);
router.get('/list-proyects', ProyectController.listProyects);
router.get('/get-image/:image', ProyectController.getImageFile);

router.post('/save-proyect', ProyectController.saveProyect);
router.post('/upload-image/:id',multipartMiddleware ,ProyectController.uploadImage);


router.put('/update-proyect/:id', ProyectController.updateProyect);

router.delete('/delete-proyect/:id', ProyectController.deleteProyect);

module.exports = router;


