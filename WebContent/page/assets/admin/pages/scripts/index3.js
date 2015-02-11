var Index = function() {

    var dashboardMainChart = null;

    return {

        //main function
        init: function() {
            Metronic.addResizeHandler(function() {
                jQuery('.vmaps').each(function() {
                    var map = jQuery(this);
                    map.width(map.parent().width());
                });
            });

            Index.initCharts();
            Index.initMiniCharts();
            Index.initJQVMAP();
        },

        initJQVMAP: function() {
            if (!jQuery().vectorMap) {
                return;
            }

            var showMap = function(name) {
                jQuery('.vmaps').hide();
                jQuery('#vmap_' + name).show();
            }

            var setMap = function(name) {
                var data = {
                    map: 'world_en',
                    backgroundColor: null,
                    borderColor: '#333333',
                    borderOpacity: 0.5,
                    borderWidth: 1,
                    color: '#c6c6c6',
                    enableZoom: true,
                    hoverColor: '#c9dfaf',
                    hoverOpacity: null,
                    values: sample_data,
                    normalizeFunction: 'linear',
                    scaleColors: ['#b6da93', '#909cae'],
                    selectedColor: '#c9dfaf',
                    selectedRegion: null,
                    showTooltip: true,
                    onLabelShow: function(event, label, code) {

                    },
                    onRegionOver: function(event, code) {
                        if (code == 'ca') {
                            event.preventDefault();
                        }
                    },
                    onRegionClick: function(element, code, region) {
                        var message = '您点击的城市【 ' + region + '】的代码为: ' + code.toUpperCase();
                         alert(message);
                    }
                };

                data.map = name + '_en';
                var map = jQuery('#vmap_' + name);
                if (!map) {
                    return;
                }
                map.width(map.parent().parent().width());
                map.show();
                map.vectorMap(data);
                map.hide();
            }

            setMap("world");
            setMap("usa");
            setMap("asia");
            setMap("china");
            setMap("europe");
            setMap("russia");
            setMap("germany");
            showMap("asia");

            jQuery('#regional_stat_world').click(function() {
                showMap("world");
            });

            jQuery('#regional_stat_usa').click(function() {
                showMap("usa");
            });

            jQuery('#regional_stat_europe').click(function() {
                showMap("europe");
            });
            jQuery('#regional_stat_russia').click(function() {
                showMap("russia");
            });
            jQuery('#regional_stat_germany').click(function() {
                showMap("germany");
            });
            jQuery('#regional_stat_asia').click(function() {
                showMap("asia");
            });
            jQuery('#regional_stat_china').click(function() {
                showMap("china");
            });
            $('#region_statistics_loading').hide();
            $('#region_statistics_content').show();
        },

        initCharts: function() {
            if (Morris.EventEmitter) {
                // Use Morris.Area instead of Morris.Line
                dashboardMainChart = Morris.Area({
                    element: 'sales_statistics',
                    padding: 0,
                    behaveLikeLine: false,
                    gridEnabled: false,
                    gridLineColor: false,
                    axes: false,
                    fillOpacity: 1,
                    data: [{
                        period: '2013 Q1',
                        sales: 1800,
                        profit: 300
                    }, {
                        period: '2013 Q2',
                        sales: 2200,
                        profit: 600
                    }, {
                        period: '2013 Q3',
                        sales: 2800,
                        profit: 800
                    }, {
                        period: '2013 Q4',
                        sales: 1900,
                        profit: 500
                    }, {
                        period: '2014 Q1',
                        sales: 1400,
                        profit: 400
                    }, {
                        period: '2014 Q2',
                        sales: 1100,
                        profit: 600
                    }, {
                        period: '2014 Q3',
                        sales: 1600,
                        profit: 500
                    }, {
                        period: '2014 Q4',
                        sales: 1200,
                        profit: 400
                    }, {
                        period: '2015 Q1',
                        sales: 1550,
                        profit: 800
                    }],
                    lineColors: ['#399a8c', '#92e9dc'],
                    xkey: 'period',
                    ykeys: ['sales', 'profit'],
                    labels: ['销售额', '利润'],
                    pointSize: 0,
                    lineWidth: 0,
                    hideHover: 'auto',
                    resize: true
                });

            }
        },

        redrawCharts: function() {
            dashboardMainChart.resizeHandler();
        },

        initMiniCharts: function() {

            // IE8 Fix: function.bind polyfill
            if (Metronic.isIE8() && !Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== "function") {
                        // closest thing possible to the ECMAScript 5 internal IsCallable function
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }

                    var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function() {},
                        fBound = function() {
                            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };

                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }

            $("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#F36A5B',
                negBarColor: '#e02222'
            });

            $("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#5C9BD1',
                negBarColor: '#e02222'
            });
        }

    };

}();