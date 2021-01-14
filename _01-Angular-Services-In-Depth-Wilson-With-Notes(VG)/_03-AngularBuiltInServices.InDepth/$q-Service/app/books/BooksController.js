(function() {

    angular.module('app')
        .controller('BooksController', ['$q', 'books', 'dataService', 'badgeService', '$cookies', '$cookieStore', '$log', BooksController]);


    function BooksController($q, books, dataService, badgeService, $cookies, $cookieStore, $log) {

        var vm = this;

        vm.appName = books.appName;

        /*
        Technique 2 - it is possible to wait on an entire array of promises to be
        successfully resolved before taking some action.

        The following section of code performs the same function as the larger section
        below, but waits until both promises are resolved before processing the results.
        It was demonstrated in the module, so I'm leaving it here as a reference.
         */
         
        //technique stores promises in variables
        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        //then I call on the "all" function in the $q service and pass it an array containing the two 
        //promises returned from dataService. The all function will return a promise when all of the 
        //promises in the array have been resolved or rejected. we can then process that promise by calling
        //.then and .catch
        $q.all([booksPromise, readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        //one additional wrinkle is that the data passed to the success handler which I named "dataArray"
        //in this example is actually an an array of the data returned from the promises in the array.
        //The data will be returned in the same index position as the promise it goes with in the 
        //array passed to the "all" function. You can see that I just indexed into the the dataArray and assigned the
        //to the properties on our ViewModel. The booksPromise was the first element in the promiseArray, so the
        //books data is in the first element of the retuned dataArray. before anything of this work, I need to inject
        //$q to the controller
        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(reason) {
            console.log(reason);
        }
        

        ////Technique 1
        ////promise version - async. the .then, .catch, .finally are functions in the promise
        //dataService.getAllBooks()
        //    // .then(getBooksSuccess, getBooksError, getBooksNotification); // the first 2 parms are success and error call backs. The third handles notification

        //    //better way of hnadling success and error conditions
        //    .then(getBooksSuccess, null, getBooksNotification)
        //    .catch(errorCallback)
        //    .finally(getAllBooksComplete); //finally allows you to execute a callback regardless of wheter promise was resolved or rejected
        //                                    //good place to put housekeeping code. 
        ////books is the object returned by resolve function of the deferred object in the data service
        //function getBooksSuccess(books) {
        //    //throw 'error in success handler';
        //    vm.allBooks = books;
        //}

        ////reason is the object returned by the reject function of the deferred object in data service
        //function getBooksError(reason) {
        //    console.log(reason);
        //}

        //function getBooksNotification(notification) {
        //    console.log('Promise Notification: ' + notification);
        //}

        //function errorCallback(errorMsg) {
        //    console.log('Error Message: ' + errorMsg);
        //}

        //function getAllBooksComplete() {
        //    console.log('getAllBooks has completed');
        //}

        //vm.allReaders = dataService.getAllReaders();

        //dataService.getAllReaders()
        //    .then(getReadersSuccess)
        //    .catch(errorCallback)
        //    .finally(getAllReadersComplete);

        //function getReadersSuccess(readers) {
        //    vm.allReaders = readers;
        //}

        //function getAllReadersComplete() {
        //    //console.log('getAllReaders has completed');
        //}

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;

        vm.lastEdited = $cookieStore.get('lastEdited');

        $log.log('logging with log');
        $log.info('logging with info');
        $log.warn('logging with warn');
        $log.error('logging with error');
        $log.debug('logging with debug');


    }

}());