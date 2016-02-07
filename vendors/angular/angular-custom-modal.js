(function(){
	'use strict';
	angular
		.module('angularModal', [])
		.factory('ModalFactory', ModalFactory);

	ModalFactory.$inject = ['$http', '$q', '$compile', '$rootScope', '$controller', '$templateCache'];

	function ModalFactory($http, $q, $compile, $rootScope, $controller, $templateCache){

		function CreateModal() {}

		CreateModal.prototype.show = showModal;

		function showModal(request) {

			var deferred,
				scope,
				linkFn,
				modalElement,
				inputs,
				modalCtrl,
				response;

			deferred = $q.defer();

			checkCtrl();

			return deferred.promise;

			function checkCtrl() {

				if(request.controller) {

					checkTemplate();
				} else {

					deferred.reject('Please provide the controller name.');
				} 
			}

			function checkTemplate() {

				if(request.template) {

					prepareModal(request.template);		
				} else if(request.templateUrl) {

					$templateCache.put(request.templateUrl);

					getTemplateData().then(function(template){

						prepareModal(template);
					}, function(error){

						deferred.reject("Eror white retrieving template,..");
					});
				} else{

					deferred.reject("Please provide the template or templateUrl.");
				}
			}

			function getTemplateData() {

				var deferred = $q.defer();

				$http({
					method: 'GET',
					url: request.templateUrl,
					cache: true
				}).then(function(response){

					return deferred.resolve(response.data);
				}, function(error){

					return deferred.reject(error);
				});

				return deferred.promise;
			}

			function prepareModal(template) {

				scope = $rootScope.$new();
				linkFn = $compile(template);
				modalElement = linkFn(scope);

				// Add close method to the Modal scope
				scope.close = closeModal;

				inputs = {
					$scope: scope
				};

				modalCtrl = $controller(request.controller, inputs);

				addModalToDom(modalElement);

				response = {
				  controller: modalCtrl,
				  scope: scope,
				  element: modalElement,
				  id: request.id
				};

				deferred.resolve(response);
			}

			function addModalToDom(modalElement) {

				if(request.appendElement) {

					angular.element(document.getElementById(request.appendElement)).append(modalElement);
				} else {

					angular.element(document.body).append(modalElement);
				}

				angular.element(modalElement).addClass('in');
			}

			function closeModal() {

				var modal;

				modal = document.getElementById(request.id);

				angular.element(modal).removeClass('in');

				if(request.appendElement) {

					document.getElementById(request.appendElement).innerHTML = '';
				} else {

					document.body.removeChild(modal);
				}

				scope.$destroy();
			}
		}

		return new CreateModal();
	}
})();