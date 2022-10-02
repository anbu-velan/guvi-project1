const BaseUrl = '/api/v1/';
module.exports = function (app) {
	app.use(BaseUrl + "account", require("../controllers/account"));
}
