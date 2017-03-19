 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService','cartService']);

     module.controller("ControllerCos", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc,CartSvc) {

         var self = this;
         self.editMode = false;



         var cart = [];
         cart = JSON.parse(localStorage.getItem("cart"));
         console.log(cart);


         this.totalPriceOfCart = cart.totalPriceOfCart;

         var productInCartComplete = [];
            productInCartComplete = JSON.parse(localStorage.getItem("productDetailsInCart"));

         console.log(productInCartComplete);



         function  createData()
         {
             var rez = [];
             var item ={};
             for(var i in productInCartComplete)
                 {
                     item= {
                         "name":productInCartComplete[i].name,
                         "price":productInCartComplete[i].price,
                         "nameProductType":productInCartComplete[i].nameProductType,
                         "numberOfItems":productInCartComplete[i].numberOfItems,
                         "linkImg":productInCartComplete[i].linkImg,
                         "idLocal":productInCartComplete[i].idLocal,
                         "quantityInCart":cart.listProductInCartFromClient[i].quantity
                     };

                     rez.push(item);
                 }

             return rez;
         }


         this.products = createData();
         console.log(this.products);

         this.selectProduct = function (index) {
             this.selectedElement = this.products[index];
             this.succesMsg = undefined;
             this.erorMsg = undefined;

         };

         this.toggleEditMode = function () {
             if (this.editMode == false) this.editMode = true;
             else this.editMode = false;
         }

        this.saveEdit = function ()
        {
            this.toggleEditMode();

            for(var i in cart.listProductInCartFromClient)
                {
                    if(cart.listProductInCartFromClient[i].idLocal ==       this.selectedElement.idLocal)
                        {
                            cart.totalPriceOfCart = cart.totalPriceOfCart - (this.selectedElement.price* cart.listProductInCartFromClient[i].quantity);

                            cart.listProductInCartFromClient[i].quantity = this.selectedElement.quantityInCart;

                            cart.totalPriceOfCart = cart.totalPriceOfCart + this.selectedElement.quantityInCart*this.selectedElement.price;

                        }
                }

            console.log(cart);

           this.totalPriceOfCart = cart.totalPriceOfCart;
        }

        this.deleteFromCart = function()
        {
            var poz;
            for(var i in cart.listProductInCartFromClient)
                {
                    if(cart.listProductInCartFromClient[i].idLocal ==       this.selectedElement.idLocal)
                        {
                            cart.totalPriceOfCart = cart.totalPriceOfCart - (this.selectedElement.price* cart.listProductInCartFromClient[i].quantity);
                            poz =i;
                        }
                }

            self.products.splice(poz,1);
            cart.listProductInCartFromClient.splice(poz,1);

            console.log(cart);

           this.totalPriceOfCart = cart.totalPriceOfCart;
        }


         this.checkOut = function()
         {
             CartSvc.saveCart(cart);
             self.succesMsg = "Cart has been register cart";
             console.log("##");

         };


         this.goToClientPage = function()
         {
             var jsonCart = JSON.stringify(cart)
             localStorage.setItem("cart",jsonCart);


             window.open("client.html","_self");


         };
     }

 })();
