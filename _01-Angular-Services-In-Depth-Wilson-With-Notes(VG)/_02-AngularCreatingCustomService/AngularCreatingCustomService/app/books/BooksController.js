(function() {

    angular.module('app')
        .controller('BooksController',
        ['books', 'dataService', 'logger', 'badgeService', BooksController]);

    //the above is what you call inline annotation. notice it matches the  name
    //it matches the name and order of the parameters of the services
    //injected below. this is needed when you minify these injected into the BoksController function.
    //the last value in the array is the function that will represent the controller. in this
    //BooksController.
    //injecting the dataService

    function BooksController(books, dataService, logger, badgeService) {

        var vm = this;

        vm.appName = books.appName;

        //invoke the service and assign result to a variable that will serve as the ViewModel
        vm.allBooks = dataService.getAllBooks();
        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController has been created.');

    }

}());