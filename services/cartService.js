(function () {

    // create module
    var module = angular.module("cartService", []);

    module.service("CartSvc", cartFunction);

    function cartFunction($http)
    {
        var self = this;
        var url = "http://localhost:7080/MagApi/webapi/cosuri";

        self.saveCart = function(cart)
        {
            console.log(cart);

            var body = cart;
            var rez = $http.post(url, body).then(function (response) {
                 console.log(response);
                 return response;
             });

             return rez;
        };

    }


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
