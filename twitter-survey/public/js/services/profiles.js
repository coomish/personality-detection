angular.module('twitterSurvey')

	// super simple service
	// each function returns a promise object
	.factory('Profiles', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/profiles');
			},
			create : function(profileData) {
				return $http.post('/api/profiles', profileData);
			},
			delete : function(id) {
				return $http.delete('/api/profiles/' + id);
			},
      check : function(screen_name) {
        return $http.get('/api/twittercheck/' + screen_name);

      }
		}
	}]);
