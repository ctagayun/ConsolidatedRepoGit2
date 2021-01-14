(function () {

    //injecting the $route service into the controller
    angular.module('app')
        .controller('HomeController', ['dataService', 'notifier', '$route', '$log', HomeController]);

    function HomeController(dataService, notifier, $route, $log) {

        var vm = this;

        vm.message = 'Welcome to School Buddy!';

        //demo using $route
        vm.refresh = function() {
            $log.debug($route.current);
            $log.debug($route.routes);
            $route.reload(); //refressh using the rreload function
        };

        dataService.getAllSchools()
            .then(function(schools) {
                vm.allSchools = schools;
                vm.schoolCount = schools.length;
            })
            .catch(showError);

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.classroomCount = classrooms.length;
            })
            .catch(showError);

        dataService.getAllActivities()
            .then(function(activities) {
                vm.allActivities = activities;
                vm.activityCount = activities.length;
            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());