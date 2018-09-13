class BaseModel {
	constructor(tableName, primaryKey, source) {
		this.tableName = tableName;
		this.primaryKey = primaryKey;
		this.source = source;
		this.references = {};
	}
	getValueFromObject(object, propertyName) {
		var value;
		if (object === undefined || object === null) value = null;
		else if (object[propertyName] === null || object[propertyName] === undefined) value = null;
		else value = object[propertyName];
		return value;
	}
	addOneToMany(referenceName, model, referenceId) {
		var self = this;
		referenceId = referenceId ? referenceId : (referenceName + "Id");
		if (!self.references[referenceName]) self.references[referenceName] = { model: model, referenceId: referenceId, type: "OneToMany" };
		if (this.source[referenceName]) return this.source[referenceName];
	}
	addForeignKey(referenceName, model, referenceId) {
		var self = this;
		referenceId = referenceId ? referenceId : (referenceName + "Id");
		if (!self.references[referenceName]) {
			let item = new model();
			self.references[referenceName] = { model: model, referenceId: referenceId, type: "ForeignKey", tableName: item.tableName, primaryKey: item.primaryKey };
			item = null;
		}
		if (this.source[referenceName]) return this.source[referenceName];
	}
	getForeignKey(referenceName, model, referenceId) {
		var self = this;
		if (self[referenceId]) {
			try {
				var newItem = new model();
				return newItem.get(self[referenceId], self, referenceName);
			} catch (error) {
				return error;
			}
		}
	}
	getOneToMany(referenceName, model, referenceId) {
		var self = this;
		if (self[referenceId]) {
			try {
				var newItem = new model();
				return newItem.getAll(self[referenceId], self, referenceName);
			} catch (error) {
				return error;
			}
		}
	}
	getAll() {
		var query = "select * from ?? where ??=?";
		console.log("get model", this, itemId);
		var model = this;
		var response = new Promise((resolve, reject) => {
			var data = {
				query: query,
				values: [model.tableName, model.primaryKey, itemId]
			};
			db.runAsyncQuery(data, resolve, reject);
		});

	}
	getFieldsList(alias, values) {
		var fields = Object.keys(this.item);
		var queries = [];
		for (let i = 0; i < fields.length; i++) {
			let fieldName = fields[i];
			queries.push(" ?? as ??");
			values.push(alias + "." + fields[i]);
			values.push(alias + "_" + fields[i]);
		}
		return queries.join(",");
	}
	get(itemId, injectTo, propertyName, callback) {
		if (typeof itemId === "object") return this;
		if (itemId === null || itemId === undefined) return this;
		var model = this;
		var references = Object.keys(model.references);
		var query = "Select ";
		var values = [];
		query += model.getFieldsList("Model", values);
		if (references.length > 0) {
			for (let i = 0; i < references.length; i++) {
				let referenceName = references[i];
				let reference = model.references[referenceName];
				let refModel = new reference.model();
				query += "," + refModel.getFieldsList(referenceName, values);
			}
		}

		query += " From ?? As Model";
		values.push(model.tableName);
		if (references.length > 0) {
			for (let i = 0; i < references.length; i++) {
				let referenceName = references[i];
				let reference = model.references[referenceName];
				query += " Left Join ?? As ?? On ??=?? ";
				values.push(reference.tableName);
				values.push(referenceName);
				values.push("Model." + reference.referenceId);
				values.push(referenceName + "." + reference.primaryKey);
			}
		}
		query += " where ??=?";
		values.push("Model." + model.primaryKey);
		values.push(itemId);
		var response = new Promise((resolve, reject) => {
			var data = {
				query: query,
				values: values
			};
			db.runAsyncQuery(data, resolve, reject);
		});
		response = response.then(function (result) {
			model.item = model.getQueryResultForAlias("Model", result[0]);
			if (references.length > 0) {
				for (let i = 0; i < references.length; i++) {
					let referenceName = references[i];
					let reference = model.references[referenceName];
					let source = {};
					model.item[referenceName] = model.getQueryResultForAlias(referenceName, result[0]);
				}
			}
			if (injectTo) injectTo[propertyName] = model.item;
			return model;
		}).catch((error) => { console.error(error); });
		return response.then(function () {
			return model.finalizeRequest(injectTo, propertyName);
		}).catch(function (error) { console.log("get error", model, error); });
	}
	getQueryResultForAlias(alias, source) {
		let result = {};
		var props = Object.keys(source);
		for (let i = 0; i < props.length; i++) {
			let prop = props[i];
			if (!prop.startsWith(alias + "_")) continue;
			let fieldName = prop.replace(alias + "_", "");
			let value = source[prop];
			result[fieldName] = value;
		}
		return result;
	}
	getMultiplePromises(itemId, injectTo, propertyName, callback) {
		if (typeof itemId === "object") return this;
		if (itemId === null || itemId === undefined) return this;
		var query = "select * from ?? where ??=?";
		console.log("get model", this, itemId);
		var model = this;
		var response = new Promise((resolve, reject) => {
			var data = {
				query: query,
				values: [model.tableName, model.primaryKey, itemId]
			};
			db.runAsyncQuery(data, resolve, reject);
		});
		response.then(function (result) {
			var props = Object.keys(result[0]);
			for (let i = 0; i < props.length; i++) {
				let prop = props[i];
				let value = result[0][prop];
				if (typeof (model[prop]) === "undefined") continue;
				model[prop] = value;
			}
			if (injectTo) injectTo[propertyName] = model;
			return model;
		});
		var references = Object.keys(model.references);
		if (references.length > 0) {
			for (let i = 0; i < references.length; i++) {
				let reference = references[i];
				let methodName = "get" + model.references[reference].type;
				response = response.then((response) => model[methodName](reference, model.references[reference].model, model.references[reference].referenceId)); //jshint ignore:line
			}
		}
		return response.then(function () {
			return model.finalizeRequest(injectTo, propertyName);
		}).catch(function (error) { console.log("get error", model, error); });
	}
	finalizeRequest(injectTo, propertyName) {
		var model = this;
		//console.log("----final response model", model);
		if (injectTo.serverResponse) {
			var res = injectTo.serverResponse;
			delete injectTo.serverResponse;
			res.send(injectTo);
		}
		else return model;
	}
	save(injectTo, propertyName) {
		var model = this;
		var response = new Promise((resolve, reject) => {
			var values = [model.tableName];
			var query = "update ?? set ";
			var fieldsList = "";
			for (var fieldName in model.item) {
				if (fieldName === model.primaryKey) continue;
				var value = model.item[fieldName];
				var valueType = typeof value;
				fieldsList += (fieldsList ? ", " : "") + " ??=? ";
				values.push(fieldName);
				values.push(value);
			}
			query += fieldsList + " where ??=?";
			values.push(model.primaryKey);
			values.push(model.item[model.primaryKey]);

			var data = {
				query: query,
				values: values
			};
			db.runAsyncQuery(data, resolve, reject);
		});
		return response.then(function (result) {
			if (result.affectedRows === 1) model.get(model.item[model.primaryKey], injectTo, propertyName);
			else if (injectTo.serverResponse) helper.response.error({ message: "Item not saved!" }, injectTo.serverResponse);
		}).catch(function (error) { console.error(error);});
	}
	create(injectTo, propertyName) {
		var model = this;
		var response = new Promise((resolve, reject) => {
			var values = [model.tableName];
			var query = "insert into ?? set ";
			var fieldsList = "";
			for (var fieldName in model) {
				if (fieldName === model.primaryKey) continue;
				if (fieldName.substring(0, 1).toUpperCase() !== fieldName.substring(0, 1)) continue;
				if (fieldName.substring(0, 1).toLowerCase() === fieldName.substring(0, 1)) continue;
				var value = model[fieldName];
				var valueType = typeof value;
				if (["boolean", "number", "string"].indexOf(valueType) === -1) continue;
				fieldsList += (fieldsList ? ", " : "") + " ??=? ";
				values.push(fieldName);
				values.push(value);
			}
			query += fieldsList + " where ??=?";
			values.push(model.primaryKey);
			values.push(model[model.primaryKey]);

			var data = {
				query: query,
				values: values
			};
			db.runAsyncQuery(data, resolve, reject);
		});
		return response.then(function (result) {
			if (result.affectedRows === 1) model.get(result.insertId, injectTo, propertyName);
			else throw "Error occurs " + JSON.stringify(result);
		});
	}
	fieldIsRequired(errors, fieldName) {
		var self = this;
		var value = self[fieldName];
		if (value !== null && value !== undefined) {
			if (typeof value === "string" && value !== "") return;
		}
		var existing = errors["item." + fieldName];
		if (Object.prototype.toString.call(existing) !== "[object Array]") errors["item." + fieldName] = [];
		errors["item." + fieldName].push("Field is Required");
	}
	hasErrors() {
		var modelProps = Object.keys(this);
		var errors = {};
		var self = this;
		for (let i = 0; i < modelProps.length; i++) {
			let FieldName = modelProps[i];
			if (typeof self["validate" + FieldName] === "function") self["validate" + FieldName](errors);
		}
		if (typeof self.validateAll === "function") self.validateAll(errors);
		if (Object.keys(errors).length > 0) return errors;
		else return false;
	}
}
if (typeof global !== "undefined") global.BaseModel = BaseModel;
