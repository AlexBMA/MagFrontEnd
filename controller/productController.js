 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService']);



     module.controller("Controller", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc) {

         var self = this;
         self.editMode = false;
         self.addMode = false;


         ProductDataSvc.getProducts().then(function (data) {
             self.products = data;

         });


         ProductTypeDataSvc.getAllProductTypes().then(function (data) {
             self.allProductTypes = data;
         });


         this.selectProduct = function (index) {
             this.selectedElement = this.products[index];
             this.succesMsg = undefined;
             this.erorMsg = undefined;

         };


         this.toggleEditMode = function () {
             if (this.editMode == false) this.editMode = true;
             else this.editMode = false;
         }

         this.saveEdit = function () {

             this.toggleEditMode();
             var productTemp = this.selectedElement;
             var self = this;

             if (this.addMode == false) {
                 console.log("in put")
                 ProductDataSvc.saveProduct(productTemp).then(function () {
                         self.succesMsg = "Data update succesfull";
                     },
                     function () {
                         self.erorMsg = "There was an eror please try again";
                     });
             }
             if (this.addMode == true) {


                 ProductDataSvc.addNewProduct(productTemp).then(function (data) {
                     console.log(data);
                     self.succesMsg = "New Product added succesfull";
                     self.products.push(data.data);

                 }, function () {
                     self.erorMsg = "There was an eror please try again";
                 });
             }
         }

         this.addProduct = function () {
             this.selectedElement = {};
             this.editMode = true;
             this.addMode = true;


         };


         this.deleteProduct = function () {
             var productTemp = this.selectedElement;
             console.log(productTemp);
             ProductDataSvc.deleteProduct(productTemp).then(function (data) {

                 self.products = data.data;
                 self.succesMsg = "Product deleted succesfull";
             }, function () {
                 self.erorMsg = "There was an eror please try again";
             });

         };
     }

 })();
