var express = require("express");
global.path= require('path'); 
global.anonymousAuth = true;

var method=config.prototype;

function config(app){
	// Setting .html as the default template extension
	app.set('view engine', 'html');
	// Initializing the ejs template engine
	app.engine('html', require('ejs').renderFile);
	// Telling express where it can find the templates
	//app.set(global.rootPath, global.srcPath);
	//Files 
	app.use(express.static(path.join(global.srcPath)));
	app.use(function (err, req, res, next) {
		if (res.headersSent) {
			return next(err);
		}
		console.log("eroare", err.stack);
		res.status(500).send({ "Erroare": err.stack });
		res.render('error', { error: err });
	});
}

method.get_config = function () {
	return this;
};

module.exports = config;

