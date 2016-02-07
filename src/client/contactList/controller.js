require(['angular','contactList/module','contactList/services'], function(angular, contactListmodule) {

	contactListmodule.controller('contactListController', function($scope,contactService) {

		$scope.userContacts = null;

		var successLoadingContacts = function(data) {

			$scope.userContacts = data.data;
		};

		var failureLoadingContacts = function(data) {
			console.log("This is failure contacts");
			console.log(data);
		}

		contactService.getContacts().then(successLoadingContacts,failureLoadingContacts);

		$scope.add = function() {

			$scope.userData = {};
			$scope.userData.userName = $scope.userName;
			$scope.userData.userNumber = $scope.userNumber;
			var successInsertion = function(data) {

				if(data.data) {

					$scope.userContacts.push(data.data);
					$scope.userName="";
					$scope.userNumber="";
				}
			};

			var failureInsertion = function(data) {

				console.log(data);
			}

			contactService.addContact($scope.userData).then(successInsertion,failureInsertion);
		};

		$scope.delete = function(userId) {

			$scope.userData = {};
			console.log(userId)
			$scope.userData.uid = userId;
			var successDeletion = function(data) {

				if(data.status === 200) {

					$scope.userContacts.filter(function(record) {
	
						if(record._id === userId){
							$scope.userContacts.splice($scope.userContacts.indexOf(record),1);
						}
					});
				}
			}
			var failureDeletion = function(data) {

				console.log("this is failure");
				console.log(data);
			}
			contactService.deleteContact($scope.userData).then(successDeletion,failureDeletion);
		}

		$scope.edit = function(userId){

			var contact = $scope.userContacts.filter(function(record) {
				return record._id === userId;
			});
			$scope.userName = contact[0].name;
			$scope.userNumber = contact[0].phone;
			$scope.contactId = contact[0]._id;
		}

		$scope.update = function() {

			var successUpdation = function(data) {

				if(data.status === 200) {

					$scope.userContacts.filter(function(record) {

						if(record._id === $scope.contactId) {
							record.name = $scope.userName;
							record.phone = $scope.userNumber;
						}
					});
					$scope.userName = "";
					$scope.userNumber = "";
					$scope.contactId = "";
				}
			}

			var failureUpdation = function(data) {

				console.log("failure in updation");
				console.log(data);
			}
			contactService.updateContact({
				uid: $scope.contactId,
				userName: $scope.userName,
				userNumber: $scope.userNumber
			}).then(successUpdation,failureUpdation);

		}
		
	});
})