(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'badgeService', BooksController]);


    function BooksController(books, dataService, badgeService) {

        var vm = this;

        vm.appName = books.appName;

        vm.allBooks = dataService.getAllBooks();
        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

    }

}());