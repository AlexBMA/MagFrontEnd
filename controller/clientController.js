 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService','cartService']);



     module.controller("ControllerClient", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc,CartSvc) {

         var self = this;
         self.editMode = false;
         self.addMode = false;

         var cart ={
             "totalPriceOfCart":0,
             "listProductInCartFromClient":[]
         };


         ProductDataSvc.getProducts().then(function (data) {
             self.products = data;

         });


         ProductTypeDataSvc.getAllProductTypes().then(function (data) {

             var allProductTypes = [];
             for (var i in data) {
                 allProductTypes.push(data[i].nameProductType);
             }
             console.log(allProductTypes);
             self.allProductTypes = allProductTypes;

         });


         this.selectProduct = function (index) {
             this.selectedElement = this.products[index];
             this.succesMsg = undefined;
             this.erorMsg = undefined;

         };








         this.addInCart = function()
         {
             console.log(this.quantity);
             console.log(this.selectedElement.price);

             var cost = this.quantity * this.selectedElement.price;

             var productFromCartClient ={
                 "quantity":this.quantity,
                 "idLocal":this.selectedElement.idLocal
             };

             cart.listProductInCartFromClient.push(productFromCartClient);


             cart.totalPriceOfCart = cart.totalPriceOfCart + cost;


             self.succesMsg = "Product added in cart";

             console.log(cart);

         };

         this.checkOut = function()
         {
             CartSvc.saveCart(cart);
             self.succesMsg = "Cart has been register cart";
             console.log("##");

         };
     }

 })();
