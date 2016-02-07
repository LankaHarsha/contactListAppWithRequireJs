define([
	'angular',
	'angular-route',
	'contactList/module-loader',
	'contactList/module',
	'Common/moduleLoader'
	],function(angular){
	var sampleApp = angular.module('sampleApp',['ui.router','sampleApp.contactListModule', 'sampleApp.common']);
	
	return sampleApp;
});