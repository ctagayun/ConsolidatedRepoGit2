(function() {

    //the $q service is a promise library. it provides API for working with
    //promises and it also provides an API for the so-called  deferred objects 
    //that return promises to the client and signal them with results when
    //the async operation is complete.

    //Step 1: when the service(example dataService) receives a request, it will use $q service to create
    //a deferred object. The deferred object will serve as a conduit through which the service communicate
    //the status of the async work back to the client. 

    //Step 2: The deferred object will immediately return a promise back to the client.

    //Step 3: Once the promise is received by the client, the client can use the promise API to configure
    //callback function to execute when the work of the service is complete.

    angular.module('app')
        .factory('dataService', ['$q', '$timeout', dataService]);


    //this is a custom service that returns a promise
    function dataService($q, $timeout) {

        //expose the methods to the outside world
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {

            var booksArray = [
                {
                    book_id: 1,
                    title: 'Harry Potter and the Deathly Hallows',
                    author: 'J.K. Rowling',
                    yearPublished: 2000
                },
                {
                    book_id: 2,
                    title: 'The Cat in the Hat',
                    author: 'Dr. Seuss',
                    yearPublished: 1957
                },
                {
                    book_id: 3,
                    title: 'Encyclopedia Brown, Boy Detective',
                    author: 'Donald J. Sobol',
                    yearPublished: 1963
                },
                {
                    book_id: 4,
                    title: 'Practical Shooting, Art to Master',
                    author: 'Chito Tagayun',
                    yearPublished: 2016
                }
            ];

            //create a new deferred object
            var deferred = $q.defer();

            //use the $timeout service to setup a block of code that will execute
            //at a specified interval of time in the future.
            //The $timeout service accepts two parameters: first is the function
            //it will execute and the second is the number of milliseconds to wait before
            //
            $timeout(function() {

                var successful = true;
                if (successful) {

                    //return notification while work is being performed by calling the notify function
                    deferred.notify('Just getting started gathering books...');
                    deferred.notify('Almost done gathering books...');

                    //return the records wnen the work is successfully completed
                    deferred.resolve(booksArray);
                } else {
                    deferred.reject('Error retrieving books.');
                }

            }, 1000); //the 1000 ms is th second parameter. In this case it simulates a delay of 1 sec before executing the function.

            //now a return a promise. the deferred object we created above has a property
            //calleld "promise"
            return deferred.promise;

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
                },
                 {
                     reader_id: 4,
                     name: 'Claudia',
                     weeklyReadingGoal: 150,
                     totalMinutesRead: 700
                 }
            ];

            var deferred = $q.defer();

            $timeout(function() {

                deferred.resolve(readersArray);

            }, 1500);

            return deferred.promise;
        }
    }

}()); //IFFE