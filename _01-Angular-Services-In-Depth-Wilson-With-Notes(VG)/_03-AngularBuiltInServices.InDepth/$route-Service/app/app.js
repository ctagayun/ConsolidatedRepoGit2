(function() {

    //to use routing and cookies, inject ng-route and ng-cookies to your module
    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.provider('books', ['constants', function (constants) {

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

    }]);

    //injecting $routeProvider
    app.config(['booksProvider', '$routeProvider', '$logProvider', function (booksProvider, $routeProvider, $logProvider) {

        booksProvider.setIncludeVersionInTitle(true);

        //The default is true. when setting it to false will prevent "debug" messages from appearing 
        //indexedDB the console. Only the messages created by the $log will appear in the console
        $logProvider.debugEnabled(false);

        $routeProvider
            .when('/', {
                templateUrl: '/app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/AddBook', {
                templateUrl: '/app/templates/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'addBook'
            })
            //:bookID is a parameter to the route. 
            .when('/EditBook/:bookID', {
                templateUrl: '/app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor',

                //resolve property of the route configuration object.
                //it lets you specify a list of dependencies that
                //will be injected into the controller when changing to the route.
                //In this example I created one named "books" it is set to a function
                //that will return a promise, so the router will wait for the promise to resolve. In this
                //case, the async call is retrieving data that will be displayed in the view, so by defining
                //the resolve here, we can wait for data to be available before displaying the new view.
                //
                //In order to access the data returned from the promise, we just need to inject "books" property
                //to the EditBookController
                resolve: {
                    books: function (dataService) {
                        //throw 'error getting books';
                        return dataService.getAllBooks();
                    }
                }
            })
            .otherwise('/');

    }]);

    //Angukar modules have a function named "run", which you can use to add initialization
    //code to your module. I am going to use "run" to register event handlers for a couple
    //of the events on the route service. I am going to listen for the events on the rootScope,
    //so I need to inject it to the run function
    app.run(['$rootScope', function($rootScope) {

        //the first event we are going to listen to is $routeChangeSuccess event. The function
        //that handles the event takes three parameters:event, current route, previous route
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            console.log('successfully changed routes');

        });


        //the second event we are going to listen to is $routeChangeError. The function that
        //handles the event takes four parameters: event, current route, previous route, rejection
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
            console.log('error changing routes');
            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });

    }]);

}());