define(['angular', './module'], function(angular, sampleApp) {

	console.log(sampleApp);
	sampleApp.config(function($stateProvider){
		$stateProvider.state('/contactList',{
			url:'/contactList',
			templateUrl:'src/client/contactList/contact-list.html',
			title:'Contact-List'
		});
	});
})