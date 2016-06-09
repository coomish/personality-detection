(function() {

    angular.module('twitterSurvey')

    // inject the Profile service factory into our controller
    .controller('mainCtrl', mainController);

    function mainController($scope, $http, Profiles) {
        $scope.formData = {};
        $scope.loading = true;
        $scope.profiles = [];
        $scope.step = 0;
        // GET =====================================================================
        // when landing on the page, get all profiles and show them
        // use the service to get all the profiles
        Profiles.get()
            .success(function(data) {
                $scope.profiles = data;
                $scope.loading = false;
            });
        // Creating Walkthrough
        $scope.stepper = function(step) {
          $scope.step = step;
          if ($scope.step == 1) {
            $scope.twitterdata = {}
          }
        };
        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createProfile = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.screen_name != undefined) {
                $scope.loading = true;

                // call the create function from our service
                Profiles.create($scope.formData)

                // if successful creation, call get function to get all the new profiles
                .success(function(data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.profiles = data; // assign our new list of profiles
                });
            }
        };
        // checkTwitter ==================================================================
        $scope.checkTwitter = function(twitterData) {

            // validate Account
            if ($scope.formData.screen_name != undefined) {
                $scope.loading = true;

                Profiles.check($scope.formData.screen_name)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.twitterdata = data;
                    // console.log(data);
                });
            }
        };
        // DELETE ==================================================================
        // delete a profile after checking it
        $scope.deleteProfile = function(id) {
            $scope.loading = true;

            Profiles.delete(id)
                // if successful creation, call get function to get all the new profiles
                .success(function(data) {
                    $scope.loading = false;
                    $scope.profiles = data; // assign our new list of profiles
                });
        };
    }
})();
