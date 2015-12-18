var ViewModel2 = function () {

    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();
    self.categories = ko.observableArray();
    self.newProduct = {
        Category: ko.observable(),
        Name: ko.observable()
    }

    var productsUri = '/api/products/';
    var categoriesUri = '/api/categories/';

    function ajaxHelper(uri, method, data) {
        self.error(''); 
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllProducts() {
        ajaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
        });
    }


    function getCategories() {
        ajaxHelper(categoriesUri, 'GET').done(function (data) {
            self.categories(data);
        });
    }


    self.addProduct = function (formElement) {
        var product = {
            CategoryId: self.newProduct.Category().Id,
            Name: self.newProduct.Name()
        };

        ajaxHelper(productsUri, 'POST', product).done(function (item) {
            self.products.push(item);
        });
    }

    // Fetch the initial data.
    getAllProducts();
    getCategories();
};

ko.applyBindings(new ViewModel2());