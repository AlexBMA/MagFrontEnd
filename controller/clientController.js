 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService','cartService']);



     module.controller("ControllerClient", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc,CartSvc) {

         var self = this;
         self.editMode = false;
         self.addMode = false;

         var cart;
         var productInCartComplete;

                cart ={
                      "totalPriceOfCart":0,
                      "listProductInCartFromClient":[]
                 };
              productInCartComplete = [];

        /*
         if(localStorage.getItem("cart")==null)
         {
             console.log("here ");
                cart ={
                      "totalPriceOfCart":0,
                      "listProductInCartFromClient":[]
                 };
              productInCartComplete = [];

        }else{
            cart = JSON.parse(localStorage.getItem("cart"));
            productInCartComplete = cart.listProductInCartFromClient;
        }
         */


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

             var qunatityInCaseTheSame = 0;


             for( var i in cart.listProductInCartFromClient)
                 {
                     if(cart.listProductInCartFromClient[i].idLocal == this.selectedElement.idLocal)
                         {
                             cart.totalPriceOfCart = cart.totalPriceOfCart - (cart.listProductInCartFromClient[i].quantity * this.selectedElement.price);

                             cart.listProductInCartFromClient[i].quantity =
                                  cart.listProductInCartFromClient[i].quantity+this.quantity;

                             qunatityInCaseTheSame = cart.listProductInCartFromClient[i].quantity;

                             break;
                         }
                 }
             var cost =0;
             if(qunatityInCaseTheSame>0){
                cost = qunatityInCaseTheSame * this.selectedElement.price;
             }
             else {
                 cost = this.quantity * this.selectedElement.price;
                  var productFromCartClient ={
                    "quantity":this.quantity,
                    "idLocal":this.selectedElement.idLocal
                  };
             productInCartComplete.push(this.selectedElement);
             cart.listProductInCartFromClient.push(productFromCartClient);
             }

             cart.totalPriceOfCart = cart.totalPriceOfCart + cost;


             self.succesMsg = "Product added in cart";
             console.log(cart);
             console.log(productInCartComplete);

         };

         this.checkOut = function()
         {
             var jsonCart = JSON.stringify(cart)
             localStorage.setItem("cart",jsonCart);
             var jsonDetails = JSON.stringify(productInCartComplete);
             localStorage.setItem("productDetailsInCart",jsonDetails);

             /*
                console.log(jsonCart);
                console.log(jsonDetails);
             */

             window.open("cos.html","_self");

             /*  CartSvc.saveCart(cart);
                 self.succesMsg = "Cart has been register cart";
                 console.log("##");
             */
         };
     }

 })();
