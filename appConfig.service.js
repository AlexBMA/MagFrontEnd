(function () {

    // create module
    var module = angular.module("contactApp", []);

    //create service function
    function AppConfig(AppName) {

        this.name = AppName;
        this.author = "Alex";
        this.buildDate = new Date().toDateString();

    }

    //create service
    module.service("AppDataService", AppConfig);
})();
