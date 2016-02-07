var database = require('../models/User.js'),
	mongoose = require('mongoose'),
	Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var insertDetails = function(request, response) {

	console.log("Entered to insertDetails");
	var userModel = new database.UserModel();
	userModel.name = request.body.userName;
	userModel.phone = request.body.userNumber;
	userModel.saveAsync().then(function(user) {

		response.json({
			status: 200,
			data: user
		})
	}).catch(function(err) {

		response.json({
			status: 404,
			data: null
		})
	});
};

var getDetails = function(request,response) {

	console.log("Entered to getDetails");
	database.UserModel.findAsync().then(function(user) {

		response.json({
			status: 200,
			data: user
		});
	}).catch(function(err) {

		response.json({
			status: 404,
			data: null
		})
	});
};

var deleteContact = function(request, response) {

	console.log("Entered to deleteContact");
	console.log(request.params.id);

	database.UserModel.removeAsync({"_id":request.params.id}).then(function(user) {

		console.log(user);
		response.json({
			status: 200,
			data: user
		});
	}).catch(function(err) {

		console.log("This is data removal error");
		response.json({
			status: 400,
			data: null
		})
	})
}

var updateContact = function(request, response) {

	console.log("Entered to updateContact");
	console.log(request.body.uid);
	console.log(request.body);
	database.UserModel.findOneAsync({"_id":request.body.uid}).then(function(user) {

		console.log(user);
		user.name = request.body.userName;
		user.phone = request.body.userNumber;
		return user.saveAsync();
	}).then(function(user) {

		console.log(user);
		response.json({
			status: 200,
			data: user
		});
	}).catch(function(err) {

		console.log(err);
	});
}

module.exports.insertDetails = insertDetails;
module.exports.getDetails = getDetails;
module.exports.deleteContact = deleteContact;
module.exports.updateContact = updateContact;