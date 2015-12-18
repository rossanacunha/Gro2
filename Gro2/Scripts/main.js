//Define module loading for jQuey, knockout and view Model
require(['jquery', 'knockout', 'viewModel'], function ($, ko, viewModel) {
    $(document).ready(function () {

        //Instantiate page view model
        ko.applyBindings(viewModel);

    });
});