var ViewModel = function () {

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
            name: ""
        });
    };

    self.removeCategory = function (category) {
        self.gifts.remove(category);
    };

    self.save = function (form) {
        //alert("Could now transmit to server: " + ko.utils.stringifyJson(self.categories));
        ko.utils.postJson($("form")[0], self.categories);
    };

    // Fetch the initial data.
    getCategories();
};

ko.applyBindings(new ViewModel());

// Activate jQuery Validation
//$("form").validate({ submitHandler: ViewModel.save });