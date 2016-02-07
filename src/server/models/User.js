var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Schema defining to store user contact details

var UserSchema = new Schema({
	name:{ type: String },
	phone:{ type: String }
});

//Compiling Schema to a model

var UserModel = mongoose.model('User', UserSchema, 'users');

//Exporting Model using module.exports

module.exports.UserModel = UserModel;