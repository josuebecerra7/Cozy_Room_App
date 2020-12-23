module.exports = function(app) {
 
	var express = require("express");
	var router = express.Router();
	
    const sensed = require('../controllers/user.controller.js');
	
	var path = __basedir + '/views/';
	
	router.use(function (req,res,next) {
		console.log("/" + req.method);
		next();
	});
	
	app.get('/', (req,res) => {
		res.sendFile(path + "index.html");
	});

	app.get('/about_api', (req,res) => {
		res.sendFile(path + "about_api.html");
	});

	app.get('/about', (req,res) => {
		res.sendFile(path + "about.html");
	});
    // Save a User to MongoDB
    app.post('/api/post', sensed.save);
 
    // Retrieve all data
	app.get('/api/all', sensed.findAll);

	// Retrieve last data
	app.get('/api/last', sensed.findLast);
	
	
	app.use("/",router);
 
	app.use("*", (req,res) => {
		res.sendFile(path + "404.html");
	});
}