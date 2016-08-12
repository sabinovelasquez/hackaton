'use strict';

/**
 * Service - Voting Candidate
 */
angular.module('firebaseVotingApp', ['firebase']);

angular.module('firebaseVotingApp')
  .factory('Candidate', ['$firebase', function ($firebase) {

		return function(name) {
			var self = this;
			var fb =  new Firebase('https://hackaton-2brains.firebaseio.com/');
			var entry = fb.child('/votes/' + name);
			var sync = $firebase(entry);
	  
			self.name = name;
			self.votes = sync.$asArray();
	 
			self.vote = function() {
				self.votes.$add(1);				
			};
		};
}]);

/**
 * Controller
 */

angular.module('firebaseVotingApp')
  .controller('MainCtrl', function ($scope, Candidate) {
		$scope.candidates = [
			new Candidate('Un red social para perros (por: El Chico Terry)'),
			new Candidate('Cocinar sin sal (por: Martín Carcamo)'),
			new Candidate('Tomarse un gimnasio en Pokemon (por: Fyto Manga)')
		];
  });