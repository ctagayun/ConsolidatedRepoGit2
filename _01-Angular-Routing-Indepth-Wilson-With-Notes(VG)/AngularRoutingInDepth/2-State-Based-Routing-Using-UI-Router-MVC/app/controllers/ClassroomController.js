(function () {

    angular.module('app')
        .controller('ClassroomController', ['dataService', 'notifier', '$stateParams', ClassroomController]);

    function ClassroomController(dataService, notifier, $stateParams) {

        var vm = this;

        //.state('classroom_detail', {
        //url: '/classrooms/{id:[0-9]}/detail/{month}', has two parameters id and month. to use the additional paramter
        //we need to add a new property to the ClassroomController 
        //by adding vm.month and  set it equal to the month parameter on the $stateParams service
        vm.month = $stateParams.month;

        vm.message = $stateParams.classroomMessage;

        dataService.getClassroom($stateParams.id)
            .then(function (classroom) {
                vm.currentClassroom = classroom;

               // month parameter is not null set the time period value on the view model
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

            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }


    }

}());