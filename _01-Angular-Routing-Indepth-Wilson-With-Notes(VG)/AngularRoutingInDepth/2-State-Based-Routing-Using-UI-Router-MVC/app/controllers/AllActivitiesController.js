(function () {

    angular.module('app')
        .controller('AllActivitiesController', ['dataService', 'notifier', '$state', 'activities', '$log', AllActivitiesController]);

    //activities is injected dynamically   from the resolve property
    function AllActivitiesController(dataService, notifier, $state, activities, $log) {

        var vm = this;

        vm.selectedMonth = 1; // default to January

        vm.allActivities = activities;

        $log.debug($state.current.data);
        $log.debug($state.current.foo);

        //a function that will activate classroom_detail state (see app.js)  when search is in activities.html is clicked
        //remember the $state.go service is one of the three methods to transition from one state to another
        //classroom_detail is state in app.js. it has two parameters. id and month
        vm.search = function () {
            $state.go('classroom_detail', {id: vm.selectedClassroom.id, month: vm.selectedMonth});
        };


        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.selectedClassroom = classrooms[0];
            })
            .catch(showError);

        //we don't need this now because of the "resolve" property if the :activities" state (see app.js)
        //dataService.getAllActivities()
        //    .then(function(activities) {
        //        vm.allActivities = activities;
        //    })
        //    .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());