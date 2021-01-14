(function () {

    //classroom is injected after the resolve property in app.js .state('classroom_parent' executes
    angular.module('app')
        .controller('ClassroomController', ['dataService', 'notifier', '$stateParams', 'classroom', ClassroomController]);

    function ClassroomController(dataService, notifier, $stateParams, classroom) {

        var vm = this;

        vm.month = $stateParams.month;

        vm.message = $stateParams.classroomMessage;

        //no need to call data service here because it has been called in the "resolve" property of 
        //of the parent .state which populated "classroom"
        vm.currentClassroom = classroom;

        if ($stateParams.month) {
            if (classroom.activities.length > 0) {
                vm.timePeriod = dataService.getMonthName($stateParams.month);
            }
            else {
                vm.timePeriod = 'No activities this month';
            }
        }
        else {
            vm.timePeriod = 'All activities';
        }
    }

}());