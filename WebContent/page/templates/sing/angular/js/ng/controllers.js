'use strict';

var appControllers = angular.module('app.controllers', []);

//settings and state
var app = {
    name: 'sing',
    title: 'Sing - Dashboard',
    version: '1.0.0',
    /**
     * Whether to print and alert some log information
     */
    debug: false,
    /**
     * In-app constants
     */
    settings: {
        colors: {
            'white': '#fff',
            'black': '#000',
            'gray-light': '#999',
            'gray-lighter': '#eee',
            'gray': '#666',
            'gray-dark': '#343434',
            'gray-darker': '#222',
            'gray-semi-light': '#777',
            'gray-semi-lighter': '#ddd',
            'brand-primary': '#5d8fc2',
            'brand-success': '#64bd63',
            'brand-warning': '#f0b518',
            'brand-danger': '#dd5826',
            'brand-info': '#5dc4bf'
        },
        screens: {
            'xs-max': 767,
            'sm-min': 768,
            'sm-max': 991,
            'md-min': 992,
            'md-max': 1199,
            'lg-min': 1200
        },
        navCollapseTimeout: 2500
    },

    /**
     * Application state. May be changed when using.
     * Synced to Local Storage
     */
    state: {
        /**
         * whether navigation is static (prevent automatic collapsing)
         */
        'nav-static': false
    }
};

var Helpers = function(){
    this._initResizeEvent();
    this._initOnScreenSizeCallbacks();
};
Helpers.prototype = {
    _resizeCallbacks: [],
    _screenSizeCallbacks: {
        xs:{enter:[], exit:[]},
        sm:{enter:[], exit:[]},
        md:{enter:[], exit:[]},
        lg:{enter:[], exit:[]}
    },

    /**
     * Checks screen size according to Bootstrap default sizes
     * @param size screen size  ('xs','sm','md','lg')
     * @returns {boolean} whether screen is <code>size</code>
     */
    isScreen: function(size){
        var screenPx = window.innerWidth;
        return (screenPx >= app.settings.screens[size + '-min'] || size == 'xs') && (screenPx <= app.settings.screens[size + '-max'] || size == 'lg');
    },

    /**
     * Returns screen size Bootstrap-like string ('xs','sm','md','lg')
     * @returns {string}
     */
    getScreenSize: function(){
        var screenPx = window.innerWidth;
        if (screenPx <= app.settings.screens['xs-max']) return 'xs';
        if ((screenPx >= app.settings.screens['sm-min']) && (screenPx <= app.settings.screens['sm-max'])) return 'sm';
        if ((screenPx >= app.settings.screens['md-min']) && (screenPx <= app.settings.screens['md-max'])) return 'md';
        if (screenPx >= app.settings.screens['lg-min']) return 'lg';
    },

    /**
     * Specify a function to execute when window entered/exited particular size.
     * @param size ('xs','sm','md','lg')
     * @param fn callback(newScreenSize, prevScreenSize)
     * @param onEnter whether to run a callback when screen enters `size` or exits. true by default @optional
     */
    onScreenSize: function(size, fn, /**Boolean=*/ onEnter){
        onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
        this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn)
    },

    /**
     * Change color brightness
     * @param color
     * @param ratio
     * @param darker
     * @returns {string}
     */
    //credit http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript
    changeColor: function(color, ratio, darker) {
        var pad = function(num, totalChars) {
            var pad = '0';
            num = num + '';
            while (num.length < totalChars) {
                num = pad + num;
            }
            return num;
        };
        // Trim trailing/leading whitespace
        color = color.replace(/^\s*|\s*$/, '');

        // Expand three-digit hex
        color = color.replace(
            /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
            '#$1$1$2$2$3$3'
        );

        // Calculate ratio
        var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
            rgb = color.match(new RegExp('^rgba?\\(\\s*' +
                    '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                    '\\s*,\\s*' +
                    '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                    '\\s*,\\s*' +
                    '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                    '(?:\\s*,\\s*' +
                    '(0|1|0?\\.\\d+))?' +
                    '\\s*\\)$'
                , 'i')),
            alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
            decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
                /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
                function() {
                    return parseInt(arguments[1], 16) + ',' +
                        parseInt(arguments[2], 16) + ',' +
                        parseInt(arguments[3], 16);
                }
            ).split(/,/),
            returnValue;

        // Return RGB(A)
        return !!rgb ?
            'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                    parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                    parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                    parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
            // Return hex
            [
                '#',
                pad(Math[darker ? 'max' : 'min'](
                        parseInt(decimal[0], 10) + difference, darker ? 0 : 255
                ).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](
                        parseInt(decimal[1], 10) + difference, darker ? 0 : 255
                ).toString(16), 2),
                pad(Math[darker ? 'max' : 'min'](
                        parseInt(decimal[2], 10) + difference, darker ? 0 : 255
                ).toString(16), 2)
            ].join('');
    },
    lightenColor: function(color, ratio) {
        return this.changeColor(color, ratio, false);
    },
    darkenColor: function(color, ratio) {
        return this.changeColor(color, ratio, true);
    },

    max: function(array) {
        return Math.max.apply(null, array);
    },

    min: function(array) {
        return Math.min.apply(null, array);
    },

    /**
     * Triggers sn:resize event. sn:resize is a convenient way to handle both window resize event and
     * sidebar state change.
     * Fired maximum once in 100 millis
     * @private
     */
    _initResizeEvent: function(){
        var resizeTimeout;

        $(window).on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function(){
                $(window).trigger('sn:resize');
            }, 100);
        });
    },

    /**
     * Initiates an array of throttle onScreenSize callbacks.
     * @private
     */
    _initOnScreenSizeCallbacks: function(){
        var resizeTimeout,
            helpers = this,
            prevSize = this.getScreenSize();

        $(window).resize(function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function(){
                var size = helpers.getScreenSize();
                if (size != prevSize){ //run only if something changed
                    //run exit callbacks first
                    helpers._screenSizeCallbacks[prevSize]['exit'].forEach(function(fn){
                        fn(size, prevSize);
                    });
                    //run enter callbacks then
                    helpers._screenSizeCallbacks[size]['enter'].forEach(function(fn){
                        fn(size, prevSize);
                    });
                    console.log('screen changed. new: ' + size + ', old: ' + prevSize);
                }
                prevSize = size;
            }, 100);
        });
    }
};

app.helpers = new Helpers();

appControllers.controller('SingAppController', ['$scope', '$localStorage',function ($scope, $localStorage){
    $scope.app = app;
    if (angular.isDefined($localStorage.state)){
        $scope.app.state = $localStorage.state;
    } else {
        $localStorage.state = $scope.app.state;
    }

    $scope.print = function(){
        window.print();
    };

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.loginPage = toState.name == 'login';
        $scope.errorPage = toState.name == 'error';
        $(document).trigger('sn:loaded', [event, toState, toParams, fromState, fromParams]);
    })
}]);