/**
 * Demo Sign directives. Is not a core Sign framework and may be removed if not needed.
 */


/* ========================================================================
 * Sing Demo functions directive. Demo-only functions. Does not affect the core Sing functionality.
 * Should be removed when used in real app.
 * ========================================================================
 */
appDirectives.directive('snDemo', function($rootScope){
    return {
        link: function(scope, $el){
            $(document).on('ajax-load:end', '#load-notifications-btn', function () {
                setTimeout(function(){
                    $('#notifications-list').find('.bg-attention').removeClass('bg-attention');
                }, 10000)
            });
            $(document).on('ajax-load:end', '#notifications-toggle input', function(){
                $('#notifications-list').find('[data-toggle=tooltip]').tooltip();
            });

            setTimeout(function(){
                var $chatNotification = $('#chat-notification');
                $chatNotification.removeClass('hide').addClass('animated fadeIn')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $chatNotification.removeClass('animated fadeIn');
                        setTimeout(function(){
                            $chatNotification.addClass('animated fadeOut')
                                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                    $chatNotification.addClass('hide');
                                });
                        }, 4000);
                    });
                $chatNotification.siblings('[data-sn-action="toggle-chat-sidebar-state"]').append('<i class="chat-notification-sing animated bounceIn"></i>')
            }, 4000)
        }
    }
});

appDirectives.directive('messengerDemo', ['scriptLoader', function(scriptLoader){
    function initializationCode(){
        (function() {
            var $, FlatMessage, spinner_template,
                __hasProp = {}.hasOwnProperty,
                __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

            $ = jQuery;

            spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

            FlatMessage = (function(_super) {

                __extends(FlatMessage, _super);

                function FlatMessage() {
                    return FlatMessage.__super__.constructor.apply(this, arguments);
                }

                FlatMessage.prototype.template = function(opts) {
                    var $message;
                    $message = FlatMessage.__super__.template.apply(this, arguments);
                    $message.append($(spinner_template));
                    return $message;
                };

                return FlatMessage;

            })(window.Messenger.Message);

            window.Messenger.themes.air = {
                Message: FlatMessage
            };

        }).call(window);
    }
    return {
        link: function(scope, $el){
            function render(){
                initializationCode();
                var theme = 'air';

                $.globalMessenger({ theme: theme });
                Messenger.options = { theme: theme  };

                Messenger().post("Thanks for checking out Messenger!");


                var loc = ['bottom', 'right'];

                var $lsel = $('.location-selector');

                var update = function(){
                    var classes = 'messenger-fixed';

                    for (var i=0; i < loc.length; i++)
                        classes += ' messenger-on-' + loc[i];

                    $.globalMessenger({ extraClasses: classes, theme: theme  });
                    Messenger.options = { extraClasses: classes, theme: theme };
                };

                update();

                $lsel.locationSelector()
                    .on('update', function(pos){
                        loc = pos;

                        update();
                    });

                $('#show-error-message').on('click', function(){
                    var i;

                    i = 0;

                    Messenger().run({
                        errorMessage: 'Error destroying alien planet',
                        successMessage: 'Alien planet destroyed!',
                        action: function(opts) {
                            if (++i < 3) {
                                return opts.error({
                                    status: 500,
                                    readyState: 0,
                                    responseText: 0
                                });
                            } else {
                                return opts.success();
                            }
                        }
                    });

                    return false;
                });

                $('#show-info-message').on('click', function(){
                    var msg = Messenger().post({
                        message: 'Launching thermonuclear war...',
                        actions: {
                            cancel: {
                                label: 'cancel launch',
                                action: function() {
                                    return msg.update({
                                        message: 'Thermonuclear war averted',
                                        type: 'success',
                                        actions: false
                                    });
                                }
                            }
                        }
                    });

                    return false;
                });

                $('#show-success-message').on('click', function(){
                    Messenger().post({
                        message: 'Showing success message was successful!',
                        type: 'success',
                        showCloseButton: true
                    });

                    return false;
                });
            }

            scriptLoader.loadScripts([
                'vendor/underscore/underscore-min.js',
                'vendor/backbone/backbone.js',
                'vendor/messenger/build/js/messenger.js',
                'vendor/messenger/build/js/messenger-theme-flat.js',
                'vendor/messenger/docs/welcome/javascripts/location-sel.js'
            ])
                .then(render)
        }
    }
}]);

appDirectives.directive('snGridDemo', ['scriptLoader', function(scriptLoader){
    return {
        link: function(scope, $el){
            function render(){
                var $widgets = $('.widget'),
                    $newsWidget = $('#news-widget'),
                    $sharesWidget = $('#shares-widget'),
                    $autoloadWidget = $('#autoload-widget');

                /**
                 * turn off .content-wrap transforms & disable sorting when widget fullscreened
                 */
                $widgets.on("fullscreen.widgster", function(){
                    $('.content-wrap').css({
                        '-webkit-transform': 'none',
                        '-ms-transform': 'none',
                        transform: 'none',
                        'margin': 0,
                        'z-index': 2
                    });
                    //prevent widget from dragging when fullscreened
                    $(".widget-container").sortable( "option", "disabled", true );
                }).on("restore.widgster closed.widgster", function(){
                    $('.content-wrap').css({
                        '-webkit-transform': '',
                        '-ms-transform': '',
                        transform: '',
                        margin: '',
                        'z-index': ''
                    });
                    //allow dragging back
                    $(".widget-container").sortable( "option", "disabled", false );
                });

                /**
                 * Make refresh button spin when loading
                 */
                $newsWidget.on("load.widgster", function(){
                    $(this).find('[data-widgster="load"] > i').addClass('fa-spin')
                }).on("loaded.widgster", function(){
                    $(this).find('[data-widgster="load"] > i').removeClass('fa-spin')
                });

                /**
                 * Custom close prompt for news widget
                 */
                $newsWidget.widgster({
                    showLoader: false,
                    closePrompt: function(callback){
                        $('#news-close-modal').modal('show');
                        $('#news-widget-remove').on('click', function(){
                            $('#news-close-modal').on('hidden.bs.modal', callback).modal('hide');
                        });
                    }
                });

                /**
                 * Use custom loader template
                 */
                $sharesWidget.widgster({
                    loaderTemplate: '<div class="loader animated fadeIn">' +
                        '   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>' +
                        '</div>'
                });

                /**
                 * Make hidden spinner appear & spin when loading
                 */
                $autoloadWidget.on("load.widgster", function(){
                    $(this).find('.fa-spinner').addClass('fa-spin in');
                }).on("loaded.widgster", function(){
                    $(this).find('.fa-spinner').removeClass('fa-spin in')
                }).on('load.widgster fullscreen.widgster restore.widgster', function(){
                    $(this).find('.dropdown.open > .dropdown-toggle').dropdown('toggle');
                });

                /**
                 * Init all other widgets with default settings & settings retrieved from data-* attributes
                 */
                $widgets.widgster();

                /**
                 * Init tooltips for all widget controls on page
                 */
                $('.widget-controls > a').tooltip({placement: 'bottom'});
            }

            scriptLoader.loadScripts([
                'vendor/jquery-ui/ui/core.js',
                'vendor/jquery-ui/ui/widget.js',
                'vendor/jquery-ui/ui/mouse.js',
                'vendor/jquery-ui/ui/sortable.js',
                'vendor/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'
            ])
                .then(render);
        }
    }
}]);

/**
 * Just for demo purpose extracting backgrid initialization code into a separate directive
 */
appDirectives.directive('snBackgridDemo', ['scriptLoader', function(scriptLoader){
    return {
        link: function(scope, $el){
            function render(){
                Backgrid.InputCellEditor.prototype.attributes.class = 'form-control input-sm';

                var Territory = Backbone.Model.extend({});

                var PageableTerritories = Backbone.PageableCollection.extend({
                    model: Territory,
                    url: "demo/json/pageable-territories.json",
                    state: {
                        pageSize: 9
                    },
                    mode: "client" // page entirely on the client side
                });


                var pageableTerritories = new PageableTerritories(),
                    initialTerritories = pageableTerritories;
                function createBackgrid(collection){
                    var columns = [{
                        name: "id", // The key of the model attribute
                        label: "ID", // The name to display in the header
                        editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
                        // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
                        cell: Backgrid.IntegerCell.extend({
                            orderSeparator: ''
                        })
                    }, {
                        name: "name",
                        label: "Name",
                        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
                        cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
                    }, {
                        name: "pop",
                        label: "Population",
                        cell: "integer" // An integer cell is a number cell that displays humanized integers
                    }, {
                        name: "url",
                        label: "URL",
                        cell: "uri" // Renders the value in an HTML <a> element
                    }];
                    if (scope.app.helpers.isScreen('xs')){
                        columns.splice(3,1)
                    }
                    var pageableGrid = new Backgrid.Grid({
                        columns: columns,
                        collection: collection,
                        className: 'table table-striped table-editable no-margin mb-sm'
                    });

                    var paginator = new Backgrid.Extension.Paginator({

                        slideScale: 0.25, // Default is 0.5

                        // Whether sorting should go back to the first page
                        goBackFirstOnSort: false, // Default is true

                        collection: collection,

                        controls: {
                            rewind: {
                                label: '<i class="fa fa-angle-double-left fa-lg"></i>',
                                title: "First"
                            },
                            back: {
                                label: '<i class="fa fa-angle-left fa-lg"></i>',
                                title: "Previous"
                            },
                            forward: {
                                label: '<i class="fa fa-angle-right fa-lg"></i>',
                                title: "Next"
                            },
                            fastForward: {
                                label: '<i class="fa fa-angle-double-right fa-lg"></i>',
                                title: "Last"
                            }
                        }
                    });

                    $("#table-dynamic").html('').append(pageableGrid.render().$el).append(paginator.render().$el);
                }

                $(window).on('sn:resize',function(){
                    createBackgrid(pageableTerritories);
                });

                createBackgrid(pageableTerritories);

                $("#search-countries").keyup(function(){

                    var $that = $(this),
                        filteredCollection = initialTerritories.fullCollection.filter(function(el){
                            return ~el.get('name').toUpperCase().indexOf($that.val().toUpperCase());
                        });
                    createBackgrid(new PageableTerritories(filteredCollection, {
                        state: {
                            firstPage: 1,
                            currentPage: 1
                        }
                    }));
                });


                pageableTerritories.fetch();
            }

            scriptLoader.loadScripts([
                'vendor/underscore/underscore-min.js',
                'vendor/backbone/backbone.js',
                'vendor/backbone.paginator/lib/backbone.paginator.min.js',
                'vendor/backgrid/lib/backgrid.js',
                'vendor/backgrid-paginator/backgrid-paginator.js',
                'vendor/bootstrap-select/dist/js/bootstrap-select.min.js'
            ])
                .then(render)
        }
    }
}]);


/**
 * Gmap initialization requires to load scripts asynchronously
 */
appDirectives.directive('snGmap', ['$rootScope', function($rootScope){

    if (!angular.isDefined(window.GMaps)){
        // loading google maps synamically to be able to use their callback method
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://maps.google.com/maps/api/js?sensor=true&callback=googleMapsLoaded';
        document.body.appendChild(script);

        // a small trick to ensure google api was loaded
        // googleMapsLoaded function gets called by google script script after
        $rootScope.gmapsLoaded = false;
        window.googleMapsLoaded = function(){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'vendor/gmaps/gmaps.js';
            script.onload = function(){
                $rootScope.$apply(function(){
                    $rootScope.gmapsLoaded = true;
                })
            };
            document.body.appendChild(script);
        };
    }


    return {
        link: function(scope, $el, attrs){
            function render(){
                var map = new GMaps({
                    el: $el[0],
                    lat: -37.813179,
                    lng: 144.950259,
                    zoomControl : false,
                    panControl : false,
                    streetViewControl : false,
                    mapTypeControl: false,
                    overviewMapControl: false
                });

                if (attrs.contextMenu){
                    map.setContextMenu({
                        control: 'map',
                        options: [{
                            title: 'Add marker',
                            name: 'add_marker',
                            action: function(e){
                                this.addMarker({
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng(),
                                    animation: google.maps.Animation.DROP,
                                    draggable:true,
                                    title: 'New Marker'
                                });
                                this.hideContextMenu();
                            }
                        }, {
                            title: 'Center here',
                            name: 'center_here',
                            action: function(e){
                                this.setCenter(e.latLng.lat(), e.latLng.lng());
                            }
                        }]
                    });
                    map.setContextMenu({
                        control: 'marker',
                        options: [{
                            title: 'Center here',
                            name: 'center_here',
                            action: function(e){
                                this.setCenter(e.latLng.lat(), e.latLng.lng());
                            }
                        }]
                    });
                }

                $("[data-gmap-zoom-in]").on('click', function() {
                    map.zoomIn(1);
                });
                $("[data-gmap-zoom-out]").on('click', function() {
                    map.zoomOut(1);
                });

                setTimeout( function(){
                    map.addMarker({
                        lat: -37.813179,
                        lng: 144.950259,
                        animation: google.maps.Animation.DROP,
                        draggable: true,
                        title: 'Here we are'
                    });
                }, 3000);
            }
            if ($rootScope.gmapsLoaded || angular.isDefined(window.GMaps)){
                render()
            } else {
                $rootScope.$watch('gmapsLoaded', function(val){
                    (val == true) && render();
                });
            }
        }
    }
}]);

/**
 *
 */

appDirectives.directive('snGallery', ['$timeout', 'scriptLoader', function($timeout, scriptLoader){
    return {
        link: function(scope, $el, attrs){
            function render(){
                var $sizer = $el.find('.js-shuffle-sizer');

                $timeout(function() {
                    // instantiate the plugin
                    $el.shuffle(angular.extend({ sizer: $sizer }, scope.$eval(attrs.options)));
                    $timeout(function(){
                        $el.shuffle( 'shuffle', 'all' );
                    })
                });

                $(window).on('sn:resize', function(){
                    $el.shuffle('update');
                });

                scope.$grid = $el;
            }

            scriptLoader.loadScripts(['vendor/shufflejs/dist/jquery.shuffle.modernizr.min.js'])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Mapael Layers Map
 * ========================================================================
 */

appDirectives.directive('snMapaelLayersMap', ['scriptLoader', function (scriptLoader) {
    return {
        require: 'ngModel',
        link: function (scope, $el, attrs, ngModel) {
            function render(){
                scope.$watch(attrs.ngModel, function(data, oldData){
                    if (!angular.isDefined(data)) return;
                    var $map = $el;
                    $map.css('height', attrs.height || 394).css('margin-bottom', attrs.marginBottom || (-15));
                    if ($map.parents('.widget')[0]){
                        $map.find('.map').css('height', parseInt($map.parents('.widget').css('height')) - 40);
                    }
                    $map.mapael(data);

                    if (scope[attrs.zoom]){
                        $map.trigger('zoom', scope[attrs.zoom]);
                    }

                    scope.$map = $map;
                })
            }

            scriptLoader.loadScripts([
                'vendor/raphael/raphael-min.js',
                'vendor/jQuery-Mapael/js/jquery.mapael.js',
                'vendor/jQuery-Mapael/js/maps/world_countries.js'
            ])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Animate Number jQuery plugin customized wrapper
 * ========================================================================
 */
appDirectives.directive('animateNumber', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el){
            function render(){
                $el.animateNumber({
                    number: $el.text().replace(/ /gi, ''),
                    numberStep: $.animateNumber.numberStepFactories.separator(' '),
                    easing: 'easeInQuad'
                }, 1000);
            }

            scriptLoader.loadScripts(['vendor/jquery-animateNumber/jquery.animateNumber.min.js'])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Bootstrap calendar predefined wrapper
 * ========================================================================
 */

appDirectives.directive('bootstrapCalendar', ['scriptLoader',function(scriptLoader){
    return {
        restrict: 'A',
        link: function(scope, $el, attrs){
            function render(){
                var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

                var dayNames = ["S", "M", "T", "W", "T", "F", "S"];

                var events = scope.$eval(attrs.events);
                var $calendar = $el;
                $calendar.calendar({
                    months: monthNames,
                    days: dayNames,
                    events: events,
                    popover_options:{
                        placement: 'top',
                        html: true
                    }
                });
                $calendar.find('.icon-arrow-left').addClass('fa fa-arrow-left');
                $calendar.find('.icon-arrow-right').addClass('fa fa-arrow-right');
                function restyleCalendar(){
                    $calendar.find('.event').each(function(){
                        var $this = $(this),
                            $eventIndicator = $('<span></span>');
                        $eventIndicator.css('background-color', $this.css('background-color')).appendTo($this.find('a'));
                        $this.css('background-color', '');
                    })
                }
                $calendar.find('.icon-arrow-left, .icon-arrow-right').parent().on('click', restyleCalendar);
                restyleCalendar();
            }

            scriptLoader.loadScripts([
                'vendor/bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.min.js'
            ])
                .then(function(){
                    attrs.$observe('events', function(){
                        render();
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Rickshaw wrapper
 * ========================================================================
 */

appDirectives.directive('rickshawChart', ['scriptLoader', function(scriptLoader){
    return {
        scope: {
            height: '@',
            series: '=',

            realtime: '=',
            seriesData: '=',
            random: '=',
            configureProps: '='
        },
        link: function (scope, $el, attrs){
            function render(){
                var graph = new Rickshaw.Graph({
                    element: $el[0],
                    height: scope.height,
                    renderer: attrs.renderer || 'area',
                    series: scope.series
                });

                function onResize(){
                    var configureProperties = jQuery.extend({
                        width: $el.width(),
                        height: scope.height
                    }, scope.configureProps);
                    graph.configure(configureProperties);
                    graph.render();

                    $el.find('svg').css({height: scope.height})
                }

                $(window).on('sn:resize', onResize);
                onResize();


                var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                    graph: graph,
                    xFormatter: function(x) {
                        return new Date(x * 1000).toString();
                    }
                } );

                if (scope.realtime){
                    setInterval( function() {
                        scope.random.removeData(scope.seriesData);
                        scope.random.addData(scope.seriesData);
                        graph.update();

                    }, 1000 );
                }
            }



            scriptLoader.loadScripts([
                'vendor/d3/d3.min.js',
                'vendor/rickshaw/rickshaw.min.js'
            ])
                .then(function(){
                    scope.$watch('series', function(val, oldVal){
                        if (!angular.isDefined(val)) return;
                        render();
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Bootstrap Wizard wrapper
 * ========================================================================
 */

appDirectives.directive('bootstrapWizard', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){

            function render(){
                $el.bootstrapWizard({
                    onTabShow: function($activeTab, $navigation, index) {
                        var $total = $navigation.find('li').length;
                        var $current = index + 1;
                        var $percent = ($current/$total) * 100;
                        var $wizard = $el;
                        $wizard.find('.progress-bar').css({width: $percent + '%'});

                        if($current >= $total) {
                            $wizard.find('.pager .next').hide();
                            $wizard.find('.pager .finish').show();
                            $wizard.find('.pager .finish').removeClass('disabled');
                        } else {
                            $wizard.find('.pager .next').show();
                            $wizard.find('.pager .finish').hide();
                        }

                        //setting done class
                        $navigation.find('li').removeClass('done');
                        $activeTab.prevAll().addClass('done');
                    },

                    // validate on tab change
                    onNext: function($activeTab, $navigation, nextIndex){
                        var $activeTabPane = $($activeTab.find('a[data-toggle=tab]').attr('href')),
                            $form = $activeTabPane.find('form');

                        // validate form in casa there is form
                        if ($form.length){
                            return $form.parsley().validate();
                        }
                    },
                    //diable tab clicking
                    onTabClick: function($activeTab, $navigation, currentIndex, clickedIndex){
                        return $navigation.find('li:eq(' + clickedIndex + ')').is('.done');
                    }
                });
                if (attrs.height){
                    //setting fixed height so wizard won't jump
                    $el.find('.tab-pane').css({height: attrs.height});
                }
            }

            scriptLoader.loadScripts([
                'vendor/parsleyjs/dist/parsley.min.js',
                'vendor/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js'
            ])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Bootstrap Application Wizard (Modal) wrapper
 * ========================================================================
 * This example was raw-copied from application wizard website
 */

appDirectives.directive('bootstrapApplicationWizard', ['scriptLoader', function(scriptLoader){
    window.validateServerLabel = function(el) {
        var name = el.val();
        var retValue = {};

        if (name == "") {
            retValue.status = false;
            retValue.msg = "Please enter a label";
        } else {
            retValue.status = true;
        }

        return retValue;
    };

    window.validateFQDN = function(el) {
        var $this = $(el);
        var retValue = {};

        if ($this.is(':disabled')) {
            // FQDN Disabled
            retValue.status = true;
        } else {
            if ($this.data('lookup') === 0) {
                retValue.status = false;
                retValue.msg = "Preform lookup first";
            } else {
                if ($this.data('is-valid') === 0) {
                    retValue.status = false;
                    retValue.msg = "Lookup Failed";
                } else {
                    retValue.status = true;
                }
            }
        }

        return retValue;
    };

    function lookup() {
        // Normally a ajax call to the server to preform a lookup
        $('#fqdn').data('lookup', 1);
        $('#fqdn').data('is-valid', 1);
        $('#ip').val('127.0.0.1');
    }
    return {
        link: function (scope, $el, attrs){
            function render(){
                var wizard = $el.wizard({
                    keyboard : false,
                    contentHeight : 400,
                    contentWidth : 700,
                    backdrop: 'static'
                });

                $('#fqdn').on('input', function() {
                    if ($(this).val().length != 0) {
                        $('#ip').val('').attr('disabled', 'disabled');
                        $('#fqdn, #ip').parents('.form-group').removeClass('has-error has-success');
                    } else {
                        $('#ip').val('').removeAttr('disabled');
                    }
                });

                $('#btn-fqdn').find('button').on('click', lookup);

                var pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
                var x = 46;

                $('#ip').on('input', function() {
                    if ($(this).val().length != 0) {
                        $('#fqdn').val('').attr('disabled', 'disabled');
                    } else {
                        $('#fqdn').val('').removeAttr('disabled');
                    }
                }).keypress(function(e) {
                    if (e.which != 8 && e.which != 0 && e.which != x && (e.which < 48 || e.which > 57)) {
                        console.log(e.which);
                        return false;
                    }
                }).keyup(function() {
                    var $this = $(this);
                    if (!pattern.test($this.val())) {
                        //$('#validate_ip').text('Not Valid IP');
                        console.log('Not Valid IP');
                        $this.parents('.form-group').removeClass('has-error has-success').addClass('has-error');
                        while ($this.val().indexOf("..") !== -1) {
                            $this.val($this.val().replace('..', '.'));
                        }
                        x = 46;
                    } else {
                        x = 0;
                        var lastChar = $this.val().substr($this.val().length - 1);
                        if (lastChar == '.') {
                            $this.val($this.val().slice(0, -1));
                        }
                        var ip = $this.val().split('.');
                        if (ip.length == 4) {
                            //$('#validate_ip').text('Valid IP');
                            console.log('Valid IP');
                            $this.parents('.form-group').removeClass('has-error').addClass('has-success');
                        }
                    }
                });

                wizard.on('closed', function() {
                    wizard.reset();
                });

                wizard.on("reset", function() {
                    wizard.modal.find(':input').val('').removeAttr('disabled');
                    wizard.modal.find('.form-group').removeClass('has-error').removeClass('has-succes');
                    wizard.modal.find('#fqdn').data('is-valid', 0).data('lookup', 0);
                });

                wizard.on("submit", function(wizard) {
                    var submit = {
                        "hostname": $("#new-server-fqdn").val()
                    };

                    this.log('seralize()');
                    this.log(this.serialize());
                    this.log('serializeArray()');
                    this.log(this.serializeArray());

                    setTimeout(function() {
                        wizard.trigger("success");
                        wizard.hideButtons();
                        wizard._submitting = false;
                        wizard.showSubmitCard("success");
                        wizard.updateProgressBar(0);
                    }, 2000);
                });

                wizard.el.find(".wizard-success .im-done").click(function() {
                    wizard.hide();
                    setTimeout(function() {
                        wizard.reset();
                    }, 250);

                });

                wizard.el.find(".wizard-success .create-another-server").click(function() {
                    wizard.reset();
                });

                wizard.el.find('.wizard-progress-container .progress').removeClass('progress-striped')
                    .addClass('progress-xs');

                $(".wizard-group-list").click(function() {
                    alert("Disabled for demo.");
                });

                $('#open-wizard').click(function(e) {
                    e.preventDefault();
                    wizard.show();
                });
            }

            scriptLoader.loadScripts([
                'vendor/bootstrap-application-wizard/src/bootstrap-wizard.js'
            ])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Live Tile directive
 * ========================================================================
 */

appDirectives.directive('liveTile', ['scriptLoader', function(scriptLoader){
    return {
        restrict: 'C',
        link: function (scope, $el, attrs){
            function render(){
                $el.css('height', attrs.height).liveTile();

                // remove onResize timeouts if present
                scope.$on('$stateChangeStart', function(){
                    $el.liveTile("destroy", true);
                });
            }

            scriptLoader.loadScripts(['vendor/MetroJS/release/MetroJs.Full/MetroJs.js'])
                .then(render)
        }
    }
}]);


/* ========================================================================
 * Flot Chart wrapper
 * ========================================================================
 */

appDirectives.directive('flotChart', ['scriptLoader', '$timeout', function(scriptLoader, $timeout){
    return {
        link: function (scope, $el, attrs){
            function render(){
                $.plot($el, scope[attrs.ngModel], scope[attrs.options] || {
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 1,
                            fill: false,
                            fillColor: { colors: [{ opacity: .001 }, { opacity: .5}] }
                        },
                        points: {
                            show: false,
                            fill: true
                        },
                        shadowSize: 0
                    },
                    legend: false,
                    grid: {
                        show:false,
                        margin: 0,
                        labelMargin: 0,
                        axisMargin: 0,
                        hoverable: true,
                        clickable: true,
                        tickColor: "rgba(255,255,255,1)",
                        borderWidth: 0
                    }
                });
            }

            var coreScripts = ['vendor/flot/jquery.flot.js'],
                flotPlugins = scope.$eval(attrs.plugins) || [],
                scriptsToLoad = coreScripts.concat(flotPlugins);
            scriptLoader.loadScripts(scriptsToLoad)
                .then(function(){
                    scope.$watch(attrs.ngModel, function(data, oldData){
                        if (!angular.isDefined(data)) return;
                        render();
                        $(window).on('sn:resize', function(){
                            $timeout(render);
                        });
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Flot Animator Chart wrapper
 * ========================================================================
 */

appDirectives.directive('flotChartAnimator', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){
            function render(){
                $.plotAnimator($el, scope[attrs.ngModel],{
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        min:2,
                        font :{
                            lineHeight: 13,
                            weight: "bold",
                            color: scope.app.settings.colors['gray-semi-light']
                        }
                    },
                    yaxis: {
                        tickDecimals: 0,
                        tickColor: "#f3f3f3",
                        font :{
                            lineHeight: 13,
                            weight: "bold",
                            color: scope.app.settings.colors['gray-semi-light']
                        }
                    },
                    grid: {
                        backgroundColor: { colors: [ "#fff", "#fff" ] },
                        borderWidth:1,
                        borderColor:"#f0f0f0",
                        margin:0,
                        minBorderMargin:0,
                        labelMargin:20,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6
                    },
                    legend: false
                });
            }

            scriptLoader.loadScripts([
                'vendor/flot.animator/jquery.flot.animator.min.js',
                'vendor/flot/jquery.flot.js'
            ])
                .then(function(){
                    scope.$watch(attrs.ngModel, function(data, oldData){
                        if (!angular.isDefined(data)) return;
                        render();
                        $(window).on('sn:resize', render);
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Nvd3 Chart wrapper.
 * ========================================================================
 * Simple self-written solution that requires controller to initialize chart & data.
 * If you're looking for full scale support of nvd3 options and more angulary way of
 * initializing nvd3 charts please check https://github.com/cmaurer/angularjs-nvd3-directives
 */

appDirectives.directive('nvd3Chart', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){
            function render(){
                nv.addGraph(function() {
                    var chart = scope[attrs.chart];
                    d3.select($el.find('svg')[0])
                        .style('height', attrs.height || '300px')
                        .datum(scope[attrs.datum])
                        .transition().duration(500)
                        .call(chart)
                    ;

                    $(window).on('sn:resize', chart.update);

                    return chart;
                });
            }

            scriptLoader.loadScripts([
                'vendor/d3/d3.min.js',
                'vendor/nvd3/build/nv.d3.min.js'
            ])
                .then(function(){
                    scope.$watch(attrs.datum, function(data, oldData){
                        if (!angular.isDefined(data)) return;
                        render();
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Morris Chart wrapper.
 * ========================================================================
 */

appDirectives.directive('morrisChart', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){
            function capitalise(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }
            function render(){
                $el.css({height: attrs.height}); //safari svg height fix
                Morris[capitalise(attrs.type)](angular.extend({
                    element: $el[0]
                }, scope[attrs.options]));
            }

            scriptLoader.loadScripts([
                'vendor/raphael/raphael-min.js',
                'vendor/morris.js/morris.min.js'
            ])
                .then(function(){
                    scope.$watch(attrs.options, function(data){
                        if (!angular.isDefined(data)) return;
                        render();
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Skycon weather icons wrapper
 * ========================================================================
 */

appDirectives.directive('skyCon', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){
            function render(){
                var icons = new Skycons({"color": scope.$eval(attrs.color)});
                icons.set($el[0], attrs.skyCon);
                icons.play();
            }

            scriptLoader.loadScripts(['vendor/skycons/skycons.js'])
                .then(render)
        }
    }
}]);

/* ========================================================================
 * Sparkline
 * ========================================================================
 */

appDirectives.directive('jqSparkline', ['scriptLoader', function (scriptLoader) {
    return {
        // pass model & options as arrays to enable composite sparklines
        require: 'ngModel',
        link: function (scope, $el, attrs, ngModel) {
            function render(){
                var model = angular.isString(ngModel.$viewValue) ? ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : ngModel.$viewValue,
                    options = scope[attrs.options];

                // enabling composite chart if array passed
                if (angular.isArray(model) && angular.isArray(options)){
                    options.forEach(function(singleOptions, i){
                        if (i == 0){
                            $el.sparkline(model[i], singleOptions);
                        } else { // set composite for next calls
                            $el.sparkline(model[i], $.extend({composite: true}, singleOptions));
                        }
                    });
                } else {
                    var data;
                    // Make sure we have an array of numbers
                    angular.isArray(model) ? data = model : data = model.split(',');
                    $el.sparkline(data, options);
                }
            }

            scriptLoader.loadScripts(['vendor/jquery.sparkline/index.js'])
                .then(function(){
                    scope.$watch(attrs.ngModel, function(){
                        render();
                    });

                    $(window).on('sn:resize', render);
                })
        }
    }
}]);

/* ========================================================================
 * Switchery wrapper. credit: https://github.com/servergrove/NgSwitchery
 * ========================================================================
 */

/**
 * Module to use Switchery as a directive for angular.
 * @TODO implement Switchery as a service, https://github.com/abpetkov/switchery/pull/11
 * Flatlogic: encanced to load js script dynamically
 */
appDirectives.directive('uiSwitch', ['$window', '$timeout','$log', '$parse', 'scriptLoader', function($window, $timeout, $log, $parse, scriptLoader) {

    /**
     * Initializes the HTML element as a Switchery switch.
     *
     * @TODO add a way to provide options for Switchery
     * $timeout is in place as a workaround to work within angular-ui tabs.
     *
     * @param scope
     * @param elem
     * @param attrs
     */
    function linkSwitchery(scope, elem, attrs, ngModel) {
        if(!ngModel) return false;
        var options = {};
        try {
            options = $parse(attrs.uiSwitch)(scope);
        }
        catch (e) {}
        $timeout(function() {
            var switcher = new $window.Switchery(elem[0], options);
            var element = switcher.element;
            element.checked = scope.initValue;
            switcher.setPosition(false);
            element.addEventListener('change',function(evt) {
                scope.$apply(function() {
                    ngModel.$setViewValue(element.checked);
                })
            })
        }, 0);
    }
    return {
        require: 'ngModel',
        restrict: 'AE',
        scope : {initValue : '=ngModel'},
        link: function(scope, elem, attrs, ngModel){
            // sing part. was straight linkSwitchery call
            scriptLoader.loadScripts(['vendor/switchery/dist/switchery.min.js'])
                .then(function(){
                    linkSwitchery(scope, elem, attrs, ngModel)
                })
        }
    }
}]);


/* ========================================================================
 * Dropzone wrapper. credit: https://gist.github.com/compact/8118670
 * ========================================================================
 */
/**
 * An AngularJS directive for Dropzone.js, http://www.dropzonejs.com/
 *
 * Usage:
 *
 * <div ng-app="app" ng-controller="SomeCtrl">
 *   <button dropzone="dropzoneConfig">
 *     Drag and drop files here or click to upload
 *   </button>
 * </div>
 */

appDirectives.directive('dropzone', ['scriptLoader', function (scriptLoader) {
    return function (scope, element, attrs) {
        function render(){
            var config, dropzone;

            config = angular.extend({}, scope[attrs.dropzone]);

            // create a Dropzone for the element with the given options
            dropzone = new Dropzone(element[0], config.options);

            // bind the given event handlers
            angular.forEach(config.eventHandlers, function (handler, event) {
                dropzone.on(event, handler);
            });
        }

        scriptLoader.loadScripts(['vendor/dropzone/dist/min/dropzone.min.js'])
            .then(render)
    };
}]);