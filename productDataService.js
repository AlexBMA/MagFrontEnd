 (function () {

     // create module
     var module = angular.module("productService", []);

     module.service("ProductDataSvc", getProductData);

     function getProductData($http) {

         var self = this;
         var url = "http://localhost:7080/MagApi/webapi/produse";

         self.getProducts = function () {
             var promise1 = $http.get(url)
             var promise2 = promise1
                 .then(function (response) {


                     return response.data;
                 });
             return promise2;

         };

         self.saveProduct = function (product) {

             var url = "http://localhost:7080/MagApi/webapi/produse/" + product.idLocal;

             var body = {
                 'name': product.name,
                 'productTypeName': product.nameProductType,
                 'price': product.price,
                 'numberOfItems': product.numberOfItems,
                 'linkImg': product.linkImg

             };

             var rez = $http.put(url, body).then(function (response) {
                 console.log(response);
                 return response;

             });

             return rez;
         };

     }

 })();
