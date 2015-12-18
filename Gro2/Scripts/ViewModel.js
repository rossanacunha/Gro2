var productsUri = '/api/products/';
var categoriesUri = '/api/categories/';

//The model definition for jQuery and knockout dependencies
define("jquery", function () {
    return $;
});

define("knockout", function () {
    return ko;
});

//The viewModel definition
define("viewModel", ['jquery', "knockout"], function ($, ko) {

    var viewModel = function () {
        var self = this;
        //Boolean flag to check wheather the current operation is for 
        //Edit and add  New Record
        var isNewRecord = false;
        self.Message = ko.observable();

        //Observable Array
        self.categories = ko.observableArray([]);

        loadData();

        //Function to Load Data using WEB API
        function loadData() {
            $.ajax({
                url: categoriesUri,
                type: "GET"
            }).done(function (resp) {
                self.categories(resp);
            }).fail(function (err) {
                self.Message("Error " + err.status);
            });
        };

        //The Product Object used for Add, Edit, Delete operations
        function Category(pId, pName) {
            return {
                Id: ko.observable(pId),
                Name: ko.observable(pName)
            }
        };

        //Observables for Templates
        self.readonlyTemplate = ko.observable("readonlyTemplate"),
        self.editTemplate = ko.observable()

        //Function to set the Template      
        self.setCurrentTemplate = function (tmpl) {
            return tmpl === this.editTemplate() ? 'editTemplate' : this.readonlyTemplate();
        }.bind(self);

        //Function to cancel edit effect
        self.reset = function (t) {
            self.editTemplate("readonlyTemplate");
        };

        //Function to add a new Empty row in table
        self.addRecord = function () {
            self.categories.push(new Category(0, ""));
            isNewRecord = true; //Set the Check for the New Record
        };

        //Function to save record
        self.save = function (e) {
            var Categ = {};
            Categ.Id = e.Id;
            Categ.Name = e.Name;

            if (isNewRecord === false) {

                $.ajax({
                    type: "PUT",
                    url: categoriesUri + e.Id,
                    data: Emp
                })
                    .done(function (resp) {
                        self.Message("Record updated successfully!");
                        self.reset();
                    })
                    .fail(function (err) {
                        self.Message("There was an error! Please reload the page and try again." + err.status);
                        self.reset();
                    });
            }

            if (isNewRecord === true) {
                isNewRecord = false;
                $.ajax({
                    type: "POST",
                    url: categoriesUri,
                    data: Emp
                })
                    .done(function (resp) {
                        self.Message("Record added successfully!");
                        self.reset();
                        loadData();
                    }).fail(function (err) {
                        self.Message("There was an error! Please reload the page and try again." + err.status);
                        self.reset();
                    });
            }
        };

        //Function to Delete the Record
        self.delete = function (d) {

            $.ajax({
                type: "DELETE",
                url: categoriesUri + d.EmpNo
            })
                .done(function (resp) {
                    self.Message("Record deleted successfully!" + resp.status);
                    self.reset();
                    loadData();
                })
                .fail(function (err) {
                    self.Message("There was an error! Please reload the page and try again." + err.status);
                    self.reset();
                });
        };


    };

    return new viewModel();
});