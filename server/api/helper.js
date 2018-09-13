var helper = {
	cookie: function (res, name, value) {
		var appName = helper.applicationInfo.name + "_" + helper.applicationInfo.version;
		if (!res.req.cookies[appName]) res.req.cookies[appName] = {};
		var cookie = res.req.cookies[appName];
		if (arguments.length === 2) return cookie[name];
		cookie[name] = value;
		res.cookie(appName, cookie, { maxAge: 1000 * 60 * 60 * 24 * 10, httpOnly: true });
	},
	createAnonymousUser: function () {
		var user = { UserName: "Anonymous", FirstName: "Anonymous", LastName: "User" };
		return user;
	},
	response: {
		success: function (data, extra, res) {
			res = arguments.length === 3 ? res : extra;
			extra = arguments.length === 3 ? extra: null;
			var response = {
				status: true,
				data: data,
				extra: extra
			};
			res.send(response);
		},
		error: function (err, res) {
			var response = {
				status: false,
				data: err,
				message: err.message || "Db query error"
			};
			console.error(err);
			res.send(response);
		},
		validateError: function (err, res) {
			var response = {
				status: false,
				errors: err
			};
			res.send(response);
		}},
};
module.exports = helper;
global.helpers.global = helper;
