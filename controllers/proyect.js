'use strict'

var Proyect = require('../models/proyect');
var fs 		= require('fs');
var path 	= require('path');

var controller = {
	home : function(req, res ) {
		return res.status(200).send({
			message: 'Soy la home'
		});

	},
	test: function(req,res){
		return res.status(200).send({
			message: 'soy el metodo o accion test del controlador proyect'
		});
	}, 
	saveProyect: function (req, res){
		var proyect = new Proyect();

		var params = req.body;

		proyect.name = params.name;
		proyect.description = params.description;
		proyect.category	= params.category;
		proyect.year		= params.year;
		proyect.langs		= params.langs;
		proyect.image		= null;

		
		proyect.save( (err, product ) => {
			if (err) 
				return res.status(500).send({message:'Error al guardar'});
			if (!product) 
				return res.status(404).send(
						{ message: 'No se ha podido guardar el proyecto!! '});
				
		return res.status(200).send({proyect: product});

		})
	},
	getProyect: function(req,res){


		var proyectId = req.params.id;

		if (!proyectId) res.status(400).send({ message:'El proyect id no se especifico!!!'});

		Proyect.findById( proyectId, (err, proyect)=>{
			if (err) 
				return res.status(500).send({message: 'Error al devolver los datos',
										err:err});

			if (!proyect) 
				return res.status(400).send({ message:'El proyecto no existe!!!'});

			return res.status(200).send({Proyect: proyect})

		});


	},

	listProyects: function (req,res){

//		Proyect.find({year:2019}).exec((err, proyects)=> {

//Proyect.find({}).sort.('year').exec((err, proyects)=> {
	
		Proyect.find({}).exec((err, proyects)=> {
			if (err) return res.status(500).send({message:'error al devolver datos'});

			if (!proyects) return res.status(400).send({message:'No hay proyectos que mostrar'});

			return res.status(200).send({proyects});

		});

	},

	updateProyect : function (req, res){
		var proyectId = req.params.id;
		var update = req.body;

		Proyect.findByIdAndUpdate(proyectId, update, {new:true},(err, proyectUpdated)=>{
			if (err) return res.status(500). send({message: 'Error al actualizar'});
			if (!proyectUpdated) return res.status(400).send({ message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({proyect : proyectUpdated});		
		});
	},

	deleteProyect: function (req,res){
		var proyectId =req.params.id;

		Proyect.findByIdAndDelete(proyectId, (err, proyectDeleted) =>{
			if (err) return res.status(500). send({message: 'No se ha podido borrar ', err: err});
			if (!proyectDeleted) return res.status(400).send({ message: 'no se encontro No se puede eliminar ese proyecto'});

			return res.status(200).send({proyect : proyectDeleted});

		});


	},

	uploadImage: function (req,res){
		var proyectId = req.params.id;
		var fileName = 'imagen no subida...';


		if (req.files){
			var filePath = req.files.image.path;
			// este fileSplit hay que revisar en el archivo que recibe si lo guarda con 
			// doble backslash o con una, en linux es con uno!!!

			var fileSplit 	= filePath.split('//');
			var fileName 	= fileSplit[1];
			var extSplit 	= fileName.split('/.');
			var FileExt 	= extSplit[1];

			if (FileExt =='png' || FileExt == 'jpg' || FileExt == 'jpeg' || FileExt =='gif' ||
				FileExt =='PNG' || FileExt == 'JPG' || FileExt == 'JPEG' || FileExt =='GIF')
			{
				Proyect.findByIdAndUpdate(proyectId, { image: fileName}, {new : true }, 
							(err, proyectUpdated)=>{
								if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

								if (!proyectUpdated) return res.status(400).send({ message: 'El proyecto no existe!!'});

								return res.status(200).send({ proyect : proyectUpdated });

				});

			}
			// si no es valido el archivo lo borra de la carpeta de carga
			
			else {
				fs.unlink(filePath, (err) =>{
					return res.status(200).send ({ message : 'la extension no es valida'}) 
				});
			}; 
		}else {
			return res.status(200).send({ files: fileName});			
		};
	},

	getImageFile: function (req, res){
		var file= req.params.image;
		var path_file = './uploads/'+ file;

		fs.exists(path_file, (exist)=>{
			if (exist){
				return res.sendFile(path.resolve(path_file));
			} else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
}

module.exports = controller;
