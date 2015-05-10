
// chnage template brackets to prevent jekyll interpolation
var matchyapp = angular.module("matchyapp", ['ngResource']).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});


matchyapp.factory('images', function($resource){

    return {
        fetchImages: function(callback){


            // url = "http://dry-eyrie-9951.herokuapp.com";  // test

            // todo: oops this resource won't return jsonp
            url = "http://pds-rings-tools.seti.org/opus/api/images/med.json?planet=Saturn&instrumentid=Cassini+ISS&timesec1=2007-07-13&timesec2=&camera=Wide+Angle&FILTER=BL2,BL1,BL2+POL,BL1+GRN&view=browse&browse=gallery&colls_browse=gallery&page=1&gallery_data_viewer=true&limit=100&order=timesec1&cols=ringobsid,planet,target,phase1,phase2,time1,time2&widgets=planet,target,instrumentid,timesec1,FILTER,camera&widgets2=&detail=?callback=angular.callbacks._0";

            var api = $resource(url + '?callback=JSON_CALLBACK',{},{
                fetch:{method:'JSONP'}
            });

            api.fetch(function(data){
                // Call the supplied callback function
                callback(data);
            });
        }
    }
});

function ImagesController($scope, images){

    // Default layout of the app. Clicking the buttons in the toolbar
    // changes this value.

    // $scope.image_set1 = [];
    $scope.image_set2 = [];
    $scope.image_set3 = [];

    // Use the instagram service and fetch a list of the popular pics
    images.fetchImages(function(data){
        console.log('hello');

        // this is so klugey why isn't this python 
        // make a list of just the published times sorted
        $scope.image_set1 = data['path'];
        console.log(data);

    });

}
