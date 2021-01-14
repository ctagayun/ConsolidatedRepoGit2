(function() {

    angular.module('app')
        .controller('AddBookController', ['$log', '$location', 'dataService', AddBookController]);

    function AddBookController($log, $location, dataService) {

        var vm = this;

        //this is the book that will be bound to the view
        vm.newBook = {};

        vm.addBook = function () {

            dataService.addBook(vm.newBook)
                .then(addBookSuccess)
                .catch(addBookError);

        };

        function addBookSuccess(message) {
            //if insert is success just log the message
            $log.info(message);
            $location.path('/');
        }

        function addBookError(errorMessage) {
            //if insert is not successful just log the message
            $log.error(errorMessage);
        }

    }

}());