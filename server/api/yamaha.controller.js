class YamahaController {
	constructor() {
		this.name = "yamaha";
		this.status = {};
		var yamahaAPI = require("./yamaha");
		this.ctrl = new yamahaAPI("", 1, 0);
		var controller = this;
		var express = require("express");
		var appRouter = express.Router();
		appRouter.post("/cmd", function (req, res, next) {
			controller.postCmd(req, res, next);
		});
		appRouter.get("/setCtrlIp", function (req, res, next) {
			controller.setCtrlIp(req, res, next);
		});
		appRouter.get("/getBasicInfo", function (req, res, next) {
			controller.getBasicInfo(req, res, next);
		});
		appRouter.get("/getServerInfo", function (req, res, next) {
			controller.getServerInfo(req, res, next);
		});
		appRouter.get("/getSystemConfig", function (req, res, next) {
			controller.getSystemConfig(req, res, next);
		});
		appRouter.get("/getShuffleInfo", function (req, res, next) {
			var input = req.query.input;
			controller.ctrl.getShuffleInfo(input).then(function (info) {
				helper.response.success(info, res);
			}).catch(function (error) {
				helper.response.error(error, res);
			});
		});
		app.use("/api/Yamaha", appRouter);
	}

	postCmd(req, res) {
		if (!req.body.cmd) helper.response.error({message: "No cmd provided as parameter"}, res);
		else {
			var param1 = req.body.param1;
			var param2 = req.body.param2;
			var param3 = req.body.param3;
			var cmd = req.body.cmd;
			var self = this;
			if (!this.ctrl[cmd]) helper.response.error({message: cmd + " not defined as command in Yamaha Controller"}, res);
			this.ctrl[cmd](param1, param2, param3).then(function (basicInfo) {
				helper.response.success(basicInfo, res);
			}).catch(function (error) {
				helper.response.error(error, res);
			});
		}
	}

	setCtrlIp(req, res, next) {
		if (!req.query.ip) helper.response.error({message: "No ip provided as parameter"}, res);
		else {
			this.ctrl.ip = req.query.ip;
			helper.response.success(req.query.ip, res);
		}
	}

	getBasicInfo(req, res, next) {
		if (!req.query.zone) helper.response.error({message: "No zone provided as parameter"}, res);
		else {
			var zone = req.query.zone;
			var self = this;
			var finish = this.ctrl.getBasicInfo(zone, res).then(function (basicInfo) {
				helper.response.success(basicInfo, res);
			}).catch(function (error) {
				helper.response.error(error, res);
			});
		}
	}

	getServerInfo(req, res) {
		if (!req.query.zone) helper.response.error({message: "No zone provided as parameter"}, res);
		else {
			var self = this;
			this.ctrl.getServerInfo().then(function (info) {
				helper.response.success(info, res);
			}).catch(function (error) {
				helper.response.error(error, res);
			});
		}
	}

	getSystemConfig(req, res, next) {
		if (!req.query.zone) helper.response.error({message: "No zone provided as parameter"}, res);
		else {
			var zone = req.query.zone;
			var controller = this;
			this.ctrl.getSystemConfig().then(function (config) {
				controller.status.config = config.YAMAHA_AV.System[0].Config[0];
				controller.status.inputs = config.YAMAHA_AV.System[0].Config[0].Name[0].Input[0];
				controller.ctrl.getZoneConfig(zone).then(function (config) {
					controller.status.scenes = config.YAMAHA_AV[zone][0].Config[0].Name[0].Scene[0];
					helper.response.success({
						config: controller.status.config,
						inputs: controller.status.inputs,
						scenes: controller.status.scenes
					}, res);
				}).catch(function (error) {
					helper.response.error(error, res);
				});
			}).catch(function (error) {
				helper.response.error(error, res);
			});
		}
	}
}

module.exports = new YamahaController();