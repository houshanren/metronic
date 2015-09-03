'use strict';

var singApp = angular.module('singApp', [
    // common essential modules
    'ngAnimate',
    'ngStorage',
    'ngResource',
    'ui.router',
    'ui.router.util',
    'ui.jq',
    'ui.event',
    'ui.bootstrap',

    // page-specific and demo. may be removed
    'angular-bootstrap-select',
    'datatables',
    'datatables.bootstrap',
    'ui.calendar',

    // application libs
    'app.controllers',
    'app.services',
    'app.directives'
]);

singApp.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /dashboard
    $urlRouterProvider.otherwise("/app/dashboard/");

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'views/app.html'
        })

        // loading page templates dynamically for demo
        .state('app.page', {
            url: '/:page/:child',
            params: {
                page: {},
                child: { value: null }
            },
            resolve: {
                deps: ['scriptLoader', function(scriptLoader){
                    return scriptLoader;
                }]
            },
            templateProvider: function ($http, $stateParams, scriptLoader) {
                return $http.get('views/' + $stateParams.page + ( /*optional param*/ $stateParams.child ? "_" + $stateParams.child : "") + '.html')
                    .then(function(response) {
                        return scriptLoader.loadScriptTagsFromData(response.data);
                    })
                    .then(function(responseData){
                        return responseData;
                    });
            }
        })

        //separate state for login & error pages
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        })
        .state('error', {
            url: '/error',
            templateUrl: 'views/error.html'
        })
});

singApp.value('uiJqDependencies', {
    'mapael': [
        'vendor/raphael/raphael-min.js',
        'vendor/jQuery-Mapael/js/jquery.mapael.js'
    ],
    'easyPieChart': [
        'vendor/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js'
    ],
    'autosize': [
        'vendor/jquery-autosize/jquery.autosize.min.js'
    ],
    'wysihtml5': [
        'vendor/bootstrap3-wysihtml5/lib/js/wysihtml5-0.3.0.min.js',
        'vendor/bootstrap3-wysihtml5/src/bootstrap3-wysihtml5.js'
    ],
    'select2': [
        'vendor/select2/select2.min.js'
    ],
    'markdown': [
        'vendor/markdown/lib/markdown.js',
        'vendor/bootstrap-markdown/js/bootstrap-markdown.js'
    ],
    'datetimepicker': [
        'vendor/moment/min/moment.min.js',
        'vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
    ],
    'colorpicker': [
        'vendor/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js'
    ],
    'inputmask': [
        'vendor/jasny-bootstrap/js/inputmask.js'
    ],
    'fileinput': [
        'vendor/holderjs/holder.js',
        'vendor/jasny-bootstrap/js/fileinput.js'
    ],
    'slider': [
        'vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js'
    ],
    'parsley': [
        'vendor/parsleyjs/dist/parsley.min.js'
    ],
    'sortable': [
        'vendor/jquery-ui/ui/core.js',
        'vendor/jquery-ui/ui/widget.js',
        'vendor/jquery-ui/ui/mouse.js',
        'vendor/jquery-ui/ui/sortable.js',
        'vendor/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'
    ],
    'draggable': [
        'vendor/jquery-ui/ui/core.js',
        'vendor/jquery-ui/ui/widget.js',
        'vendor/jquery-ui/ui/mouse.js',
        'vendor/jquery-ui/ui/draggable.js'
    ],
    'nestable': [
        'vendor/jquery.nestable/jquery.nestable.js'
    ],
    'vectorMap': [
        'vendor/jvectormap/jquery-jvectormap-1.2.2.min.js',
        'vendor/jvectormap-world/index.js'
    ],
    'sparkline': [
        'vendor/jquery.sparkline/index.js'
    ],
    'magnificPopup': [
        'vendor/magnific-popup/dist/jquery.magnific-popup.min.js'
    ]
});