var RevosliderInit = function () {

    return {
        initRevoSlider: function () {
            var height = 580; // minimal height for medium resolution

            // smart height detection for all major screens
            if (Layout.getViewPort().width > 1600) {
                height = $(window).height() - $('.subscribe').outerHeight();  // full height for high resolution
            } else if (Layout.getViewPort().height > height) {
                height = Layout.getViewPort().height;
            }

            jQuery('.banner').revolution({
                delay: 1000,
                startwidth: 1170,
                startheight: height,
                navigationArrows: "none",
                fullWidth: "on",
                fullScreen: "off",
                touchenabled:"on",                      // Enable Swipe Function : on/off
                onHoverStop: "on",                      // Stop Banner Timet at Hover on Slide on/off
                fullScreenOffsetContainer: ""
            });
        }
    };

}();