var nhLazy = {
    init: function(){
        // get device
        var dataInit = {};
        try {
            dataInit = JSON.parse($('input#nh-data-init').val());
        } catch (e) {
            dataInit = {};
        }
        var lazyDevice = typeof(dataInit.device) != _UNDEFINED && dataInit.device == 1 ? 'mobile' : 'desktop';
        var lazyNotDevice = typeof(dataInit.device) != _UNDEFINED && dataInit.device == 1 ? 'desktop' : 'mobile';

        var lazyOptions = {
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            visibleOnly: true
        };

        var timeDelay = 3000;

        // lazy image
        if($('img[nh-lazy="image"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').length > 0){
            $('img[nh-lazy="image"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').Lazy(lazyOptions);
        }

        // lazy background
        if($('[nh-lazy="image-background"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').length > 0){
            $('[nh-lazy="image-background"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').Lazy(lazyOptions);
        }

        // lazy iframe
        if($('iframe[nh-lazy="iframe"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').length > 0){
            $('iframe[nh-lazy="iframe"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').Lazy(lazyOptions);
        }

        // lazy video
        if($('video[nh-lazy="video"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').length > 0){
            $('video[nh-lazy="video"][data-src]:not([delay="'+ lazyDevice +'"], [delay="all"])').Lazy(lazyOptions);
        }

        // lazy image delay
        if($('img[nh-lazy="image"][data-src][delay="'+ lazyDevice +'"]').length > 0 || $('img[nh-lazy="image"][data-src][delay="all"]').length > 0){
            $('img[nh-lazy="image"][data-src][delay="'+ lazyDevice +'"], img[nh-lazy="image"][data-src][delay="all"]').Lazy({
                delay: timeDelay
            });
        }

        // lazy background image delay
        if($('[nh-lazy="image-background"][data-src][delay="'+ lazyDevice +'"]').length > 0 || $('[nh-lazy="image-background"][data-src][delay="all"]').length > 0){
            $('[nh-lazy="image-background"][data-src][delay="'+ lazyDevice +'"], [nh-lazy="image-background"][data-src][delay="all"]').Lazy({
                delay: timeDelay
            });
        }

        // lazy iframe delay
        if($('iframe[nh-lazy="iframe"][data-src][delay="'+ lazyDevice +'"]').length > 0 || $('iframe[nh-lazy="iframe"][data-src][delay="all"]').length > 0){
            $('iframe[nh-lazy="iframe"][data-src][delay="'+ lazyDevice +'"], iframe[nh-lazy="iframe"][data-src][delay="all"]').Lazy({
                delay: timeDelay
            });
        }

        // lazy video delay
        if($('video[nh-lazy="video"][data-src][delay="'+ lazyDevice +'"]').length > 0 || $('video[nh-lazy="video"][data-src][delay="all"]').length > 0){
            $('video[nh-lazy="video"][data-src][delay="'+ lazyDevice +'"], video[nh-lazy="video"][data-src][delay="all"]').Lazy({
                delay: timeDelay
            });
        }

        // lazy script (script only load delay)
        if($('script[nh-lazy="script"][data-src]').length > 0){
            $('script[nh-lazy="script"][data-src]').Lazy({
                delay: timeDelay
            });
        }
    }
}

$(document).ready(function() {
    nhLazy.init();
});