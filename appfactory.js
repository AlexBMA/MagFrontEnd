/*
not used in hte main app
*/

(function () {

    // create module
    var module = angular.module("contactApp", []);

    //factory service ex
    module.factory("AppDataFactorySvc", function () {
        return "Hello from factory service";
    });
})();
