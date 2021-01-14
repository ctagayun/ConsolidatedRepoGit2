(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'BooksResource', EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location, BooksResource) {

        var vm = this;

        //vm.currentBook = books.filter(function(item) {
        //    return item.book_id == $routeParams.bookID;
        //})[0];

        //use the book id retrieved from the $routepParams service
        //dataService.getBookByID($routeParams.bookID)
        //    .then(getBookSuccess)
        //    .catch(getBookError);

        //vm.currentBook = BooksResource.get({ book_id: $routeParams.bookID });
        //$log.log(vm.currentBook);

        function getBookSuccess(book) {
            vm.currentBook = book;
            //save the last edited book in the cookieStore
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        //if the promise is rejected, we just log the error message
        function getBookError(reason) {
            $log.error(reason);
        }

        vm.setAsFavorite = function() {

            $cookies.favoriteBook = vm.currentBook.title;

        };

        vm.saveBook = function() {

            //dataService.updateBook(vm.currentBook)
            //    .then(updateBookSuccess)
            //    .catch(updateBookError);

            vm.currentBook.$update();
            $location.path('/');
        };

        function updateBookSuccess(message) {
            $log.info(message);
            //use the $location service to programatically redirect us to the root of the application
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            //if there's an error we just log the error
            $log.error(errorMessage);
        }


    }

}());