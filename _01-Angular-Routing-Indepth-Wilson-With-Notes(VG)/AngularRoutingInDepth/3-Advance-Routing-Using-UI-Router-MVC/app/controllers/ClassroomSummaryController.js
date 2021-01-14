(function () {
    //classroom is injected after the resolve property in app.js .state('classroom_parent' executes
    angular.module('app')
        .controller('ClassroomSummaryController', ['classroom', ClassroomSummaryController]);

    function ClassroomSummaryController(classroom) {

        var vm = this;

        //no need to call data service here because it has been called in the "resolve" property of 
        //of the parent .state which populated "classroom"
        vm.schoolPrincipal = classroom.principal;
    }

}());