
var mr = (function ($, window, document){
    "use strict";

    var mr         = {},
        components = {documentReady: [], windowLoad: []};


    $(document).ready(documentReady);
    $(window).load(windowLoad);

    function documentReady(context){
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach(function(component){
            component(context);
        });
    }

    function windowLoad(context){
        
        context = typeof context == "object" ? $ : context;
        components.windowLoad.forEach(function(component){
           component(context);
        });
    }

    mr.setContext = function (contextSelector){
        var context = $;
        if(typeof contextSelector !== typeof undefined){
            return function(selector){
                return $(contextSelector).find(selector);
            };
        }
        return context;
    };

    mr.components    = components;
    mr.documentReady = documentReady;
    mr.windowLoad    = windowLoad;

    return mr;
}(jQuery, window, document));


//////////////// Utility Functions
mr = (function (mr, $, window, document){
    "use strict";
    mr.util = {};

    mr.util.requestAnimationFrame    = window.requestAnimationFrame || 
                                       window.mozRequestAnimationFrame || 
                                       window.webkitRequestAnimationFrame ||
                                       window.msRequestAnimationFrame;

    mr.util.documentReady = function($){
        var today = new Date();
        var year = today.getFullYear();
        $('.update-year').text(year);
    };

    mr.util.getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };


    mr.util.capitaliseFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    mr.util.slugify = function(text){
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    
    // Set data-src attribute of element from src to be restored later
    mr.util.idleSrc = function(context, selector){
        
            selector  = (typeof selector !== typeof undefined) ? selector : '';
            var elems = context.is(selector+'[src]') ? context : context.find(selector+'[src]');

        elems.each(function(index, elem){
            elem           = $(elem);
            var currentSrc = elem.attr('src'),
                dataSrc    = elem.attr('data-src');

            // If there is no data-src, save current source to it
            if(typeof dataSrc === typeof undefined){
                elem.attr('data-src', currentSrc);
            }

            // Clear the src attribute
            elem.attr('src', '');    
            
        });
    };

    // Set src attribute of element from its data-src where it was temporarily stored earlier
    mr.util.activateIdleSrc = function(context, selector){
        
        selector     = (typeof selector !== typeof undefined) ? selector : '';
        var elems    = context.is(selector+'[src]') ? context : context.find(selector+'[src]');

        elems.each(function(index, elem){
            elem = $(elem);
            var dataSrc    = elem.attr('data-src');

            // If there is no data-src, save current source to it
            if(typeof dataSrc !== typeof undefined){
                elem.attr('src', dataSrc);
            }
        });
    };

    mr.util.pauseVideo = function(context){
        var elems = context.is('video') ? context : context.find('video');

        elems.each(function(index, video){
            var playingVideo = $(video).get(0);
            playingVideo.pause();
        });
    };

    mr.components.documentReady.push(mr.util.documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Scroll Functions
mr = (function (mr, $, window, document){
    "use strict";

    mr.scroll           = {};
    mr.scroll.listeners = [];
    mr.scroll.y         = 0;
    mr.scroll.x         = 0;

    var documentReady = function($){
        
        //////////////// Capture Scroll Event and fire scroll function
        
        addEventListener('scroll', function(evt) {
            mr.util.requestAnimationFrame.call(window, function(){
                mr.scroll.update(evt)
            });
        }, false);
        
    };

    mr.scroll.update = function(event){
    
        mr.scroll.y = window.pageYOffset;
        mr.scroll.x = window.pageXOffset;
 
        // Loop through all mr scroll listeners
        for (var i = 0, l = mr.scroll.listeners.length; i < l; i++) {
           mr.scroll.listeners[i](event);
        }
    };

    mr.scroll.documentReady = documentReady;

    mr.components.documentReady.push(documentReady);

    return mr;

}(mr, jQuery, window, document));


//////////////// Backgrounds
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        
        //////////////// Append .background-image-holder <img>'s as CSS backgrounds

	    $('.background-image-holder').each(function() {
	        var imgSrc = $(this).children('img').attr('src');
	        $(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity','1');
	    });
    };

    mr.backgrounds = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Cookies
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.cookies = {

        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
                var sExpires = "";
                if (vEnd) {
                  switch (vEnd.constructor) {
                    case Number:
                      sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                      break;
                    case String:
                      sExpires = "; expires=" + vEnd;
                      break;
                    case Date:
                      sExpires = "; expires=" + vEnd.toUTCString();
                      break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    return mr;

}(mr, jQuery, window, document));

//////////////// Forms
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.forms = {};

    var documentReady = function($){
        
        //////////////// Checkbox Inputs

        $('.input-checkbox').on('click', function() {
            var checkbox = $(this);
            checkbox.toggleClass('checked');
            
            var input = checkbox.find('input');
            if (input.prop('checked') === false) {
                input.prop('checked', true);
            } else {
                input.prop('checked', false);
            }
            return false;
        });

        //////////////// Radio Buttons

        $('.input-radio').on('click', function() {
            var radio = $(this);
            radio.closest('form').find('.input-radio').removeClass('checked');
            radio.addClass('checked').find('input').prop('checked', true);
            return false;
        });

        //////////////// File Uploads

        $('.input-file .btn').on('click',function(){
            $(this).siblings('input').trigger('click');
            return false;
        });
        
        //////////////// Handle Form Submit

        $('form.form-email, form[action*="list-manage.com"], form[action*="createsend.com"]').attr('novalidate', true).unbind('submit').on('submit', mr.forms.submit);

        //////////////// Handle Form Submit
        $(document).on('change, input, paste, keyup', '.attempted-submit .field-error', function(){
            $(this).removeClass('field-error');
        });

    };

    mr.forms.documentReady = documentReady;
    
    mr.forms.submit = function(e){
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        var body          = $('body'),
            thisForm      = $(e.target).closest('form'),
            formAction    = typeof thisForm.attr('action') !== typeof undefined ? thisForm.attr('action') : "",
            submitButton  = thisForm.find('button[type="submit"], input[type="submit"]'),
            error         = 0,
            originalError = thisForm.attr('original-error'),
            successRedirect, formError, formSuccess, errorText, successText;

        body.find('.form-error, .form-success').remove();
        submitButton.attr('data-text', submitButton.text());
        errorText = thisForm.attr('data-error') ? thisForm.attr('data-error') : "Please fill all fields correctly";
        successText = thisForm.attr('data-success') ? thisForm.attr('data-success') : "Thanks, we'll be in touch shortly";
        body.append('<div class="form-error" style="display: none;">' + errorText + '</div>');
        body.append('<div class="form-success" style="display: none;">' + successText + '</div>');
        formError = body.find('.form-error');
        formSuccess = body.find('.form-success');
        thisForm.addClass('attempted-submit');

        // Do this if the form is intended to be submitted to MailChimp or Campaign Monitor
        if (formAction.indexOf('createsend.com') !== -1 || formAction.indexOf('list-manage.com') !== -1 ) {

            console.log('Mail list form signup detected.');
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.html(originalError);
            }
            
            // validateFields returns 1 on error;
            if (mr.forms.validateFields(thisForm) !== 1) {
               
                thisForm.removeClass('attempted-submit');

                // Hide the error if one was shown
                formError.fadeOut(200);
                // Create a new loading spinner in the submit button.
                submitButton.addClass('btn--loading');
                
                try{
                    $.ajax({
                        url: thisForm.attr('action'),
                        crossDomain: true,
                        data: thisForm.serialize(),
                        method: "GET",
                        cache: false,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function(data){
                            // Request was a success, what was the response?

                            if (data.result !== "success" && data.Status !== 200) {
                                
                                // Got an error from Mail Chimp or Campaign Monitor

                                // Keep the current error text in a data attribute on the form
                                formError.attr('original-error', formError.text());
                                // Show the error with the returned error text.
                                formError.html(data.msg).stop(true).fadeIn(1000);
                                formSuccess.stop(true).fadeOut(1000);

                                submitButton.removeClass('btn--loading');
                            } else {
                                
                                // Got success from Mail Chimp or Campaign Monitor
                                
                                submitButton.removeClass('btn--loading');

                                successRedirect = thisForm.attr('data-success-redirect');
                                // For some browsers, if empty `successRedirect` is undefined; for others,
                                // `successRedirect` is false.  Check for both.
                                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                    window.location = successRedirect;
                                }else{
                                    mr.forms.resetForm(thisForm);
                                    mr.forms.showFormSuccess(formSuccess, formError, 1000, 5000, 500);
                                }
                            }
                        }
                    });
                }catch(err){
                    // Keep the current error text in a data attribute on the form
                    formError.attr('original-error', formError.text());
                    // Show the error with the returned error text.
                    formError.html(err.message);
                    mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500);

                    submitButton.removeClass('btn--loading');
                }
            

                
            } else {
                // There was a validation error - show the default form error message
                mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500);
            }
        } else {
            // If no MailChimp or Campaign Monitor form was detected then this is treated as an email form instead.
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.text(originalError);
            }

            error = mr.forms.validateFields(thisForm);

            if (error === 1) {
                mr.forms.showFormError(formSuccess, formError, 1000, 5000, 500);
            } else {

                thisForm.removeClass('attempted-submit');

                // Hide the error if one was shown
                formError.fadeOut(200);
                
                // Create a new loading spinner in the submit button.
                submitButton.addClass('btn--loading');

                jQuery.ajax({
                    type: "POST",
                    url: "mail/mail.php",
                    data: thisForm.serialize()+"&url="+window.location.href,
                    success: function(response) {
                        // Swiftmailer always sends back a number representing number of emails sent.
                        // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.

                        submitButton.removeClass('btn--loading');

                        if ($.isNumeric(response)) {
                            if (parseInt(response,10) > 0) {
                                // For some browsers, if empty 'successRedirect' is undefined; for others,
                                // 'successRedirect' is false.  Check for both.
                                successRedirect = thisForm.attr('data-success-redirect');
                                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                    window.location = successRedirect;
                                }

                                mr.forms.resetForm(thisForm);
                                mr.forms.showFormSuccess(formSuccess, formError, 1000, 5000, 500);
                            }
                        }
                        // If error text was returned, put the text in the .form-error div and show it.
                        else {
                            // Keep the current error text in a data attribute on the form
                            formError.attr('original-error', formError.text());
                            // Show the error with the returned error text.
                            formError.text(response).stop(true).fadeIn(1000);
                            formSuccess.stop(true).fadeOut(1000);
                        }
                    },
                    error: function(errorObject, errorText, errorHTTP) {
                        // Keep the current error text in a data attribute on the form
                        formError.attr('original-error', formError.text());
                        // Show the error with the returned error text.
                        formError.text(errorHTTP).stop(true).fadeIn(1000);
                        formSuccess.stop(true).fadeOut(1000);
                        submitButton.removeClass('btn--loading');
                    }
                });
            }
        }
        return false;
    };
    
    mr.forms.validateFields = function(form) {
        var body = $(body), name, error, originalErrorMessage;

        $(form).find('.validate-required[type="checkbox"]').each(function() {
            if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                error = 1;
                name = $(this).attr('name').replace('[]', '');
                body.find('.form-error').text('Please tick at least one ' + name + ' box.');
            }
        });

        $(form).find('.validate-required, .required, [required]').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        $(form).find('.validate-email, .email, [name*="cm-"][type="email"]').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        if (!form.find('.field-error').length) {
            body.find('.form-error').fadeOut(1000);
        }else{
            
            var firstError = $(form).find('.field-error:first');
            
            if(firstError.length){
                $('html, body').stop(true).animate({
                    scrollTop: (firstError.offset().top - 100)
                }, 1200, function(){firstError.focus();});
            }
        }

        return error;
    };

    mr.forms.showFormSuccess = function(formSuccess, formError, fadeOutError, wait, fadeOutSuccess){
        
        formSuccess.stop(true).fadeIn(fadeOutError);

        formError.stop(true).fadeOut(fadeOutError);
        setTimeout(function() {
            formSuccess.stop(true).fadeOut(fadeOutSuccess);
        }, wait);
    };

    mr.forms.showFormError = function(formSuccess, formError, fadeOutSuccess, wait, fadeOutError){
        
        formError.stop(true).fadeIn(fadeOutSuccess);

        formSuccess.stop(true).fadeOut(fadeOutSuccess);
        setTimeout(function() {
            formError.stop(true).fadeOut(fadeOutError);
        }, wait);
    };

    // Reset form to empty/default state.
    mr.forms.resetForm = function(form){
        form = $(form);
        form.get(0).reset();
        form.find('.input-radio, .input-checkbox').removeClass('checked');

    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Maps
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.maps = {};

    var documentReady = function($){
        // Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map

        $('.map-holder').on('click', function() {
            $(this).addClass('interact');
        }).removeClass('interact');
        
        mr.maps.initAPI();
        mr.maps.init();
        
    };
    mr.maps.documentReady = documentReady;

    mr.maps.initAPI = function(){
        // Load Google MAP API JS with callback to initialise when fully loaded
        if(document.querySelector('[data-maps-api-key]') && !document.querySelector('.gMapsAPI')){
            if($('[data-maps-api-key]').length){
                var script = document.createElement('script');
                var apiKey = $('[data-maps-api-key]:first').attr('data-maps-api-key');
                apiKey = typeof apiKey != typeof undefined ? apiKey : ''; 
                if(apiKey !== ''){
                    script.type = 'text/javascript';
                    script.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&callback=mr.maps.init';
                    script.className = 'gMapsAPI';
                    document.body.appendChild(script);  
                }
            } 
        }
    };

    mr.maps.init = function(){
        if(typeof window.google !== "undefined"){
            if(typeof window.google.maps !== "undefined"){
                $('.map-container[data-maps-api-key]').each(function(){
                    var mapElement    = this,
                        mapInstance   = $(this),
                        mapJSON       = typeof mapInstance.attr('data-map-style') !== typeof undefined ? mapInstance.attr('data-map-style'): false,
                        mapStyle      = JSON.parse(mapJSON) || [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
                        zoomLevel     = (typeof mapInstance.attr('data-map-zoom') !== typeof undefined && mapInstance.attr('data-map-zoom') !== "") ? mapInstance.attr('data-map-zoom') * 1: 17,
                        latlong       = typeof mapInstance.attr('data-latlong') !== typeof undefined ? mapInstance.attr('data-latlong') : false,
                        latitude      = latlong ? 1 *latlong.substr(0, latlong.indexOf(',')) : false,
                        longitude     = latlong ? 1 * latlong.substr(latlong.indexOf(",") + 1) : false,
                        geocoder      = new google.maps.Geocoder(),
                        address       = typeof mapInstance.attr('data-address') !== typeof undefined ? mapInstance.attr('data-address').split(';'): [""],
                        markerImage   = typeof mapInstance.attr('data-marker-image') !== typeof undefined ? mapInstance.attr('data-marker-image'): 'img/mapmarker.png',
                        markerTitle   = "We Are Here",
                        isDraggable   = $(document).width() > 766 ? true : false,
                        map, marker,
                        mapOptions = {
                            draggable: isDraggable,
                            scrollwheel: false,
                            zoom: zoomLevel,
                            disableDefaultUI: true,
                            styles: mapStyle
                        };

                    if(typeof mapInstance.attr('data-marker-title') !== typeof undefined && mapInstance.attr('data-marker-title') !== "" )
                    {
                        markerTitle = mapInstance.attr('data-marker-title');
                    }

                    if(address !== undefined && address[0] !== ""){
                            geocoder.geocode( { 'address': address[0].replace('[nomarker]','')}, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                var map = new google.maps.Map(mapElement, mapOptions); 
                                map.setCenter(results[0].geometry.location);
                                
                                address.forEach(function(address){
                                    var markerGeoCoder;
                                    
                                    markerImage = {url: typeof window.mr_variant === typeof undefined ? markerImage : '../img/mapmarker.png', scaledSize: new google.maps.Size(50,50)};
                                    if(/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(address) ){
                                        var latlong = address.split(','),
                                        marker = new google.maps.Marker({
                                                        position: { lat: 1*latlong[0], lng: 1*latlong[1] },
                                                        map: map,
                                                        icon: markerImage,
                                                        title: markerTitle,
                                                        optimised: false
                                                    });
                                    }
                                    else if(address.indexOf('[nomarker]') < 0){
                                        markerGeoCoder = new google.maps.Geocoder();
                                        markerGeoCoder.geocode( { 'address': address.replace('[nomarker]','')}, function(results, status) {
                                            if (status === google.maps.GeocoderStatus.OK) {
                                                marker = new google.maps.Marker({
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle,
                                                    position: results[0].geometry.location,
                                                    optimised: false
                                                });
                                            }
                                        });
                                    }

                                });
                            } else {
                                console.log('There was a problem geocoding the address.');
                            }
                        });
                    }
                    else if(typeof latitude !== typeof undefined && latitude !== "" && latitude !== false && typeof longitude !== typeof undefined && longitude !== "" && longitude !== false ){
                        mapOptions.center   = { lat: latitude, lng: longitude};
                        map                 = new google.maps.Map(mapInstance, mapOptions); 
                        marker              = new google.maps.Marker({
                                                    position: { lat: latitude, lng: longitude },
                                                    map: map,
                                                    icon: markerImage,
                                                    title: markerTitle
                                                });

                    }

                }); 
            }
        }
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));


//////////////// Modals
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.modals = {};

    var documentReady = function($){
        $('.modal-container').each(function(){

            // Add modal close if none exists

            var modal        = $(this),
                $window      = $(window),
                modalContent = modal.find('.modal-content');
                
            
            if(!modal.find('.modal-close').length){
                modal.find('.modal-content').append('<div class="modal-close modal-close-cross"></div>');
            }

            // Set modal height
            
            if(modalContent.attr('data-width') !== undefined){
                var modalWidth = modalContent.attr('data-width').substr(0,modalContent.attr('data-width').indexOf('%')) * 1;
                if($window.width()<1280 && $window.width()>990){
                    modalWidth = modalWidth + 15;  
                }else if($window.width()<990){
                    modalWidth = modalWidth + 20;  
                }
                modalContent.css('width',modalWidth + '%');
            }
            if(modalContent.attr('data-height') !== undefined){
                var modalHeight = modalContent.attr('data-height').substr(0,modalContent.attr('data-height').indexOf('%')) * 1;
                if($window.height()<768){
                    console.log($window.height());
                    modalHeight = modalHeight + 15;  
                }
                modalContent.css('height',modalHeight + '%');
            }

            // Set iframe's src to data-src to stop autoplaying iframes
            mr.util.idleSrc(modal, 'iframe');

        });

        if(typeof mr_variant == typeof undefined){
            $('.modal-instance').each(function(index){
                var modalInstance = $(this);
                var modal = modalInstance.find('.modal-container');
                var modalContent = modalInstance.find('.modal-content');
                var trigger = modalInstance.find('.modal-trigger');
                
                // Link modal with modal-id attribute
                
                trigger.attr('data-modal-index',index);
                modal.attr('data-modal-index',index);
                
                // Set unique id for multiple triggers
                
                if(typeof modal.attr('data-modal-id') !== typeof undefined){
                    trigger.attr('data-modal-id', modal.attr('data-modal-id'));
                }
                

                // Attach the modal to the body            
                modal = modal.detach();
                $('body').append(modal);
            });
        }

        $('.modal-trigger').on('click', function(){

            var modalTrigger = $(this);
            var $body        = $('body');
            var uniqueID, targetModal;
            // Determine if the modal id is set by user or is set programatically
   
            if(typeof modalTrigger.attr('data-modal-id') !== typeof undefined){
                uniqueID = modalTrigger.attr('data-modal-id');
                targetModal = $body.find('.modal-container[data-modal-id="'+uniqueID+'"]');    
            }else{
                uniqueID = $(this).attr('data-modal-index');
                targetModal = $body.find('.modal-container[data-modal-index="'+uniqueID+'"]');
            }
            
            mr.util.activateIdleSrc(targetModal, 'iframe');
            mr.modals.autoplayVideo(targetModal);

            mr.modals.showModal(targetModal);

            return false;
        });

        $('.modal-close').on('click', mr.modals.closeActiveModal);

        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                mr.modals.closeActiveModal();
            }
        });

        $('.modal-container').on('click', function(e) { 
            if( e.target != this ) return;
            mr.modals.closeActiveModal();
        });

        // Trigger autoshow modals

        $('.modal-container[data-autoshow]').each(function(){
            var modal = $(this);
            var millisecondsDelay = modal.attr('data-autoshow')*1;

            mr.util.activateIdleSrc(modal);
            mr.modals.autoplayVideo(modal);

            // If this modal has a cookie attribute, check to see if a cookie is set, and if so, don't show it.
            if(typeof modal.attr('data-cookie') !== typeof undefined){
                if(!mr.cookies.hasItem(modal.attr('data-cookie'))){
                    mr.modals.showModal(modal, millisecondsDelay);
                }
            }else{
                mr.modals.showModal(modal, millisecondsDelay);
            }
        });

        // Make modal scrollable
        $(document).on('wheel mousewheel scroll','.modal-content, .modal-content .scrollable', function(evt){
            if(evt.preventDefault){evt.preventDefault();}
            if(evt.stopPropagation){evt.stopPropagation();}
            this.scrollTop += (evt.originalEvent.deltaY); 
        });
    };
    ////////////////
    //////////////// End documentReady
    ////////////////

    mr.modals.documentReady = documentReady;

    mr.modals.showModal = function(modal, millisecondsDelay){
        
        var delay = (typeof millisecondsDelay !== typeof undefined) ? (1*millisecondsDelay) : 0;
        
        setTimeout(function(){
            modal.addClass('modal-active');
        },delay);
    };

    mr.modals.closeActiveModal = function(){
        var modal = $('body div.modal-active');
        mr.util.idleSrc(modal, 'iframe');
        mr.util.pauseVideo(modal);

        // If this modal requires to be closed permanently using a cookie, set the cookie now.
        if(typeof modal.attr('data-cookie') !== typeof undefined){
            mr.cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }

        modal.removeClass('modal-active');
    };

    mr.modals.autoplayVideo = function(modal){
        // If modal contains HTML5 video with autoplay, play the video
        if(modal.find('video[autoplay]').length){
            var video = modal.find('video').get(0);
            video.play();
        }
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Notifications
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.notifications = {};

    var documentReady = function($){
        
        $('.notification').each(function(){
            var notification = $(this);
            if(!notification.find('.notification-close').length){
                notification.append('<div class="notification-close-cross notification-close"></div>');
            }
        });
    

        $('.notification[data-autoshow]').each(function(){
            var notification = $(this);
            var millisecondsDelay = notification.attr('data-autoshow') * 1;

            // If this notification has a cookie attribute, check to see if a cookie is set, and if so, don't show it.
            if(typeof notification.attr('data-cookie') !== typeof undefined){
                if(!mr.cookies.hasItem(notification.attr('data-cookie'))){
                    mr.notifications.showNotification(notification, millisecondsDelay);
                }
            }else{
                mr.notifications.showNotification(notification, millisecondsDelay);
            }
        });

        $('[data-notification-link]:not(.notification)').on('click', function(){
            var notificationID = $(this).attr('data-notification-link');
            var notification = $('body').find('.notification[data-notification-link="'+notificationID+'"]');
            notification.removeClass('notification--dismissed');
            notification.addClass('notification--reveal');
            return false;
        });

        $('.notification-close').on('click', function(){
            var closeButton = $(this);
            // Pass the closeNotification function a reference to the close button
            mr.notifications.closeNotification(closeButton);

            if(closeButton.attr('href') === '#'){
                return false;
            }
        });
    
    };
    
    mr.notifications.documentReady = documentReady;

    mr.notifications.showNotification = function(notification, millisecondsDelay){
        var delay = (typeof millisecondsDelay !== typeof undefined) ? (1*millisecondsDelay) : 0;

        setTimeout(function(){
            notification.addClass('notification--reveal');
        },delay);
    };

    mr.notifications.closeNotification = function(notification){

        var $notification = $(notification);
        
        notification = $notification.is('.notification-close') ? 
                       $notification.closest('.notification') : 
                       $('body').find('.notification[data-notification-link="'+notification+'"]');

        notification.addClass('notification--dismissed'); 

        // If this notification requires to be closed permanently using a cookie, set the cookie now.
        if(typeof notification.attr('data-cookie') !== typeof undefined){
            mr.cookies.setItem(notification.attr('data-cookie'), "true", Infinity);
        }
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Smoothscroll
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        // Smooth scroll to inner links
        var innerLinks = $('a.inner-link');

        if(innerLinks.length){
            innerLinks.each(function(){
                var link = $(this);
                var href = link.attr('href');
                if(href.charAt(0) !== "#"){
                    link.removeClass('inner-link');
                }
            });

            var offset = 0;
            if($('body[data-smooth-scroll-offset]').length){
                offset = $('body').attr('data-smooth-scroll-offset');
                offset = offset*1;
            }
            
            innerLinks.smoothScroll({
              offset: offset,
              speed: 800
            });
        }
    };

    mr.smoothscroll = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Transitions
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});

mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        $('a:not([href^="#"]):not([href^="tel"]):not([href^="mailto"]):not([data-lightbox]):not([href=""]):not([target="_blank"])').on('click', function(){
            $('[class*="transition--"]').removeClass('transition--active');
        });   
    };

    var windowLoad = function(){
        $('[class*="transition--"]').addClass('transition--active');
        $('.loader').addClass('loader--fade');
    };

    mr.transitions = {
        documentReady : documentReady,
        windowLoad : windowLoad        
    };

    mr.components.documentReady.push(documentReady);
    mr.components.windowLoad.push(windowLoad);
    return mr;

}(mr, jQuery, window, document));