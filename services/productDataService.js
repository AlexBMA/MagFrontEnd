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

         self.addNewProduct = function (product) {
             var url = "http://localhost:7080/MagApi/webapi/produse";

             console.log("Here:" + product);

             var body = {
                 'name': product.name,
                 'productTypeName': product.nameProductType,
                 'price': product.price,
                 'numberOfItems': product.numberOfItems,
                 'linkImg': product.linkImg
             }

             console.log(body);
             var rez = $http.post(url, body).then(function (response) {
                 console.log(response);
                 return response;
             });

             return rez;
         };

         self.deleteProduct = function (product) {
             var url = "http://localhost:7080/MagApi/webapi/produse/" + product.idLocal;


             var rez = $http.delete(url).then(function (response) {
                 console.log(response);
                 return response;

             });

             return rez;
         };


         self.saveProduct = function (product) {

             var url = "http://localhost:7080/MagApi/webapi/produse/" + product.idLocal;

             console.log("p in put method:" + product.nameProductType);

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
