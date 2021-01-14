(function() {

    angular.module('app')
        .factory('dataService', ['$q', '$timeout', '$http', 'constants', '$cacheFactory', dataService]);

    //inject $q service to handle deferred objects
    function dataService($q, $timeout, $http, constants, $cacheFactory) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getUserSummary: getUserSummary
        };

        function getUserSummary() {

            //the deferred object will serve as the conduit through which the service can
            //communicate the status of the asycnchronous work back to the client. The deferred object
            //will immediately return a promise back to the client. this will prevent the call to the service from blocking
            //execution while the service is doing its work.
            //Once the promise is received by the client, the client can use the promise API to
            //configure callback functions to execute when the work of the service is complete.
            var deferred = $q.defer();

            //attempt to retrieve a cache
            var dataCache = $cacheFactory.get('bookLoggerCache');

            if (!dataCache) {
                //if no cache create a cache
                dataCache = $cacheFactory('bookLoggerCache');
            }


            //now check for the summary data we are looking for.
            var summaryFromCache = dataCache.get('summary');

            if (summaryFromCache) {

                //if the summary data we are looking for does exist, return it to the controller
                //using resolve funcion of the deferred object
                console.log('returning summary from cache');
                deferred.resolve(summaryFromCache);

            } else {

                //summary data is not in the cache so go get it and store it in the cache. name the cache "summary"
                console.log('gathering new summary data');

                //promises returned by getAllBooks and getAllReaders
                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                //pass the promises in an array to the "all" function of the $q service
                //the "all" function allow you to wait on multiple promises and it will
                //return a new promise
                $q.all([booksPromise, readersPromise])
                    //when all the promises in the array have been resolved, the then function 
                    //function will be called. The  "then" executes an anonymous function with parameter "bookLoggerData"
                    //bookLoggerData is a variable that's an array of data returned from all the promises passed
                   // to the "$q.all" service
                    .then(function (bookLoggerData) {

                        //inside the anonymous function I retrieve the arrays of books and readers from the bookLoggerData parameter
                        var allBooks = bookLoggerData[0];
                        var allReaders = bookLoggerData[1];

                        //variable to store total minutes read for all readers 
                        var grandTotalMinutes = 0;

                        //to calculate total mintes, I iterate over the the allReaders
                        //array ad add each reader's  to grandTotalMinutes variable
                        allReaders.forEach(function (currentReader, index, array) {
                            grandTotalMinutes += currentReader.totalMinutesRead;
                        });


                        //now I create the summary object to be passed to the resolution of 
                        //of the promise this function returns.
                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalMinutes: grandTotalMinutes
                        };

                        //store the summaryData in the cache. name the key "summary"
                        dataCache.put('summary', summaryData);

                        //with the summary object created above, I pass it to the resolve function on the deferred object which
                        //will pass it as a parameter to the promise resolution handler in the calling controller.
                        deferred.resolve(summaryData);

                    });

            }

            //finally return the promise associated with the deferred object
            return deferred.promise;

        }

        function deleteSummaryFromCache() {

            var dataCache = $cacheFactory.get('bookLoggerCache');
            dataCache.remove('summary');

        }

        function getAllBooks() {

            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks,
                cache: true
            })
            .then(sendResponseData)
            .catch(sendGetBooksError)

        }

        function deleteAllBooksResponseFromCache() {

            var httpCache = $cacheFactory.get('$http');
            httpCache.remove('api/books');

        }


        function transformGetBooks(data, headersGetter) {

            var transformed = angular.fromJson(data);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            //console.log(transformed);
            return transformed;

        }

        function sendResponseData(response) {

            return response.data;

        }

        function sendGetBooksError(response) {

            return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');

        }

        function getBookByID(bookID) {

            return $http.get('api/books/' + bookID)
            .then(sendResponseData)
            .catch(sendGetBooksError);

        }

        function updateBook(book) {

            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

            return $http({
                method: 'PUT',
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

        function addBook(newBook) {

            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

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

            deleteSummaryFromCache();
            deleteAllBooksResponseFromCache();

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