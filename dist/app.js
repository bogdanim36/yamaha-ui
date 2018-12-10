/*requiring node modules starts */
global.rootPath = "dist";
global.apiPath = "./api";
global.uploadPath = "./" + rootPath + "/uploads";
global.srcPath = __dirname;
console.log(srcPath);
global.urlPort = 8080;
global.tmpPath = "C:/Temp/Upload";
global.helpers = {};
global.models = {};
var express = require("express");
global.app = express();
global._ = require("lodash");
var Session = require("express-session");
var cookieParser = require("cookie-parser");

// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());

var Session = Session({
	secret: "SecretTokken",
	saveUninitialized: true,
	resave: true,
	cookie: {
		domain: 'WebMP',
		maxAge: 1000 * 24 * 60
	}
});

app.use(Session);
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

var multipart = require('connect-multiparty');
app.use(multipart({
	uploadDir: global.tmpPath
}));
var config = require("./api/config.js")(app);
global.helper = require(global.apiPath + "/helper");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require(global.apiPath + "/yamaha.controller");

process.on('uncaughtException', function (err) {
	console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	process.exit(1);
});

global.app.listen(global.urlPort, function() {
	console.log("Listening on http://127.0.0.1:" + global.urlPort);
}).on("error", function (e) { console.log("oroare", e); });


