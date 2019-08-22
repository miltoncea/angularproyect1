'use strict'

var express 	= require('express');
var bodyParser 	= require('body-parser');

var app = express();

//cargamos archivos de rutas
var proyect_routes = require('./routes/proyect');
var path = require('path');
//midedlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// configurar cabeceras y cors
// para poner en produccion en lugar del '*'' hay que poner el http correspondiente

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


// cargar rutas rutas
app.use('/',express.static('client',{redirect:false}));
app.use('/api',proyect_routes);

app.get('*', function(req,res,next) {
 	res.sendFile(path.resolve('client/index.html'));
 }
 );


// exportar

module.exports = app;

