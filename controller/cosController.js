 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService','cartService']);

     module.controller("ControllerCos", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc,CartSvc) {

         var self = this;
         self.editMode = false;


         var cart = [];
         cart = JSON.parse(localStorage.getItem("cart"));
         console.log(cart);

         var productInCartComplete = [];
            productInCartComplete = JSON.parse(localStorage.getItem("productDetailsInCart"));

         console.log(productInCartComplete);


         this.products =productInCartComplete;

         this.selectProduct = function (index) {
             this.selectedElement = this.products[index];
             this.succesMsg = undefined;
             this.erorMsg = undefined;

         };

         this.toggleEditMode = function () {
             if (this.editMode == false) this.editMode = true;
             else this.editMode = false;
         }


        /* ProductDataSvc.getProducts().then(function (data) {
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
         */




         this.checkOut = function()
         {
             CartSvc.saveCart(cart);
             self.succesMsg = "Cart has been register cart";
             console.log("##");

         };
     }

 })();
