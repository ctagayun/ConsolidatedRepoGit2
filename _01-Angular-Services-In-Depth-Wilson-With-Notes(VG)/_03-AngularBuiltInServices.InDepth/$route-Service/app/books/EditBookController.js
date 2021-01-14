(function () {

    //since this controller will process a paramter, we need to inject the $routeParams service
    //to the controller. We need also to inject the "books" property of "resolve" property
    //of the .when('/EditBook/:bookID' route.
    //We don't need to inject the DataService because the "book" property of the resolve config object will handle that.
    //see (.when('/EditBook/:bookID') in app.js. So instead of injecting "DataService" we will inject "books"

    //To use cookies in our controller we need to inject $cookies and $cookiestore services
    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore) {
        //console.log($routeParams.bookID);

        //create a ViewModel named "vm"
        var vm = this;

        //dataService.getAllBooks()
        //    .then(function(books) {
        //        vm.currentBook = books.filter(function(item) {
        //            return item.book_id == $routeParams.bookID;
        //        })[0];  //because the filter function returns an array I added a bit of code "[0]" to return the item in teh first position of the array to the current book property of the ViewModel
        //    });

        //Create a property in our ViewModel named "currentBook"

        //now instead of invoking dataService.getAllBooks (as in the above commented out code),
        //we will just replace it with books since it is now "books" in the resolve property of 
        //the route (see app.js) that's doing the call to dataService. 
        //We will now be filtering the array of books injected
        //into the controller.
        vm.currentBook = books.filter(function(item) {
            return item.book_id == $routeParams.bookID;
        })[0];


        //I'll define a new function in our ViewModel name setAsFavorite
        vm.setAsFavorite = function() {
            //assign the value of vm.CurrentBook.Title to a 
            //cookie named "favoriteBook". It is a simple string that we are storing
            //so I'll just use $cookies service
            $cookies.favoriteBook = vm.currentBook.title;
        };

        //now I want to store the whole book object (not just a string) so I'll use
        //the $cookieStore service. It takes a key and value to store.
        $cookieStore.put('lastEdited', vm.currentBook);

    }

}());