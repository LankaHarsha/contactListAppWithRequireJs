require(['angular','contactList/module'], function(angular,contactListModule) {

	contactListModule.service('contactService', function($http , $q) {

		this.addContact = function(query) {

			//A new instance of deferred is constructed by calling $q.defer().
			var deffered = $q.defer();
			var config = {
				method: "post",
				url: "/api/userContacts",
				data: query
			};
			$http(config).success(function(response) {

				deffered.resolve(response);
			}).error(function(data) {

				deffered.reject(data);
			});

			return deffered.promise;
		};

		this.getContacts = function() {

			console.log("Get Contacts Service is called");
			var deffered = $q.defer();
			var config = {
				method: "get",
				url: "/api/userContacts"
			};
			$http(config).then(function(response) {

				console.log("This is success of getContacts");
				console.log(response);
				deffered.resolve(response.data);
			}, function(data) {

				console.log("This is error of getContacts");
				deffered.reject(data);
			});

			return deffered.promise;
		}

		this.deleteContact = function(data) {

			var deffered = $q.defer();
			var config = {
				method: "delete",
				url: "/api/userContacts"+data.uid,
			};
			$http(config).then(function(response) {

				console.log("This is success of deleting contacts");
				deffered.resolve(response);
			},function(response) {

				deffered.reject(response);
			});
			return deffered.promise;
		}

		this.updateContact = function(data) {

			console.log(data);
			var deffered = $q.defer();
			var config = {
				method: "put",
				url: "/api/userContacts",
				data: data
			};
			$http(config).then(function(response) {

				deffered.resolve(response);
			},function(response){

				deffered.reject(response);
			});
			return deffered.promise;
		}


	})
})