 (function () {

     var module = angular.module("contactApp", ['productService', 'productTypeService']);



     module.controller("Controller", mainFuntion);

     function mainFuntion(ProductDataSvc, ProductTypeDataSvc) {

         var self = this;
         self.editMode = false;

         ProductDataSvc.getProducts().then(function (data) {
             self.products = data;

         });


         ProductTypeDataSvc.getAllProductTypes().then(function (data) {
             console.log(data);
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

             ProductDataSvc.saveProduct(productTemp).then(function () {
                     self.succesMsg = "Data update succesfull";
                 },
                 function () {
                     self.erorMsg = "There was an eror please try again";
                 });

         }
     }

 })();
