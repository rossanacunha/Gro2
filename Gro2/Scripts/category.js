var ViewModel3 = function () {

    var self = this;
    self.error = ko.observable();
    self.categories = ko.observableArray();
    self.newCategory = {
        Name: ko.observable()
    }

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

    function getCategories() {
        ajaxHelper(categoriesUri, 'GET').done(function (data) {
            self.categories(data);
        });
    }

    self.addCategory = function () {
        self.categories.push({
            id:0,
            name: ""
        });
    };

    self.removeCategory = function (category) {
        self.gifts.remove(category);
    };

    self.save = function (form) {
        alert("Could now transmit to server: " + ko.utils.stringifyJson(self.categories));
        // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
    };

    //self.addCategory = function (formElement) {
    //    var category = {
    //        Name: self.newCategory.Name()
    //    };

    //    ajaxHelper(categoriesUri, 'POST', category).done(function (item) {
    //        self.categories.push(item);
    //    });
    //}

    //self.addCategory = function () {
    //    self.categories.push({
    //        name: "",
    //        price: ""
    //    });
    //};

    //self.removeCategory = function (category) {
    //    self.categories.remove(category);
    //};

    //self.save = function (form) {
    //    //alert("Could now transmit to server: " + ko.utils.stringifyJson(self.categories));
    //    ko.utils.postJson($("form")[0], self.categories);
    //};

    //self.save = function (formElement) {
    //    var categories = {
    //        Name: self.newProduct.Name()
    //    };

    //    ajaxHelper(categoriesUri, 'POST', categories).done(function (item) {
    //        self.categories.push(item);
    //    });
    //}

    // Fetch the initial data.
    getCategories();
};

ko.applyBindings(new ViewModel3());

// Activate jQuery Validation
//$("form").validate({ submitHandler: ViewModel3.save });