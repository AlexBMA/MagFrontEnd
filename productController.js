 (function () {

     var module = angular.module("contactApp");



     module.controller("Controller", mainFuntion);

     function mainFuntion(productDataSvc) {

         var self = this;
         self.editMode = false;

         productDataSvc.getProducts().then(function (data) {
             self.products = data;

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

             productDataSvc.saveProduct(productTemp).then(function () {
                     self.succesMsg = "Data update succesfull";
                 },
                 function () {
                     self.erorMsg = "There was an eror please try again";
                 });

         }
     }

 })();
