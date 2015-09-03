app.controller('MainCtrl', function($scope) {

});


app.controller('chartJsLineCtrl', function($scope) {

    // Chart.js Data
    $scope.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Network Usage',
            fillColor: 'rgba(26,188,156,0.5)',
            strokeColor: 'rgba(26,188,156,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: 'CPU Load',
            fillColor: 'rgba(31,123,182,0.5)',
            strokeColor: 'rgba(31,123,182,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        // Function - on animation progress
        onAnimationProgress: function() {},

        // Function - on animation complete
        onAnimationComplete: function() {},

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

});


app.controller('chartJsBarCtrl', function($scope) {

    // Chart.js Data
    $scope.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Network Usage',
            fillColor: 'rgba(26,188,156,0.5)',
            strokeColor: 'rgba(255,255,255,0.8)',
            highlightFill: 'rgba(26,188,156,1)',
            highlightStroke: 'rgba(255,255,255,0.8)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: 'CPU Load',
            fillColor: 'rgba(31,123,182,0.5)',
            strokeColor: 'rgba(255,255,255,0.8)',
            highlightFill: 'rgba(31,123,182,1)',
            highlightStroke: 'rgba(255,255,255,0.8)',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };


});

app.controller('chartJsDoughnutCtrl', function($scope) {

    // Chart.js Data
    $scope.data = [{
        value: 300,
        color: "#1ABC9C",
        highlight: "#1ABC9C",
        label: "Chrome"
    }, {
        value: 50,
        color: "#556B8D",
        highlight: "#556B8D",
        label: "IE"
    }, {
        value: 100,
        color: "#EDCE8C",
        highlight: "#EDCE8C",
        label: "Safari"
    }, {
        value: 40,
        color: "#CED1D3",
        highlight: "#1F7BB6",
        label: "Other"
    }, {
        value: 120,
        color: "#1F7BB6",
        highlight: "#1F7BB6",
        label: "Firefox"
    }];

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: true,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };


});

app.controller('polarAreaCtrl', function($scope) {

    $scope.data = [{
        value: 300,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Red'
    }, {
        value: 50,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Green'
    }, {
        value: 100,
        color: '#FDB45C',
        highlight: '#FFC870',
        label: 'Yellow'
    }, {
        value: 40,
        color: '#949FB1',
        highlight: '#A8B3C5',
        label: 'Grey'
    }, {
        value: 120,
        color: '#4D5360',
        highlight: '#616774',
        label: 'Dark Grey'
    }];

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Show a backdrop to the scale label
        scaleShowLabelBackdrop: true,

        //String - The colour of the label backdrop
        scaleBackdropColor: 'rgba(255,255,255,0.75)',

        // Boolean - Whether the scale should begin at zero
        scaleBeginAtZero: true,

        //Number - The backdrop padding above & below the label in pixels
        scaleBackdropPaddingY: 2,

        //Number - The backdrop padding to the side of the label in pixels
        scaleBackdropPaddingX: 2,

        //Boolean - Show line for each value in the scale
        scaleShowLine: true,

        //Boolean - Stroke a line around each segment in the chart
        segmentShowStroke: true,

        //String - The colour of the stroke on each segement.
        segmentStrokeColor: '#fff',

        //Number - The width of the stroke value in pixels
        segmentStrokeWidth: 2,

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect.
        animationEasing: 'easeOutBounce',

        //Boolean - Whether to animate the rotation of the chart
        animateRotate: true,

        //Boolean - Whether to animate scaling the chart from the centre
        animateScale: true,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
});

app.controller('gaugeCtrl', function($scope, $timeout) {
    $scope.animationTime = 10;
    $scope.value = 3200;
    $scope.maxValue = 5000;
    $scope.gaugeType = 'gauge';

    $scope.gaugeOptions = {
        lines: 12,
        // The number of lines to draw
        angle: 0,
        // The length of each line
        lineWidth: 0.4,
        // The line thickness
        pointer: {
            length: 0.75,
            // The radius of the inner circle
            strokeWidth: 0.042,
            // The rotation offset
            color: '#1D212A' // Fill color
        },
        limitMax: 'false',
        // If true, the pointer will not go past the end of the gauge
        colorStart: '#1ABC9C',
        // Colors
        colorStop: '#1ABC9C',
        // just experiment with them
        strokeColor: '#F0F3F3',
        // to see which ones work best for you
        generateGradient: true
    };

    $scope.donutGaugeOptions = {
        lines: 12,
        // The number of lines to draw
        angle: 0.15,
        // The length of each line
        lineWidth: 0.044,
        // The line thickness
        pointer: {
            length: 0.09,
            // The radius of the inner circle
            strokeWidth: 0.0035,
            // The rotation offset
            color: '#000000' // Fill color
        },
        limitMax: 'false',
        // If true, the pointer will not go past the end of the gauge
        colorStart: '#6FADCF',
        // Colors
        colorStop: '#8FC0DA',
        // just experiment with them
        strokeColor: '#E0E0E0',
        // to see which ones work best for you
        generateGradient: true
    };
});

app.controller('modalCtrl', function($scope, $modal) {

    $scope.open1 = function() {

        var modalInstance = $modal.open({
            templateUrl: 'views/modal_1.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open2 = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/modal_2.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open3 = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/modal_3.html',
            controller: ModalInstanceCtrl
        });
    };

});

function ModalInstanceCtrl($scope, $modalInstance) {

    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};


app.controller('AddDynamicNotificationsExampleCtrl', function($scope, $modal) {

    /**
     * Initialize index
     * @type {number}
     */
    var index = 0;

    /**
     * Boolean to show error if new notification is invalid
     * @type {boolean}
     */
    $scope.invalidNotification = false;

    /**
     * Placeholder for notifications
     *
     * We use a hash with auto incrementing key
     * so we can use "track by" in ng-repeat
     *
     * @type
     */
    $scope.notifications = {};

    /**
     * Add a notification
     *
     * @param notification
     */
    $scope.add = function(notification) {

        var i;

        if (!notification) {
            $scope.invalidNotification = true;
            return;
        }

        i = index++;
        $scope.invalidNotification = false;
        $scope.notifications[i] = notification;
    };

});


/**
 * nestableCtrl - Controller for nestable list
 */
app.controller('nestableCtrl', function($scope) {

    $scope.list = [{
        "id": 1,
        "title": "node1",
        "items": []
    }, {
        "id": 2,
        "title": "node2",
        "items": [{
            "id": 21,
            "title": "node2.1",
            "items": [{
                "id": 211,
                "title": "node2.1.1",
                "items": []
            }, {
                "id": 212,
                "title": "node2.1.2",
                "items": []
            }],
        }, {
            "id": 22,
            "title": "node2.2",
            "items": []
        }],
    }, {
        "id": 3,
        "title": "node3",
        "items": []
    }, {
        "id": 4,
        "title": "node4",
        "items": []
    }];

    $scope.selectedItem = {};

    $scope.options = {};

    $scope.remove = function(scope) {
        scope.remove();
    };

    $scope.toggle = function(scope) {
        scope.toggle();
    };

    $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.items.push({
            id: nodeData.id * 10 + nodeData.items.length,
            title: nodeData.title + '.' + (nodeData.items.length + 1),
            items: []
        });
    };
});


/**
 * GoogleMaps - Controller for data google maps
 */
app.controller('GoogleMaps', function($scope) {

    $scope.mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(40.6700, -73.9400),
        // Style for Google Maps
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.mapOptions2 = {
        zoom: 10,
        center: new google.maps.LatLng(40.6700, -73.9400),
        // Style for Google Maps
        styles: [{
            "featureType": "administrative",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "color": "#84afa3"
            }, {
                "lightness": 52
            }]
        }, {
            "stylers": [{
                "saturation": -17
            }, {
                "gamma": 0.36
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#3f518c"
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.mapOptions3 = {
        center: new google.maps.LatLng(40.6700, -73.9400),
        zoom: 10,
        // Style for Google Maps
        MapTypeId: google.maps.MapTypeId.SATELLITE,
        styles: [{
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "weight": 1
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "weight": 0.8
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#000000"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.mapOptions4 = {
        zoom: 10,
        center: new google.maps.LatLng(40.6700, -73.9400),
        // Style for Google Maps
        styles: [{
            "stylers": [{
                "hue": "#2c3e50"
            }, {
                "saturation": 250
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 50
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
});


app.controller('validationCtrl', function($scope) {
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }

    };

});

app.controller('calCtrl', function($scope) {
    $scope.options = {
        weekOffset: 1,
        daysOfTheWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
});



app.controller('calCtrl', function($scope) {

    $scope.chart = null;
    $scope.columns = [];
    $scope.types = {};
    $scope.axis = {};
    $scope.axes = {};
    $scope.xValues = null;
    $scope.xTick = null;
    $scope.names = null;
    $scope.colors = null;
    $scope.grid = null;
    $scope.legend = null;
    $scope.tooltip = null;
    $scope.chartSize = null;
    $scope.colors = null;
    $scope.jsonKeys = null;

    this.showGraph = function() {
        var config = {};
        config.bindto = "#" + $scope.bindto;
        config.data = {}

        if ($scope.chartData && $scope.chartColumns) {
            $scope.$watchCollection('chartData', function() {
                loadChartData();
            });
            $scope.jsonKeys = {};
            $scope.jsonKeys.value = [];
            angular.forEach($scope.chartColumns, function(column) {
                $scope.jsonKeys.value.push(column.id);
                addColumnProperties(column.id, column.type, column.name, column.color);
            });
            if ($scope.chartX) {
                $scope.jsonKeys.x = $scope.chartX.id;
            }
            config.data.keys = $scope.jsonKeys;
            config.data.json = $scope.chartData;
        }

        if ($scope.xValues) {
            config.data.x = $scope.xValues;
        }
        if ($scope.columns) {
            config.data.columns = $scope.columns;
        }
        config.data.types = $scope.types;
        config.data.axes = $scope.axes;
        if ($scope.names) {
            config.data.names = $scope.names;
        }
        if ($scope.colors) {
            config.data.colors = $scope.colors;
        }
        if ($scope.showLabels && $scope.showLabels === "true") {
            config.data.labels = true;
        }
        if ($scope.showSubchart && $scope.showSubchart === "true") {
            config.subchart = {
                "show": true
            };
        }
        if ($scope.enableZoom && $scope.enableZoom === "true") {
            config.zoom = {
                "enabled": true
            };
        }
        config.axis = $scope.axis;
        if ($scope.xTick) {
            config.axis.x.tick = $scope.xTick;
        }
        if ($scope.grid != null) {
            config.grid = $scope.grid;
        }
        if ($scope.legend != null) {
            config.legend = $scope.legend;
        }
        if ($scope.tooltip != null) {
            config.tooltip = $scope.tooltip;
        }
        if ($scope.chartSize != null) {
            config.size = $scope.chartSize;
        }
        if ($scope.colors != null) {
            config.color = {
                "pattern": $scope.colors
            };
        }
        $scope.chart = c3.generate(config);
    };

    this.addColumn = function(column, columnType, columnName, columnColor) {
        $scope.columns.push(column);
        addColumnProperties(column[0], columnType, columnName, columnColor);
    };

    this.addYAxis = function(yAxis) {
        $scope.axes = yAxis;
        if (!$scope.axis.y2) {
            $scope.axis.y2 = {
                "show": true
            };
        }
    };

    this.addXAxisValues = function(xValues) {
        $scope.xValues = xValues;
    };

    this.addAxisProperties = function(id, axis) {
        $scope.axis[id] = axis;
    };

    this.addXTick = function(tick) {
        $scope.xTick = tick;
    };

    this.rotateAxis = function() {
        $scope.axis.rotated = true;
    };

    this.addGrid = function(axis) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if ($scope.grid[axis] == null) {
            $scope.grid[axis] = {};
        }
        $scope.grid[axis].show = true;
    };

    this.addGridLine = function(axis, value, text) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if (axis === "x") {
            if ($scope.grid.x == undefined) {
                $scope.grid.x = {};
            }
            if ($scope.grid.x.lines == undefined) {
                $scope.grid.x.lines = [];
            }
        } else {
            if ($scope.grid.y == undefined) {
                $scope.grid.y = {};
            }
            if ($scope.grid.y.lines == undefined) {
                $scope.grid.y.lines = [];
            }

        }
        if (axis === "y2") {
            $scope.grid.y.lines.push({
                "value": value,
                "text": text,
                "axis": "y2"
            });
        } else {
            $scope.grid[axis].lines.push({
                "value": value,
                "text": text
            })
        }
    };

    this.addLegend = function(legend) {
        $scope.legend = legend;
    };

    this.addTooltip = function(tooltip) {
        $scope.tooltip = tooltip;
    };

    this.addSize = function(chartSize) {
        $scope.chartSize = chartSize;
    };

    this.addColors = function(colors) {
        $scope.colors = colors;
    };

    function addColumnProperties(id, columnType, columnName, columnColor) {
        if (columnType !== undefined) {
            $scope.types[id] = columnType;
        }
        if (columnName !== undefined) {
            if ($scope.names === null) {
                $scope.names = {};
            }
            $scope.names[id] = columnName;
        }
        if (columnColor !== undefined) {
            if ($scope.colors === null) {
                $scope.colors = {};
            }
            $scope.colors[id] = columnColor;
        }
    }

    function loadChartData() {
        var data = {};
        data.keys = $scope.jsonKeys;
        data.json = $scope.chartData;

        $scope.chart.load(data);
    }
});


app.controller('GraphCtrl', function($scope) {

    $scope.datapoints = [{
        "x": 10,
        "top-1": 10,
        "top-2": 15
    }, {
        "x": 20,
        "top-1": 100,
        "top-2": 35
    }, {
        "x": 30,
        "top-1": 15,
        "top-2": 75
    }, {
        "x": 40,
        "top-1": 50,
        "top-2": 45
    }];
    $scope.datacolumns = [{
        "id": "top-1",
        "type": "line"
    }, {
        "id": "top-2",
        "type": "spline"
    }];
    $scope.datax = {
        "id": "x"
    };

    $scope.datapoints2 = [{
        "x": 10,
        "top-1": 10,
        "top-2": 15
    }, {
        "x": 20,
        "top-1": 100,
        "top-2": 35
    }, {
        "x": 30,
        "top-1": 15,
        "top-2": 75
    }, {
        "x": 40,
        "top-1": 50,
        "top-2": 45
    }];
    $scope.datacolumns2 = [{
        "id": "top-1",
        "type": "line",
        "name": "Top one",
        "color": "green"
    }, {
        "id": "top-2",
        "type": "spline",
        "name": "Top two",
        "color": "blue"
    }];
    $scope.datax2 = {
        "id": "x"
    };
});


app.controller('BarChartCtrl', function($scope) {
    $scope.chart_options = {
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B']
    };
});

app.controller('LineChartCtrl', function($scope) {
    $scope.chart_options = {
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B']
    };
});

app.controller('DonutChartCtrl', function($scope) {
    $scope.chart_options = {
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }]
    };
});


/**
 * sparklineCtrl - Controller for sparkline chart
 *
 */
app.controller('sparklineCtrl', function($scope) {

    var inlineData = [2, 4, 4, 6, 9, 12, 15, 15, 18, 22, 14, 23, 24, 25, 29, 29, 25, 26, 23, 22, 18, 15, 14, 22, 23, 12, 8, 4, 2];
    var inlineOptions = {
        type: 'line',
        lineColor: '#1F7BB6',
        fillColor: '#1ABC9C',
        height: '12em',
        width: '15em'
    };

    var barSmallData = [5, 6, 7, 2, 0, 4, 2, 4, 5, -1, 7, 2, 4, 12, 14, 4, -1, 2, 14, 12, 7];
    var barSmallOptions = {
        type: 'bar',
        barColor: '#1ABC9C',
        negBarColor: '#1F7BB6',
        height: '12em',
        width: '15em'
    };


    var pieSmallData = [5, 3, 4, 1];
    var pieSmallOptions = {
        type: 'pie',
        sliceColors: ['#1ABC9C', '#1F7BB6', '#556B8D', '#EDCE8C'],
        height: '12em',
        width: '15em'
    };

    var longLineData = [22, 24, 55, 12, 34, 66, 23, 45, 77, 43, 34, 25, 88, 44, 26, 22, 14, 32, 42, 56, 27, 33, 47, 79, 34, 67, 43, 84, 19, 22];
    var longLineOptions = {
        type: 'line',
        lineColor: '#1ABC9C',
        fillColor: '#ffffff',
        height: '12em',
        width: '15em'
    };
    this.inlineData = inlineData;
    this.inlineOptions = inlineOptions;
    this.barSmallData = barSmallData;
    this.barSmallOptions = barSmallOptions;
    this.pieSmallData = pieSmallData;
    this.pieSmallOptions = pieSmallOptions;
    this.longLineData = longLineData;
    this.longLineOptions = longLineOptions;


});


function wizardCtrl($scope) {
    $scope.user = {};
    $scope.processForm = function() {
        alert('information completed');
    };
}


