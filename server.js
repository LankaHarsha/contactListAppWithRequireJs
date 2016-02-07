//Loading External Modules
var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./src/server/config/appConfig.js');

//Defining on which port server need to listen
var port = process.env.PORT || 3030;

//Instantiating server
var app = express();

//Configurations or using modules
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev')); //Log every request to the console

//Configuring the routes
var routes = {};
routes.userRoute = require('./src/server/routes/UserRoute.js');

//Rest-ful api to insertContactDetails
app.post('/api/userContacts', routes.userRoute.insertDetails);
app.get('/api/userContacts', routes.userRoute.getDetails);
app.delete('/api/userContacts:id', routes.userRoute.deleteContact);
app.put('/api/userContacts',routes.userRoute.updateContact);

app.listen(port, function() {

	console.log("Server is listening at 3030");
});

mongoose.connect(config.mongoURL, function(err) {

	if(err) {

		console.log("Error with connecting to MongoDb:"+err);
	}else {

		console.log("MongoDB connected succesfully ::: "+config.mongoURL);
	}
})