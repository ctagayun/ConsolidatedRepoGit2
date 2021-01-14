(function () {

    angular.module('app')
        .controller('AllActivitiesController', ['dataService', 'notifier', '$location', 'activities', AllActivitiesController]);

    //"activities" will come and populated from the "resolve" (see app.js)
    function AllActivitiesController(dataService, notifier, $location, activities) {

        var vm = this;

        vm.selectedMonth = 1; // default to January

        vm.allActivities = activities;

        vm.search = function () {
            var classroom_detail_url = '/classrooms/' + vm.selectedClassroom.id + '/detail/' + vm.selectedMonth;
            $location.url(classroom_detail_url);
        };


        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.selectedClassroom = classrooms[0];
            })
            .catch(showError);

        //no need to call this because it will be called from the "resolve"
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