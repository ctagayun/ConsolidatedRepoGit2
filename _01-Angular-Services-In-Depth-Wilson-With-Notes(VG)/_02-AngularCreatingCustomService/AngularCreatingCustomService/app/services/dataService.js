(function() {
    //creating a service using factory function
    angular.module('app')
        .factory('dataService', dataService); //the first parameter is the bane of the service. the second is the name of the function to call

    //next step is to write the service. when done inject this serrvice in the controller that
    //is going to use it. in this case book controller
    function dataService(logger) {

        //exposing the methods of the service (the api of the service) there are two methods in this example
        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {

            logger.output('getting all books');

            return [
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
                }
            ];
        }

        function getAllReaders() {

            logger.output('getting all readers');

            return [
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
        }
    }

    //injecting the loggerService so that we can use it above.
    dataService.$inject = ['logger'];

}());