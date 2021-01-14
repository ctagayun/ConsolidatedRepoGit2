(function() {

    
    var app = angular.module('app', ['ngRoute']);

    //$logprovider - provide the ability to log debug statements
    //$routeProvider -
    //$locationProvider - configures the route and tha hashbang
    app.config(['$logProvider', '$routeProvider', '$locationProvider', function ($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        //$locationProvider.hashPrefix('!'); //makes it a hashbang mode

        //$locationProvider.html5Mode(true); //makes routing use html5 mode (no hashbang)


        //first param is the url of the route
        //second param is object literal that specifies properties of the route
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: '/app/templates/home.html'
            })
            .when('/schools', {
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html'
            })
            .when('/classrooms', {
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html'
            })
            .when('/activities', {
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                resolve: { //resolve property allows you to specify a LIST of dependencies
                    //it is  key-value pair. the resolve properties for exampme "activities"
                    //will be injected to the controller once done executing
                    //in this example we are retieving activities data so we won't 
                    //go to the activities.html until it is resolved. then that data stored 
                    //in a parameter "activities" will be injected to the controller
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                }
            })
            .when('/classrooms/:id', {
                templateUrl: '/app/templates/classroom.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
            .when('/classrooms/:id/detail/:month?', {  //making the month paramater optional by adding "?" question mark
                templateUrl: '/app/templates/classroomDetail.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
            .otherwise('/');


    }]);

    //app.run is the place to do initialization code needed by your module
    //In this example I am going to define event handlers for the route events on the rootscope
    //so i need to inject $rootScope into the run function. I also going to inject $log so that 
    //we can log debug information
    app.run(['$rootScope', '$log', function($rootScope, $log) {

        //handler for the $routeChangeSuccess event. it is fired whenever we successfully move from route to another
        //the event will automatically pass event that was fired, current route, prrevious route
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            $log.debug('successfully changed routes');

            $log.debug(event);  //event that was fired  
            $log.debug(current); //current route
            $log.debug(previous); //previous route

        });

        //handler for the $routeChangeError event
        //the event will automatically pass event that was fired, current route, prrevious route and rejection 
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

            $log.debug('error changing routes');

            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);
            $log.debug(rejection);

        });

    }]);

}());