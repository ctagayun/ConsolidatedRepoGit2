(function() {

    angular.module('app')
        .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);


    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };


        //called from bookController
        //note i am using the API here (.then and .catch... not the ".success and .error" functions returned by $http
        //because if I use .success and .error, these functions will each receive 4 parameters (data, status, headers, config)
        //instead of just one response object (by the way this is how jQuery ajax calls are handled.. it receives 4 parameters also)
        //By using .then and .catch I can abstract the processing of the response from the caller because it only 
        //receives one parameter... the "response" object which contains "data, status, headers, config" as its properties.
        function getAllBooks() {

            //even if this call returns a "promise" as expected by the controlller, the parameter passed to the
            //callbacks on the promise will be the $http reponse object (great!). I would rather keep those
            //implementations details out of my controller, so I am going to process the response object here in my service and 
            //return a new promise to the client that either CONTAINS the data it wants or a reason why it wan't available.
            //To do that, I'll CHAIN to the Http call to the .then and .catch methods passing them the functions they
            //should execute. (WONDERFUL)
            return $http({
                    method: 'GET',
                    url: 'api/books',
                   //object literal
                    headers: {
                        'PS-BookLogger-Version': constants.APP_VERSION //custom header. APP_Version is stored in the constants service
                    },
                    transformResponse: transformGetBooks
                })
                .then(sendResponseData) //will be automatically passed a "response" as a parameter
                .catch(sendGetBooksError);
        }


        //will be automatically passed a "response" as a parameter. we simply return the data to the client

        //Note: handling the response this way allows us to keep all of the HTTP details in our dataService so the calling
        //angular controller can remain unaware of how the data was retrieved.
        function sendResponseData(response) {
            //the response has a property named "data" containing the json returned from the server 
            //we'll simply return that to the controller.
            return response.data;
        }
       
        //will handle the rejected http promise it is also passed a http "response" object
        //inside it, we'll just use the $q service to return.

        //Note: handling the response this way allows us to keep all of the HTTP details in our dataService so the calling
        //angular controller can remain unaware of how the data was retrieved.
        function sendGetBooksError(response) {
            //in case of error, we simply use $q service to return "rejected promise" with an error message.
            //i am taking advantage of the response object by including in the error message the HTTP status codethat came
            //back from the server.
            return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
        }

        function transformGetBooks(data, headersGetter) {

            var transformed = angular.fromJson(data);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            //console.log(transformed);
            return transformed;

        }

        //the traditional version of GET
        //function getBookByID(bookID) {
        //    return $http({
        //        method: 'GET',
        //        url: 'api/books/' + bookID
        //        })
        //    .then(sendResponseData)  //re-using the same callback as getAllBooks.. cool
        //    .catch(sendGetBooksError);
        //}

        //shortcut version of GET
        function getBookByID(bookID) {
            return $http.get('api/books/' + bookID)
            .then(sendResponseData)  
            .catch(sendGetBooksError);
        }


        //called from editBookController
        function updateBook(book) {

            return $http({
                method: 'PUT',  //need to use PUT because this is standard in web api
                url: 'api/books/' + book.book_id,
                data: book
            })
            .then(updateBookSuccess)
            .catch(updateBookError);

        }


        function updateBookSuccess(response) {
            return 'Book updated: ' + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book.(HTTP status: ' + response.status + ')');
        }


        //the traditional version of ADD
        //function addBook(newBook) {
        //    return $http({
        //        method: 'POST',
        //        url: 'api/books/',
        //        data: newBook
        //        })
        //    .then(addBookSuccess)   
        //    .catch(addBookError);
        //}


        //the shortcut version of addBook
        function addBook(newBook) {
            return $http.post('api/books', newBook, {
                transformRequest: transformPostRequest
            })
            .then(addBookSuccess)
            .catch(addBookError);
        }

        function transformPostRequest(data, headersGetter) {
            data.newBook = true;
            console.log(data);
            return JSON.stringify(data);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject('Error adding book. (HTTP status: ' + response.status + ')');
        }

        function deleteBook(bookID) {
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess(response) {
            return 'Book deleted.';
        }

        function deleteBookError(response) {
            return $q.reject('Error deleting book. (HTTP status: ' + response.status + ')');
        }

        function getAllReaders() {

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function() {

                deferred.resolve(readersArray);

            }, 1500);

            return deferred.promise;
        }
    }

}());