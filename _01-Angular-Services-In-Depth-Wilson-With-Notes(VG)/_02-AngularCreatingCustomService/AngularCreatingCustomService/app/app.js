(function() {

    var app = angular.module('app', []);

    //in the provider function we need to annotate the injection of the constantService.
    //here we also annotating contants. the function is an inline function
    //within the array. The closing bracket should be after the ending bracket of the inline function
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

    }]); //closing bracket is after the ending curly brace of the inline function.

    app.config(['booksProvider', 'constants', 'dataServiceProvider', function (booksProvider, constants, dataServiceProvider) {

        booksProvider.setIncludeVersionInTitle(true);

        console.log('title from constants service: ' + constants.APP_TITLE);

        console.log(dataServiceProvider.$get);

    }]);

}());