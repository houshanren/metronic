/**
 * Core Sign directives. Sing framework is built on top of them
 */

'use strict';

var appDirectives = angular.module('app.directives', []);

/**
 * Sing Directives
 * sn: - Sing angular namespace
 */

/**
 * Prevent default links behaviour so it won't cause unwanted url changes for angular
 */
appDirectives.directive('body', function() {
    return {
        restrict: 'E',
        link: function(scope, $element) {
            // prevent unwanted navigation
            $element.on('click', 'a[href=#]', function(e) {
                e.preventDefault();
            })
        }
    }
});

/* ========================================================================
 * Animate Progress Bars
 * ========================================================================
 */
appDirectives.directive('snProgressAnimate', ['$timeout', function($timeout){
    return {
        link: function (scope, $el){
            var value = $el.data('value'),
                $bar = $el.find('.progress-bar');
            $bar.css('opacity', 0);
            $timeout(function(){
                $bar.css({
                    transition: 'none',
                    width: 0,
                    opacity: 1
                });
                $timeout(function(){
                    $bar.css('transition', '').css('width', value + '%');
                })
            })
        }
    }
}]);

/* ========================================================================
 * Sing App actions. Shortcuts available via data-sn-action attribute
 * ========================================================================
 */
appDirectives.directive('snAction', function($rootScope){
    var singActions = {
        'toggle-navigation-state': function(e, scope){
            scope.app.state['nav-static'] = !scope.app.state['nav-static'];
        },
        'toggle-navigation-collapse-state': function(e, scope){
            $rootScope.toggleNavigationCollapseState();
        },
        'toggle-chat-sidebar-state': function(){
            //remove notification sign on a first click
            $(this).find('.chat-notification-sing').remove();
            $rootScope.toggleChatSidebarState();


            //todo demo-only stuff. TO-REMOVE in real app!
            setTimeout(function(){
                // demo: add class & badge to indicate incoming messages from contact
                // .js-notification-added ensures notification added only once
                $('.chat-sidebar-user-group:first-of-type .list-group-item:first-child:not(.js-notification-added)').addClass('active js-notification-added')
                    .find('.fa-circle').after('<span class="badge badge-danger pull-right animated bounceInDown">3</span>');
            }, 1000)
        }
    };
    return {
        restrict: 'A',
        link: function (scope, $el, attrs){
            if (angular.isDefined(attrs.snAction) && attrs.snAction != '') {
                $el.on('click', function(e) {
                    scope.$apply(function(){
                        singActions[attrs.snAction].call($el[0], e, scope);
                    });
                    e.preventDefault();
                });
            }

            if (angular.isDefined(attrs.tooltip) && attrs.snAction != ''){
                $el.tooltip();
            }
        }
    }
});

/* ========================================================================
 * Sing App Navigation (Sidebar)
 * ========================================================================
 */
appDirectives.directive('snNavigation', function($timeout, $rootScope, $state){
    var SnNavigationDirective = function($el, scope){
        this.$el = $el;
        this.scope = scope;
        this.helpers = scope.app.helpers;

        // publish method to global scope to allow navigation collapsing via api
        $rootScope.toggleNavigationCollapseState = $.proxy(this.toggleNavigationCollapseState, this);
    };
    SnNavigationDirective.prototype = { // a set of reusable directive private functions
        expandNavigation: function(){
            //this method only makes sense for non-static navigation state
            if (this.isNavigationStatic() && (this.helpers.isScreen('md') || this.helpers.isScreen('lg'))) return;

            $('body').removeClass('nav-collapsed');
            this.$el.find('.active .active').closest('.collapse').collapse('show')
                .siblings('[data-toggle=collapse]').removeClass('collapsed');
        },

        collapseNavigation: function(){
            //this method only makes sense for non-static navigation state
            if (this.isNavigationStatic() && (this.helpers.isScreen('md') || this.helpers.isScreen('lg'))) return;

            $('body').addClass('nav-collapsed');
            this.$el.find('.collapse.in').collapse('hide')
                .siblings('[data-toggle=collapse]').addClass('collapsed');
        },


        /**
         * Check and set navigation collapse according to screen size and navigation state
         */
        checkNavigationState: function(){
            if (this.isNavigationStatic()){
                if (this.helpers.isScreen('sm') || this.helpers.isScreen('xs')){
                    this.collapseNavigation();
                }
            } else {
                if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
                    var view = this;
                    $timeout(function(){
                        view.collapseNavigation();
                    }, this.scope.app.settings.navCollapseTimeout);
                } else {
                    this.collapseNavigation();
                }
            }
        },

        isNavigationStatic: function(){
            return this.scope.app.state['nav-static'] === true;
        },

        changeActiveNavigationItem: function(event, toState, toParams){
            var $newActiveLink = this.$el.find('a[href="' + $state.href(toState, toParams) + '"]');

            // collapse .collapse only if new and old active links belong to different .collapse
            if (!$newActiveLink.is('.active > .collapse > li > a')){
                this.$el.find('.active .active').closest('.collapse').collapse('hide');
            }
            this.$el.find('.sidebar-nav .active').removeClass('active');

            $newActiveLink.closest('li').addClass('active')
                .parents('li').addClass('active');

            // uncollapse parent
            $newActiveLink.closest('.collapse').addClass('in').siblings('a[data-toggle=collapse]').removeClass('collapsed');
        },

        toggleNavigationCollapseState: function(){
            if ($('body').is('.nav-collapsed')){
                this.expandNavigation();
            } else {
                this.collapseNavigation();
            }
        },

        enableSwipeCollapsing: function(){
            var d = this;
            $('.content-wrap').swipe({
                swipeLeft: function(){
                    //this method only makes sense for small screens + ipad
                    if (d.helpers.isScreen('lg')) return;

                    if (!$('body').is('.nav-collapsed')){
                        d.collapseNavigation();
                    }
                },
                swipeRight: function(){
                    //this method only makes sense for small screens + ipad
                    if (d.helpers.isScreen('lg')) return;

                    // check if navigation is collapsing. exiting if true
                    if ($('body').is('.nav-busy')) return;

                    if ($('body').is('.nav-collapsed')){
                        d.expandNavigation();
                    }
                },
                threshold: this.helpers.isScreen('xs') ? 100 : 200
            });
        },

        collapseNavIfSmallScreen: function(){
            if (this.helpers.isScreen('xs') || this.helpers.isScreen('sm')){
                this.collapseNavigation();
            }
        },

        _sidebarMouseEnter: function(){
            if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
                this.expandNavigation();
            }
        },
        _sidebarMouseLeave: function(){
            if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
                this.collapseNavigation();
            }
        }
    };
    return {
        link: function (scope, $el){
            var d = new SnNavigationDirective($el, scope);

            $el.on('mouseenter', $.proxy(d._sidebarMouseEnter, d));
            $el.on('mouseleave', $.proxy(d._sidebarMouseLeave, d));

            // wait untill all includes included
            $timeout(function(){
                // set active navigation item
                d.changeActiveNavigationItem({}, $state.$current, $state.params);

                d.checkNavigationState();
            });

            /**
             * open navigation if collapsed sidebar clicked
             */
            $el.on('click', function(){
                if ($('body').is('.nav-collapsed')){
                    d.expandNavigation();
                }
            });

            scope.$watch('app.state["nav-static"]', function(newVal, oldVal){
                if (newVal == oldVal) return; // shouldn't they fix it?
                if (!newVal){ // if navigation state is collapsing
                    d.collapseNavigation();
                }

                // let angular finish doing its stuff so all animation are applied to trigger an event on a ready DOM
                $timeout(function(){
                    $(window).trigger('sn:resize');
                })
            });

            // change active navigation item when state change
            $rootScope.$on('$stateChangeStart', $.proxy(d.changeActiveNavigationItem, d));
            $rootScope.$on('$stateChangeSuccess', $.proxy(d.collapseNavIfSmallScreen, d));

            // scroll to top manually after page change. seems that it doesn't work out of the box because
            // the actual app state is not changed - it remain app.page - only params changed.
            $rootScope.$on('$stateChangeSuccess', function(){
                window.scrollTo(0, 0);
            });

            // enable swipe navigation collapsing
            ('ontouchstart' in window) && d.enableSwipeCollapsing();

            /* reimplementing bs.collapse data-parent here as we don't want to use BS .panel*/
            $el.find('.collapse').on('show.bs.collapse', function(e){
                // execute only if we're actually the .collapse element initiated event
                // return for bubbled events
                if (e.target != e.currentTarget) return;

                var $triggerLink = $(this).prev('[data-toggle=collapse]');
                $($triggerLink.data('parent')).find('.collapse.in').not($(this)).collapse('hide');
            })
                /* adding additional classes to navigation link li-parent for several purposes. see navigation styles */
                .on('show.bs.collapse', function(e){
                    // execute only if we're actually the .collapse element initiated event
                    // return for bubbled events
                    if (e.target != e.currentTarget) return;

                    $(this).closest('li').addClass('open');
                }).on('hide.bs.collapse', function(e){
                    // execute only if we're actually the .collapse element initiated event
                    // return for bubbled events
                    if (e.target != e.currentTarget) return;

                    $(this).closest('li').removeClass('open');
                });

            function initSidebarScroll(){
                var $sidebarContent = $el.find('.js-sidebar-content');
                if ($el.find('.slimScrollDiv').length != 0){
                    $sidebarContent.slimscroll({
                        destroy: true
                    })
                }
                $sidebarContent.slimscroll({
                    height: window.innerHeight,
                    size: '4px'
                });
            }

            $(window).on('sn:resize', initSidebarScroll);
            initSidebarScroll();
        }
    }
});

/* ========================================================================
 * Sing Chat Sidebar
 * ========================================================================
 * todo: rewrite in a more angulary way with models and controllers. This code may change in the next release
 */

appDirectives.directive('snChatSidebar', function($rootScope){
    return {
        link: function(scope, $el){
            //.chat-sidebar-container contains all needed styles so we don't pollute body{ }
            var $chatContainer = $('body').addClass('chat-sidebar-container');
            $rootScope.toggleChatSidebarState = function(){
                $chatContainer.toggleClass('chat-sidebar-opened');
            };

            /*
             * Open chat on swipe left but first check if navigation is collapsed
             * otherwise do nothing
             */
            $(document).on('swipeLeft','.content-wrap', function(e){
                if ($chatContainer.is('.nav-collapsed')){
                    $chatContainer.addClass('chat-sidebar-opened');
                }
            })
                /*
                 * Hide chat on swipe right but first check if navigation is collapsed
                 * otherwise do nothing
                 */
                .on('swipeRight', function(e){
                    if ($chatContainer.is('.nav-collapsed.chat-sidebar-opened')){
                        $chatContainer.removeClass('chat-sidebar-opened')
                            // as there is no way to cancel swipeLeft handlers attached to
                            // .content making this hack with temporary class which will be
                            // used by snNavigation directive to check whether it is permitted to open navigation
                            // on swipeRight
                            .addClass('nav-busy').one($.support.transition.end, function () {
                                $('body').removeClass('nav-busy');
                            }).emulateTransitionEnd(300);
                    }
                });

            /**
             * Show chat view when contact clicked
             */
            $el.on('click', '.chat-sidebar-user-group > a', function(){
                var $this = $(this),
                    $target = $($this.attr('href')),
                    $targetTitle = $target.find('.title');
                $this.removeClass('active').find('.badge').remove();
                $target.addClass('open');
                $el.find('.chat-sidebar-contacts').removeClass('open');
                $el.find('.chat-sidebar-footer').addClass('open');
                $el.find('.message-list', $target).slimscroll({
                    height: $target.height() - $targetTitle.height()
                        - parseInt($targetTitle.css('margin-top'))
                        - parseInt($targetTitle.css('margin-bottom')),
                    width: '',
                    size: '4px'
                });
                return false;
            });

            /**
             * Go back to contacts view when back clicked
             */
            $el.on('click', '.chat-sidebar-chat .js-back', function(){
                var $chat = $(this).closest('.chat-sidebar-chat').removeClass('open');
                var $sidebarContacts = $('.chat-sidebar-contacts').addClass('open');
                $el.find('.chat-sidebar-footer').removeClass('open');

                return false;
            });

            $el.find('[data-sn-chat-sidebar-input]').keyup(function(e){
                if(e.keyCode != 13) return;
                var val;
                if ((val = $(this).val().trim()) == '') return;

                var $currentMessageList = $el.find('.chat-sidebar-chat.open .message-list'),
                    $message = $('<li class="message from-me">' +
                        '<span class="thumb-sm"><img class="img-circle" src="img/avatar.png" alt="..."></span>' +
                        '<div class="message-body"></div>' +
                        '</li>');
                $message.appendTo($currentMessageList).find('.message-body').text(val);
                $(this).val('');
            });

            $el.find('[data-sn-chat-sidebar-search]').keyup(function(){
                var $contacts = $('.chat-sidebar-contacts.open'),
                    $chat = $('.chat-sidebar-chat.open'),
                    val = $(this).val().trim().toUpperCase();
                if ($contacts.length){
                    $('.chat-sidebar-user-group .list-group-item').addClass('hide').filter(function(){
                        return val == '' ? true : ($(this).find('.message-sender').text().toUpperCase().indexOf(val) != -1)
                    }).removeClass('hide');
                }
                if ($chat.length){
                    $('.chat-sidebar-chat.open .message-list .message').addClass('hide').filter(function(){
                        return val == '' ? true : ($(this).find('.message-body').text().toUpperCase().indexOf(val) != -1)
                    }).removeClass('hide');
                }
            });

            function initChatSidebarScroll(){
                var $sidebarContent = $('.chat-sidebar-contacts', $el);
                if ($el.find('.slimScrollDiv').length != 0){
                    $sidebarContent.slimscroll({
                        destroy: true
                    })
                }
                $sidebarContent.slimscroll({
                    height: window.innerHeight,
                    width: '',
                    size: '4px'
                });
            }

            $(window).on('sn:resize', initChatSidebarScroll);
            initChatSidebarScroll();
        }
    }
});

/* ========================================================================
 * Sing Notifications Menu. Moved to a sidebar for small screens
 * ========================================================================
 */
appDirectives.directive('snNotificationsMenu', function($rootScope){
    return {
        link: function(scope, $el){
            /**
             * Move notifications dropdown to sidebar when/if screen is xs
             * and back when leaves xs
             */
            function moveNotificationsDropdown(){
                // todo extract selectors to scope attributes probably for more flexibility?
                $('.sidebar-status .dropdown-toggle').after($el.detach());
            }

            function moveBackNotificationsDropdown(){
                $('#notifications-dropdown-toggle').after($el.detach());
            }
            scope.app.helpers.onScreenSize('xs', moveNotificationsDropdown);
            scope.app.helpers.onScreenSize('xs', moveBackNotificationsDropdown, false);

            scope.app.helpers.isScreen('xs') && moveNotificationsDropdown();

            /**
             * Set Sidebar zindex higher than .content and .page-controls so the notifications dropdown is seen
             */
            $('.sidebar-status').on('show.bs.dropdown', function(){
                $('#sidebar').css('z-index', 2);
            }).on('hidden.bs.dropdown', function(){
                $('#sidebar').css('z-index', '');
            });
        }
    }
});

/**
 * Directives-wrappers for 3rd-party plugins & classes
 */

/* ========================================================================
 * Handle no-border input groups focus
 * ========================================================================
 */
appDirectives.directive('inputGroupNoBorder', function(){
    return {
        restrict: 'C',
        link: function (scope, el){
            $(el).find('.input-group-addon + .form-control').on('blur focus', function(e){
                $(this).parents('.input-group')[e.type=='focus' ? 'addClass' : 'removeClass']('focus');
            });
        }
    }
});

/* ========================================================================
 * Handle transparent input groups focus
 * ========================================================================
 */
appDirectives.directive('inputGroupTransparent', function(){
    return {
        restrict: 'C',
        link: function (scope, el){
            $(el).find('.input-group-addon + .form-control').on('blur focus', function(e){
                $(this).parents('.input-group')[e.type=='focus' ? 'addClass' : 'removeClass']('focus');
            });
        }
    }
});

/* ========================================================================
 * Table head check all checkboxes
 * ========================================================================
 */
appDirectives.directive('checkAll', function(){
    return {
        restrict: 'A',
        link: function (scope, $el){
            $el.on('click', function() {
                $el.closest('table').find('input[type=checkbox]')
                    .not(this).prop('checked', $(this).prop('checked'));
            });
        }
    }
});


/* ========================================================================
 * Widgster Wrapper. Triggered for all .widget's
 * ========================================================================
 */

appDirectives.directive('widget', function(){
    /**
     * Setting Widgster's body selector to theme specific
     * @type {string}
     */
    $.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';

    /*
     When widget is closed remove its parent if it is .col-*
     */
    $(document).on('close.widgster', function(e){
        var $colWrap = $(e.target).closest('.content > .row > [class*="col-"]:not(.widget-container)');

        // remove colWrap only if there are no more widgets inside
        if (!$colWrap.find('.widget').not(e.target).length){
            $colWrap.remove();
        }
    });
    return {
        restrict: 'CEA',
        link: function(scope, $el, attrs){
            if (attrs.postProcessing == 'true') return;
            $el.widgster();
        }
    }
});

/* ========================================================================
 * Ajax Load micro-plugin
 * ========================================================================
 */

appDirectives.directive('ajaxLoad', function(){
    return {
        restrict: 'A',
        link: function(scope, $el, attrs){
            $el.on('click change', function(e){
                var $this = $(this),
                    $target = $($this.data('ajax-target'));
                if ($target.length > 0 ){
                    e = $.Event('ajax-load:start', {originalEvent: e});
                    $this.trigger(e);

                    !e.isDefaultPrevented() && $target.load($this.data('ajax-load'), function(){
                        $this.trigger('ajax-load:end');
                    });
                }
                return false;
            });

            /**
             * Change to loading state if loading text present
             */
            if (attrs.loadingText){
                $el.on('ajax-load:start', function (e) {
                    $el.button('loading');
                });
                $el.on('ajax-load:end', function () {
                    $el.button('reset');
                });
            }

            $(document).on('click', '[data-toggle^=button]', function (e) {
                return $(e.target).find('input').data('ajax-trigger') != 'change';
            });
        }
    }
});


/**
 * Flatlogic comment:
 * Here goes an extension to jQuery Passthrough(http://angular-ui.github.io/ui-utils/) plugin.
 * Sing extension allows to dynamically load library used by ui-jq directive.
 * So for example in this case:
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 *
 * datepicker library will be loaded dynamically and plugin initialization will take place only after datepicker exists
 * in jQuery scope.
 * There is a global value - uiJqDependencies which is defined in app.js. It's a map of jquery plugin name and it's dependencies.
 * It's also possible to pass dependencies via ui-preload attribute. See mapael example in index.html
 */
/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq',[]).
    value('uiJqConfig',{}).
    value('uiJqDependencies',{}).
    directive('uiJq', ['uiJqConfig', '$timeout', 'uiJqDependencies', 'scriptLoader',
        function uiJqInjectingFunction(uiJqConfig, $timeout, uiJqDependencies, scriptLoader) {

        return {
            restrict: 'A',
            compile: function uiJqCompilingFunction(tElm, tAttrs) {

                if (!(angular.isFunction(tElm[tAttrs.uiJq]) || angular.isArray(uiJqDependencies[tAttrs.uiJq]))) {
                    throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
                }
                var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

                return function uiJqLinkingFunction(scope, elm, attrs) {

                    // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                    if (attrs.ngModel && elm.is('select,input,textarea')) {
                        elm.bind('change', function() {
                            elm.trigger('input');
                        });
                    }

                    // Call jQuery method and pass relevant options
                    function callPlugin() {
                        $timeout(function() {
                            var linkOptions = [];

                            // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
                            if (attrs.uiOptions) {
                                linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
                                if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
                                    linkOptions[0] = angular.extend({}, options, linkOptions[0]);
                                }
                            } else if (options) {
                                linkOptions = [options];
                            }
                            elm[attrs.uiJq].apply(elm, linkOptions);
                        }, 0, false);
                    }

                    // If ui-refresh is used, re-fire the the method upon every change
                    if (attrs.uiRefresh) {
                        scope.$watch(attrs.uiRefresh, function() {
                            callPlugin();
                        });
                    }

                    // Sing addition. If there jQuery functions is defined, then just calling plugin
                    // if there is no jQuery function, then loading it first from uiJqDependencies object
                    // defined in app.js
                    var scriptsFromOptions = scope.$eval(tAttrs.uiPreload) || [];
                    if (angular.isFunction(tElm[tAttrs.uiJq])){
                        if (scriptsFromOptions.length > 0){
                            scriptLoader.loadScripts(scriptsFromOptions)
                                .then(callPlugin);
                        } else {
                            callPlugin();
                        }
                    } else {
                        var scriptsToLoad = uiJqDependencies[tAttrs.uiJq].concat(scriptsFromOptions);
                        scriptLoader.loadScripts(scriptsToLoad)
                            .then(callPlugin);
                    }
                };
            }
        };
    }]);