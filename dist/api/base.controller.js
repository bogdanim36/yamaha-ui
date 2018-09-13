class BaseController {
	/**
	 * 
	 * @param name
	 * @param model
	 * @param fieldsList Db fields list for getAll and get
	 */
	constructor(name, model, fieldsList) {
		this.name = name;
		/**
		 *@type {function}
		 */
		this.model = model;
		/**
		 *@type {string} 
		*/
		this.fieldsList = fieldsList ? fieldsList : null;
		var controller = this;
		app.get("/"+ controller.name, function (req, res) { controller.getAll(req, res); });
		app.post("/" + controller.name, function (req, res) { controller.create(req, res); });
		app.get("/" + controller.name + "/new", function (req, res) { controller.new(req, res); });
		app.get("/" + controller.name + "/:id", function (req, res) { controller.get(req, res); });
		app.put("/" + controller.name + "/:id", function (req, res) { controller.update(req, res); });
		app.delete("/" + controller.name + "/:id", function (req, res) { controller.delete(req, res); });
	}
	/**
	 * get extra item in server response
	 * @returns {object}
	 */
	getExtraResponse() {
		return {};
	}
	/**
	 * Check is user is authenticated. If not, redirect to /login
	 * @param req
	 * @param res
	 * @returns
	 */
	isAuthenticated(req, res) {
		var userInfo = global.anonymousAuth ? helper.createAnonymousUser() : {};

		if (userInfo && userInfo.UserName) return true;
		res.status(401).send({ redirect: "/login" });
	}
	/**
	 * get all records from db
	 * @param req
	 * @param res
	 */
	getAll(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		var controller = this;
		var query, values;
		if (this.fieldsList) { query = "select ?? from ?? "; values = [this.fieldsList, this.name]; }
		else query = "select * from ?? "; values = [this.name];
		var data = {
			query: query,
			values: values,
			success: function (queryResult) {
				var extra = controller.getExtraResponse("getAll");
				helper.response.success(queryResult, extra, res);
			}
		};
		db.runQuery(data, res);
	}
	get(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		if (!req.params.id) helper.response.error({ message: "No id provided as parameter" }, res);
		else {
			var id = req.params.id;
			var controller = this;
			var response = {
				status: true,
				data:null,
				serverResponse: res
			};
			var item = new controller.model(id, response, "data");
		}
	}
	/**
	 * get an empty item with fields from db
	 * @param req
	 * @param res
	 */
	new(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		db.getNew(this.name, dbConfig.dbName, res, function (response) {
			helper.response.success(response, null, res);
		});
	}
	/**
	 * update a record in db
	 * @param req
	 * @param res
	 */
	update(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		if (!req.body.item) helper.response.error({ message: "No item object provided as parameter" }, res);
		else {
			var item = new this.model(req.body.item);
			var errors = item.hasErrors();
			if (errors) helper.response.validateError(errors, res);
			else {
				var response = {
					status: true,
					data: null,
					serverResponse: res
				};
				item.save(response, "data");
			}
		}
	}
	/**
	 * insert new records in db
	 * @param req
	 * @param res
	 */
	create(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		if (!req.body.item) helper.response.error({ message: "No item object provided as parameter" }, res);
		else {
			var item = new this.model(req.body.item);
			var errors = item.hasErrors();
			if (errors) helper.response.validateError(errors, res);
			else {
				var response = {
					status: true,
					data: null,
					serverResponse: res
				};
				item.create(response, "data");
			}
		}
	}
	/**
	 * delete record in db
	 * @param req
	 * @param res
	 */
	delete(req, res) {
		if (!this.isAuthenticated(req, res)) return;
		if (!req.params.id) helper.response.error({ message: "No id provided as parameter" }, res);
		else {
			var id = req.params.id;
			db.getDeleteQuery(id, this.name, dbConfig.dbName, res);
		}
	}
}
if (global) global.BaseController = BaseController;
