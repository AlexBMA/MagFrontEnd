(function () {

    // create module
    var module = angular.module("productTypeService", []);

    module.service("ProductTypeDataSvc", getProductTypeData);


    function getProductTypeData($http) {

        var self = this;
        var url = "http://localhost:7080/MagApi/webapi/categorii";



        self.getAllProductTypes = function () {
            var promise1 = $http.get(url);
            var promise2 = promise1
                .then(function (response) {


                    return response.data;
                });
            return promise2;
        };
    }


})();
