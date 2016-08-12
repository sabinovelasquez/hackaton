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
			new Candidate('Hacer un cover de Nunca me faltes (por: El Chico de las poesías)'),
			new Candidate('Cocinar para un gato (por: Martín Carcamo)'),
			new Candidate('Llegar a nivel 20 en Pokemon (por: Fyto Manga)')
		];
  });