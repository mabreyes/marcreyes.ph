/*
	Name: LazyGuy
	Description: Personal Landing Page
	Version: 1.0
	Author: pixelwars
*/

(function() {
    'use strict';


    // WAIT FOR DOM TO BE LOADED
    document.addEventListener("DOMContentLoaded", function() {

        // VIDEO BACKGROUND
        jarallax(document.querySelectorAll('.media'), {
            speed: 0,
            zIndex: 1
        });

    }); // dom loaded

    // WAIT FOR ALL TO BE LOADED
    window.onload = function() {

        // add loaded class to html
        var root = document.documentElement;
        root.className += ' loaded';

        // TYPING EFFECT
        Typed.new('#typed', {
            stringsElement: document.getElementById('typed-strings'),
            loop: true,
            typeSpeed: 7,
            backSpeed: 2,
            startDelay: 1000,
            backDelay: 1200
        });
    }; // all loaded


}());



/*
	PLUGINS
*/

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.7.1
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(e) { "use strict";

    function t() { i = e.innerWidth || document.documentElement.clientWidth, a = e.innerHeight || document.documentElement.clientHeight }

    function n(e, t, n) { e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, function() { n.call(e) }) }

    function o(n) { e.requestAnimationFrame(function() { "scroll" !== n.type && t(); for (var e = 0, o = g.length; e < o; e++) "scroll" !== n.type && (g[e].coverImage(), g[e].clipContainer()), g[e].onScroll() }) }
    Date.now || (Date.now = function() { return (new Date).getTime() }), e.requestAnimationFrame || ! function() { for (var t = ["webkit", "moz"], n = 0; n < t.length && !e.requestAnimationFrame; ++n) { var o = t[n];
            e.requestAnimationFrame = e[o + "RequestAnimationFrame"], e.cancelAnimationFrame = e[o + "CancelAnimationFrame"] || e[o + "CancelRequestAnimationFrame"] } if (/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent) || !e.requestAnimationFrame || !e.cancelAnimationFrame) { var i = 0;
            e.requestAnimationFrame = function(e) { var t = Date.now(),
                    n = Math.max(i + 16, t); return setTimeout(function() { e(i = n) }, n - t) }, e.cancelAnimationFrame = clearTimeout } }(); var i, a, r = function() { if (!e.getComputedStyle) return !1; var t, n = document.createElement("p"),
                o = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
            (document.body || document.documentElement).insertBefore(n, null); for (var i in o) "undefined" != typeof n.style[i] && (n.style[i] = "translate3d(1px,1px,1px)", t = e.getComputedStyle(n).getPropertyValue(o[i])); return (document.body || document.documentElement).removeChild(n), "undefined" != typeof t && t.length > 0 && "none" !== t }(),
        l = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        s = /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream,
        m = !!e.opera,
        c = /Edge\/\d+/.test(navigator.userAgent),
        p = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
        u = !!Function("/*@cc_on return document.documentMode===10@*/")(),
        d = document.all && !e.atob;
    t(); var g = [],
        f = function() {
            function e(e, n) { var o, i = this; if (i.$item = e, i.defaults = { type: "scroll", speed: .5, imgSrc: null, imgWidth: null, imgHeight: null, enableTransform: !0, elementInViewport: null, zIndex: -100, noAndroid: !1, noIos: !0, onScroll: null, onInit: null, onDestroy: null, onCoverImage: null }, o = JSON.parse(i.$item.getAttribute("data-jarallax") || "{}"), i.options = i.extend({}, i.defaults, o, n), !(l && i.options.noAndroid || s && i.options.noIos)) { i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))); var a = i.options.elementInViewport;
                    a && "object" == typeof a && "undefined" != typeof a.length && (a = a[0]), !a instanceof Element && (a = null), i.options.elementInViewport = a, i.instanceID = t++, i.image = { src: i.options.imgSrc || null, $container: null, $item: null, width: i.options.imgWidth || null, height: i.options.imgHeight || null, useImgTag: s || l || m || p || u || c }, i.initImg() && i.init() } } var t = 0; return e }();
    f.prototype.css = function(t, n) { if ("string" == typeof n) return e.getComputedStyle ? e.getComputedStyle(t).getPropertyValue(n) : t.style[n];
        n.transform && (n.WebkitTransform = n.MozTransform = n.transform); for (var o in n) t.style[o] = n[o]; return t }, f.prototype.extend = function(e) { e = e || {}; for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
        return e }, f.prototype.initImg = function() { var e = this; return null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src) }, f.prototype.init = function() {
        function e() { t.coverImage(), t.clipContainer(), t.onScroll(!0), t.$item.setAttribute("data-jarallax-original-styles", t.$item.getAttribute("style")), t.options.onInit && t.options.onInit.call(t), setTimeout(function() { t.$item && t.css(t.$item, { "background-image": "none", "background-attachment": "scroll", "background-size": "auto" }) }, 0) } var t = this,
            n = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" },
            o = { position: "fixed" };
        t.image.$container = document.createElement("div"), t.css(t.image.$container, n), t.css(t.image.$container, { visibility: "hidden", "z-index": t.options.zIndex }), t.image.$container.setAttribute("id", "jarallax-container-" + t.instanceID), t.$item.appendChild(t.image.$container), t.image.useImgTag && r && t.options.enableTransform ? (t.image.$item = document.createElement("img"), t.image.$item.setAttribute("src", t.image.src), o = t.extend({ "max-width": "none" }, n, o)) : (t.image.$item = document.createElement("div"), o = t.extend({ "background-position": "50% 50%", "background-size": "100% auto", "background-repeat": "no-repeat no-repeat", "background-image": 'url("' + t.image.src + '")' }, n, o)), d && (o.backgroundAttachment = "fixed"), t.parentWithTransform = 0; for (var i = t.$item; null !== i && i !== document && 0 === t.parentWithTransform;) { var a = t.css(i, "-webkit-transform") || t.css(i, "-moz-transform") || t.css(i, "transform");
            a && "none" !== a && (t.parentWithTransform = 1, t.css(t.image.$container, { transform: "translateX(0) translateY(0)" })), i = i.parentNode }
        t.css(t.image.$item, o), t.image.$container.appendChild(t.image.$item), t.image.width && t.image.height ? e() : t.getImageSize(t.image.src, function(n, o) { t.image.width = n, t.image.height = o, e() }), g.push(t) }, f.prototype.destroy = function() { for (var e = this, t = 0, n = g.length; t < n; t++)
            if (g[t].instanceID === e.instanceID) { g.splice(t, 1); break }
        var o = e.$item.getAttribute("data-jarallax-original-styles");
        e.$item.removeAttribute("data-jarallax-original-styles"), "null" === o ? e.$item.removeAttribute("style") : e.$item.setAttribute("style", o), e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax; for (var i in e) delete e[i] }, f.prototype.getImageSize = function(e, t) { if (e && t) { var n = new Image;
            n.onload = function() { t(n.width, n.height) }, n.src = e } }, f.prototype.clipContainer = function() { if (!d) { var e = this,
                t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height; if (!e.$clipStyles) { e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "#jarallax-clip-" + e.instanceID); var i = document.head || document.getElementsByTagName("head")[0];
                i.appendChild(e.$clipStyles) } var a = ["#jarallax-container-" + e.instanceID + " {", "   clip: rect(0 " + n + "px " + o + "px 0);", "   clip: rect(0, " + n + "px, " + o + "px, 0);", "}"].join("\n");
            e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = a : e.$clipStyles.innerHTML = a } }, f.prototype.coverImage = function() { var e = this; if (e.image.width && e.image.height) { var t = e.image.$container.getBoundingClientRect(),
                n = t.width,
                o = t.height,
                i = t.left,
                l = e.image.width,
                s = e.image.height,
                m = e.options.speed,
                c = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                p = 0,
                u = 0,
                d = o,
                g = 0,
                f = 0;
            c && (p = m * (o + a) / 2, (m < 0 || m > 1) && (p = m * Math.max(o, a) / 2), m < 0 || m > 1 ? d = Math.max(o, a) + 2 * Math.abs(p) : d += Math.abs(a - o) * (1 - m)), u = d * l / s, u < n && (u = n, d = u * s / l), e.bgPosVerticalCenter = 0, !(c && d < a) || r && e.options.enableTransform || (e.bgPosVerticalCenter = (a - d) / 2, d = a), c ? (g = i + (n - u) / 2, f = (a - d) / 2) : (g = (n - u) / 2, f = (o - d) / 2), r && e.options.enableTransform && e.parentWithTransform && (g -= i), e.parallaxScrollDistance = p, e.css(e.image.$item, { width: u + "px", height: d + "px", marginLeft: g + "px", marginTop: f + "px" }), e.options.onCoverImage && e.options.onCoverImage.call(e) } }, f.prototype.isVisible = function() { return this.isElementInViewport || !1 }, f.prototype.onScroll = function(e) { var t = this; if (t.image.width && t.image.height) { var n = t.$item.getBoundingClientRect(),
                o = n.top,
                l = n.height,
                s = { position: "absolute", visibility: "visible", backgroundPosition: "50% 50%" },
                m = n; if (t.options.elementInViewport && (m = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = m.bottom >= 0 && m.right >= 0 && m.top <= a && m.left <= i, e || t.isElementInViewport) { var c = Math.max(0, o),
                    p = Math.max(0, l + o),
                    u = Math.max(0, -o),
                    g = Math.max(0, o + l - a),
                    f = Math.max(0, l - (o + l - a)),
                    h = Math.max(0, -o + a - l),
                    y = 1 - 2 * (a - o) / (a + l),
                    v = 1; if (l < a ? v = 1 - (u || g) / l : p <= a ? v = p / a : f <= a && (v = f / a), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (s.transform = "translate3d(0, 0, 0)", s.opacity = v), "scale" === t.options.type || "scale-opacity" === t.options.type) { var x = 1;
                    t.options.speed < 0 ? x -= t.options.speed * v : x += t.options.speed * (1 - v), s.transform = "scale(" + x + ") translate3d(0, 0, 0)" } if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) { var b = t.parallaxScrollDistance * y;
                    r && t.options.enableTransform ? (t.parentWithTransform && (b -= o), s.transform = "translate3d(0, " + b + "px, 0)") : t.image.useImgTag ? s.top = b + "px" : (t.bgPosVerticalCenter && (b += t.bgPosVerticalCenter), s.backgroundPosition = "50% " + b + "px"), s.position = d ? "absolute" : "fixed" }
                t.css(t.image.$item, s), t.options.onScroll && t.options.onScroll.call(t, { section: n, beforeTop: c, beforeTopEnd: p, afterTop: u, beforeBottom: g, beforeBottomEnd: f, afterBottom: h, visiblePercent: v, fromViewportCenter: y }) } } }, n(e, "scroll", o), n(e, "resize", o), n(e, "orientationchange", o), n(e, "load", o); var h = function(e) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]); var t, n = arguments[1],
            o = Array.prototype.slice.call(arguments, 2),
            i = e.length,
            a = 0; for (a; a < i; a++)
            if ("object" == typeof n || "undefined" == typeof n ? e[a].jarallax || (e[a].jarallax = new f(e[a], n)) : e[a].jarallax && (t = e[a].jarallax[n].apply(e[a].jarallax, o)), "undefined" != typeof t) return t;
        return e };
    h.constructor = f; var y = e.jarallax; if (e.jarallax = h, e.jarallax.noConflict = function() { return e.jarallax = y, this }, "undefined" != typeof jQuery) { var v = function() { var t = arguments || [];
            Array.prototype.unshift.call(t, this); var n = h.apply(e, t); return "object" != typeof n ? n : this };
        v.constructor = f; var x = jQuery.fn.jarallax;
        jQuery.fn.jarallax = v, jQuery.fn.jarallax.noConflict = function() { return jQuery.fn.jarallax = x, this } }
    n(e, "DOMContentLoaded", function() { h(document.querySelectorAll("[data-jarallax], [data-jarallax-video]")) }) }(window);

/*!
 * Name    : Video Worker (wrapper for Youtube, Vimeo and Local videos)
 * Version : 1.2.1
 * Author  : _nK https://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(e) { "use strict";

    function t(e) { e = e || {}; for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
        return e }

    function i() { this._done = [], this._fail = [] }

    function o(e, t, i) { e.addEventListener ? e.addEventListener(t, i) : e.attachEvent("on" + t, function() { i.call(e) }) }
    i.prototype = { execute: function(e, t) { var i = e.length; for (t = Array.prototype.slice.call(t); i--;) e[i].apply(null, t) }, resolve: function() { this.execute(this._done, arguments) }, reject: function() { this.execute(this._fail, arguments) }, done: function(e) { this._done.push(e) }, fail: function(e) { this._fail.push(e) } }; var a = function() {
        function e(e, o) { var a = this;
            a.url = e, a.options_default = { autoplay: 1, loop: 1, mute: 1, controls: 0, startTime: 0, endTime: 0 }, a.options = t({}, a.options_default, o), a.videoID = a.parseURL(e), a.videoID && (a.ID = i++, a.loadAPI(), a.init()) } var i = 0; return e }();
    a.prototype.parseURL = function(e) {
        function t(e) { var t = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                i = e.match(t); return !(!i || 11 !== i[1].length) && i[1] }

        function i(e) { var t = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
                i = e.match(t); return !(!i || !i[3]) && i[3] }

        function o(e) { for (var t = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/), i = {}, o = 0, a = 0; a < t.length; a++) { var n = t[a].match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                n && n[1] && n[2] && (i["ogv" === n[1] ? "ogg" : n[1]] = n[2], o = 1) } return !!o && i } var a = t(e),
            n = i(e),
            r = o(e); return a ? (this.type = "youtube", a) : n ? (this.type = "vimeo", n) : !!r && (this.type = "local", r) }, a.prototype.isValid = function() { return !!this.videoID }, a.prototype.on = function(e, t) { this.userEventsList = this.userEventsList || [], (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t) }, a.prototype.off = function(e, t) { if (this.userEventsList && this.userEventsList[e])
            if (t)
                for (var i = 0; i < this.userEventsList[e].length; i++) this.userEventsList[e][i] === t && (this.userEventsList[e][i] = !1);
            else delete this.userEventsList[e] }, a.prototype.fire = function(e) { var t = [].slice.call(arguments, 1); if (this.userEventsList && "undefined" != typeof this.userEventsList[e])
            for (var i in this.userEventsList[e]) this.userEventsList[e][i] && this.userEventsList[e][i].apply(this, t) }; var n = 0;
    a.prototype.play = function(e) { var t = this;
        t.player && ("youtube" === t.type && t.player.playVideo && ("undefined" != typeof e && t.player.seekTo(e || 0), t.player.playVideo()), "vimeo" !== t.type || n || ("undefined" != typeof e ? (n = 1, t.player.setCurrentTime(e || 0).then(function() { t.player.play(), n = 0 })) : t.player.play()), "local" === t.type && ("undefined" != typeof e && (t.player.currentTime = e), t.player.play())) }, a.prototype.pause = function() { this.player && ("youtube" === this.type && this.player.pauseVideo && this.player.pauseVideo(), "vimeo" === this.type && this.player.pause(), "local" === this.type && this.player.pause()) }, a.prototype.getImageURL = function(e) { var t = this; if (t.videoImage) return void e(t.videoImage); if ("youtube" === t.type) { var i = ["maxresdefault", "sddefault", "hqdefault", "0"],
                o = 0,
                a = new Image;
            a.onload = function() { 120 !== (this.naturalWidth || this.width) || o === i.length - 1 ? (t.videoImage = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg", e(t.videoImage)) : (o++, this.src = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg") }, a.src = "https://img.youtube.com/vi/" + t.videoID + "/" + i[o] + ".jpg" } if ("vimeo" === t.type) { var n = new XMLHttpRequest;
            n.open("GET", "https://vimeo.com/api/v2/video/" + t.videoID + ".json", !0), n.onreadystatechange = function() { if (4 === this.readyState && this.status >= 200 && this.status < 400) { var i = JSON.parse(this.responseText);
                    t.videoImage = i[0].thumbnail_large, e(t.videoImage) } }, n.send(), n = null } }, a.prototype.getIframe = function(t) { var i = this; return i.$iframe ? void t(i.$iframe) : void i.onAPIready(function() {
            function a(e, t, i) { var o = document.createElement("source");
                o.src = t, o.type = i, e.appendChild(o) } var n; if (i.$iframe || (n = document.createElement("div"), n.style.display = "none"), "youtube" === i.type) { i.playerOptions = {}, i.playerOptions.videoId = i.videoID, i.playerOptions.width = e.innerWidth || document.documentElement.clientWidth, i.playerOptions.playerVars = { autohide: 1, rel: 0, autoplay: 0 }, i.options.controls || (i.playerOptions.playerVars.iv_load_policy = 3, i.playerOptions.playerVars.modestbranding = 1, i.playerOptions.playerVars.controls = 0, i.playerOptions.playerVars.showinfo = 0, i.playerOptions.playerVars.disablekb = 1); var r, p;
                i.playerOptions.events = { onReady: function(e) { i.options.mute && e.target.mute(), i.options.autoplay && i.play(i.options.startTime), i.fire("ready", e) }, onStateChange: function(e) { i.options.loop && e.data === YT.PlayerState.ENDED && i.play(i.options.startTime), r || e.data !== YT.PlayerState.PLAYING || (r = 1, i.fire("started", e)), e.data === YT.PlayerState.PLAYING && i.fire("play", e), e.data === YT.PlayerState.PAUSED && i.fire("pause", e), e.data === YT.PlayerState.ENDED && i.fire("end", e), i.options.endTime && (e.data === YT.PlayerState.PLAYING ? p = setInterval(function() { i.options.endTime && i.player.getCurrentTime() >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause()) }, 150) : clearInterval(p)) } }; var s = !i.$iframe; if (s) { var l = document.createElement("div");
                    l.setAttribute("id", i.playerID), n.appendChild(l), document.body.appendChild(n) }
                i.player = i.player || new e.YT.Player(i.playerID, i.playerOptions), s && (i.$iframe = document.getElementById(i.playerID)) } if ("vimeo" === i.type) { i.playerOptions = "", i.playerOptions += "player_id=" + i.playerID, i.playerOptions += "&autopause=0", i.options.controls || (i.playerOptions += "&badge=0&byline=0&portrait=0&title=0"), i.playerOptions += "&autoplay=0", i.playerOptions += "&loop=" + (i.options.loop ? 1 : 0), i.$iframe || (i.$iframe = document.createElement("iframe"), i.$iframe.setAttribute("id", i.playerID), i.$iframe.setAttribute("src", "https://player.vimeo.com/video/" + i.videoID + "?" + i.playerOptions), i.$iframe.setAttribute("frameborder", "0"), n.appendChild(i.$iframe), document.body.appendChild(n)), i.player = i.player || new Vimeo.Player(i.$iframe), i.player.setVolume(i.options.mute ? 0 : 100), i.options.autoplay && i.play(i.options.startTime); var d;
                i.player.on("timeupdate", function(e) { d || i.fire("started", e), d = 1, i.options.endTime && i.options.endTime && e.seconds >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause()) }), i.player.on("play", function(e) { i.fire("play", e) }), i.player.on("pause", function(e) { i.fire("pause", e) }), i.player.on("ended", function(e) { i.fire("end", e) }), i.player.on("loaded", function(e) { i.fire("ready", e) }) } if ("local" === i.type) { if (!i.$iframe) { i.$iframe = document.createElement("video"), i.options.mute && i.$iframe.setAttribute("mute", "on"), i.options.loop && i.$iframe.setAttribute("loop", "on"), i.$iframe.setAttribute("id", i.playerID), n.appendChild(i.$iframe), document.body.appendChild(n); for (var u in i.videoID) a(i.$iframe, i.videoID[u], "video/" + u) }
                i.player = i.player || i.$iframe; var y;
                o(i.player, "playing", function(e) { y || i.fire("started", e), y = 1 }), o(i.player, "timeupdate", function() { i.options.endTime && i.options.endTime && this.currentTime >= i.options.endTime && (i.options.loop ? i.play(i.options.startTime) : i.pause()) }), o(i.player, "play", function(e) { i.fire("play", e) }), o(i.player, "pause", function(e) { i.fire("pause", e) }), o(i.player, "ended", function(e) { i.fire("end", e) }), o(i.player, "loadedmetadata", function() { i.fire("ready"), i.options.autoplay && i.play(i.options.startTime) }) }
            t(i.$iframe) }) }, a.prototype.init = function() { var e = this;
        e.playerID = "VideoWorker-" + e.ID }; var r = 0,
        p = 0;
    a.prototype.loadAPI = function() { var t = this; if (!r || !p) { var i = ""; if ("youtube" !== t.type || r || (r = 1, i = "//www.youtube.com/iframe_api"), "vimeo" !== t.type || p || (p = 1, i = "//player.vimeo.com/api/player.js"), i) { "file://" === e.location.origin && (i = "http:" + i); var o = document.createElement("script"),
                    a = document.getElementsByTagName("head")[0];
                o.src = i, a.appendChild(o), a = null, o = null } } }; var s = 0,
        l = 0,
        d = new i,
        u = new i;
    a.prototype.onAPIready = function(t) { var i = this; if ("youtube" === i.type && ("undefined" != typeof YT && 0 !== YT.loaded || s ? "object" == typeof YT && 1 === YT.loaded ? t() : d.done(function() { t() }) : (s = 1, e.onYouTubeIframeAPIReady = function() { e.onYouTubeIframeAPIReady = null, d.resolve("done"), t() })), "vimeo" === i.type)
            if ("undefined" != typeof Vimeo || l) "undefined" != typeof Vimeo ? t() : u.done(function() { t() });
            else { l = 1; var o = setInterval(function() { "undefined" != typeof Vimeo && (clearInterval(o), u.resolve("done"), t()) }, 20) }
            "local" === i.type && t() }, e.VideoWorker = a }(window),
/*!
 
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.0
 * Author  : _nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
function() { "use strict"; if ("undefined" != typeof jarallax) { var e = jarallax.constructor,
            t = e.prototype.init;
        e.prototype.init = function() { var e = this;
            t.apply(e), e.video && e.video.getIframe(function(t) { var i = t.parentNode;
                e.css(t, { position: "fixed", top: "0px", left: "0px", right: "0px", bottom: "0px", width: "100%", height: "100%", visibility: "visible", zIndex: -1 }), e.$video = t, e.image.$container.appendChild(t), i.parentNode.removeChild(i) }) }; var i = e.prototype.coverImage;
        e.prototype.coverImage = function() { var e = this;
            i.apply(e), e.video && "IFRAME" === e.image.$item.nodeName && e.css(e.image.$item, { height: e.image.$item.getBoundingClientRect().height + 400 + "px", marginTop: -200 + parseFloat(e.css(e.image.$item, "margin-top")) + "px" }) }; var o = e.prototype.initImg;
        e.prototype.initImg = function() { var e = this; if (e.options.videoSrc || (e.options.videoSrc = e.$item.getAttribute("data-jarallax-video") || !1), e.options.videoSrc) { var t = new VideoWorker(e.options.videoSrc, { startTime: e.options.videoStartTime || 0, endTime: e.options.videoEndTime || 0 }); if (t.isValid() && (e.image.useImgTag = !0, t.on("ready", function() { var i = e.onScroll;
                        e.onScroll = function() { i.apply(e), e.isVisible() ? t.play() : t.pause() } }), t.on("started", function() { e.image.$default_item = e.image.$item, e.image.$item = e.$video, e.image.width = e.options.imgWidth = e.image.width || 1280, e.image.height = e.options.imgHeight = e.image.height || 720, e.coverImage(), e.clipContainer(), e.onScroll(), e.image.$default_item && (e.image.$default_item.style.display = "none") }), e.video = t, "local" !== t.type && t.getImageURL(function(t) { e.image.src = t, e.init() })), "local" !== t.type) return !1 } return o.apply(e) }; var a = e.prototype.destroy;
        e.prototype.destroy = function() { var e = this;
            a.apply(e) } } }();




// Typed.js | Copyright (c) 2016 Matt Boldt | www.mattboldt.com
// The MIT License (MIT)
! function(t, s, e) { "use strict"; var i = function(t, s) { var i = this;
        this.el = t, this.options = {}, Object.keys(r).forEach(function(t) { i.options[t] = r[t] }), Object.keys(s).forEach(function(t) { i.options[t] = s[t] }), this.isInput = "input" === this.el.tagName.toLowerCase(), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.getAttribute(this.attr) : this.el.textContent, this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, e && this.options.stringsElement instanceof e ? this.stringsElement = this.options.stringsElement[0] : this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build() };
    i.prototype = { constructor: i, init: function() { var t = this;
            t.timeout = setTimeout(function() { for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos) }, t.startDelay) }, build: function() { var t = this; if (this.showCursor === !0 && (this.cursor = s.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)), this.stringsElement) { this.strings = [], this.stringsElement.style.display = "none"; var e = Array.prototype.slice.apply(this.stringsElement.children);
                e.forEach(function(s) { t.strings.push(s.innerHTML) }) }
            this.init() }, typewrite: function(t, s) { if (this.stop !== !0) { var e = Math.round(70 * Math.random()) + this.typeSpeed,
                    i = this;
                i.timeout = setTimeout(function() { var e = 0,
                        r = t.substr(s); if ("^" === r.charAt(0)) { var o = 1; /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o) } if ("html" === i.contentType) { var n = t.substr(s).charAt(0); if ("<" === n || "&" === n) { var a = "",
                                h = ""; for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)););
                            s++, a += h } }
                    i.timeout = setTimeout(function() { if (s === t.length) { if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return;
                            i.timeout = setTimeout(function() { i.backspace(t, s) }, i.backDelay) } else { 0 === s && i.options.preStringTyped(i.arrayPos); var e = t.substr(0, s + 1);
                            i.attr ? i.el.setAttribute(i.attr, e) : i.isInput ? i.el.value = e : "html" === i.contentType ? i.el.innerHTML = e : i.el.textContent = e, s++, i.typewrite(t, s) } }, e) }, e) } }, backspace: function(t, s) { if (this.stop !== !0) { var e = Math.round(70 * Math.random()) + this.backSpeed,
                    i = this;
                i.timeout = setTimeout(function() { if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) { for (var e = "";
                            "<" !== t.substr(s - 1).charAt(0) && (e -= t.substr(s).charAt(0), s--, !(s < 0)););
                        s--, e += "<" } var r = t.substr(0, s);
                    i.attr ? i.el.setAttribute(i.attr, r) : i.isInput ? i.el.value = r : "html" === i.contentType ? i.el.innerHTML = r : i.el.textContent = r, s > i.stopNum ? (s--, i.backspace(t, s)) : s <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], s)) }, e) } }, shuffleArray: function(t) { var s, e, i = t.length; if (i)
                for (; --i;) e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s; return t }, reset: function() { var t = this;
            clearInterval(t.timeout);
            this.el.getAttribute("id");
            this.el.textContent = "", "undefined" != typeof this.cursor && "undefined" != typeof this.cursor.parentNode && this.cursor.parentNode.removeChild(this.cursor), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback() } }, i["new"] = function(t, e) { var r = Array.prototype.slice.apply(s.querySelectorAll(t));
        r.forEach(function(t) { var s = t._typed,
                r = "object" == typeof e && e;
            s && s.reset(), t._typed = s = new i(t, r), "string" == typeof e && s[e]() }) }, e && (e.fn.typed = function(t) { return this.each(function() { var s = e(this),
                r = s.data("typed"),
                o = "object" == typeof t && t;
            r && r.reset(), s.data("typed", r = new i(this, o)), "string" == typeof t && r[t]() }) }), t.Typed = i; var r = { strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"], stringsElement: null, typeSpeed: 0, startDelay: 0, backSpeed: 0, shuffle: !1, backDelay: 500, loop: !1, loopCount: !1, showCursor: !0, cursorChar: "|", attr: null, contentType: "html", callback: function() {}, preStringTyped: function() {}, onStringTyped: function() {}, resetCallback: function() {} } }(window, document, window.jQuery);