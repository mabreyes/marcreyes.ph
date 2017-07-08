/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","bf4a4ebcd169924283c8a40d57504bcf"],["css/base.css","6e0ec7cfa2b09c096038c0bf41ffadf8"],["css/bt-slider/bootstrap.css","a2d72589187f1d2a24eac834170a6988"],["css/bt-slider/full-slider.css","22bef7d146619f16aa236d85219289c7"],["css/component.css","9af96e10344ea32c6b75e18c890687da"],["css/demo.css","7f1cf710432765918b0f50d74ebc2105"],["css/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["css/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["css/font-awesome/fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["css/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["css/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["css/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["css/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["css/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["css/fonts.css","a143225766a020e1d9e3404ee0e5d7fa"],["css/main.css","f3666aeb7ce4343629eefdfc05fe506c"],["css/micons/fonts/icomoon.eot","8ba3d2f45fb8fb79875871d14df2c703"],["css/micons/fonts/icomoon.svg","81edc20628720a70eec4bb593dc06041"],["css/micons/fonts/icomoon.ttf","59809af617d58f5da50fb027f3c617ef"],["css/micons/fonts/icomoon.woff","3c815a4b0627cbacd15a7a09c0e2b695"],["css/micons/micons.css","eb3bda7a4743b56ed0035ba6643d72df"],["css/normalize.css","ea71b0dbad3c50cafede01b6c555f799"],["css/style.css","9029fef4c088a230f719677fef8721d6"],["css/vendor.css","01692ad0f2340c6dbb4b6954362242b9"],["favicon.ico","b1c5cd194a87cab17e3565b816f906b8"],["fonts/codropsicons/codropsicons.eot","e0c41e218300b108279dfd69224873a8"],["fonts/codropsicons/codropsicons.svg","1958497a8eab2ae7a4f8d3e602655143"],["fonts/codropsicons/codropsicons.ttf","89060daed41f701ecf87e69c4c6b635b"],["fonts/codropsicons/codropsicons.woff","70b872279cb3b15ddf0447a94c985c1d"],["fonts/codropsicons/license.txt","71989a368aa14fa2bee7719a8edaf654"],["fonts/librebaskerville/librebaskerville-bold-webfont.woff","c4711930c3a7eff1e02cb9e552bcd386"],["fonts/librebaskerville/librebaskerville-bold-webfont.woff2","1c87f16b386bbfdc1ae1a5149635cdfa"],["fonts/librebaskerville/librebaskerville-italic-webfont.woff","70e8ec15e18a315451177c4074066b3f"],["fonts/librebaskerville/librebaskerville-italic-webfont.woff2","4ba92be4076c08dbd7f29d5a4b571c93"],["fonts/librebaskerville/librebaskerville-regular-webfont.woff","c1d1c75cc10d62fbada454b8f48539b0"],["fonts/librebaskerville/librebaskerville-regular-webfont.woff2","520ff79ac50eb226b24a261c0369bfe0"],["fonts/lightgallery/lg.eot","c853a32787dade9fa720183374ee452a"],["fonts/lightgallery/lg.svg","c30beeb89783034a9993759ede9fd69a"],["fonts/lightgallery/lg.ttf","54d58ad47ad02fc0f30c926645110b60"],["fonts/lightgallery/lg.woff","47aae6af0370e6acb0805e359db12687"],["fonts/montserrat/montserrat-bold-webfont.woff","b019c4fcda189cced289b08621a2a9fd"],["fonts/montserrat/montserrat-bold-webfont.woff2","34fac8b61be1cb2b8c6fab656327f658"],["fonts/montserrat/montserrat-regular-webfont.woff","fa6c61d2daa799fdb2aa14262c0cd6aa"],["fonts/montserrat/montserrat-regular-webfont.woff2","0891dad6bdd16bcfd31e25eccbd88890"],["fonts/norwester/norwester.eot","6a345b7ea01b20d7379302b922441a19"],["fonts/norwester/norwester.svg","b933f75aecec5a94c200957315489c8e"],["fonts/norwester/norwester.ttf","9d0967bfe19937b123d26cde0ba6a217"],["fonts/norwester/norwester.woff","a584a84ece11024bfde828dfafec1573"],["fonts/san-francisco/SanFranciscoText-Regular.woff","fc3465d5fcaf291d5255fa5b5c2c80ef"],["google38dc8d489e98b659.html","15585d02b35046172b916f4ccb695223"],["images/arrow.png","b74ebfc9181158757298fe8d3e1ebece"],["images/avatars/user-01.jpg","3f8a3ae3661020fd51979d764b419847"],["images/avatars/user-02.jpg","735866d1489cde99d77e4bac4cbefa0f"],["images/avatars/user-03.jpg","5c7677b4f7bd8688fae637b4968bd9c4"],["images/avatars/user-04.jpg","9fec8a2e606f926960f7302599c421ef"],["images/avatars/user-05.jpg","479f00d1f7522f5fcf168912c0a9ce22"],["images/blog/blog1.jpg","f0e21c79c088c8ae0c342c7be18b5b8b"],["images/blog/blog2.jpg","e3e70704ac4728fb63ca25c2a63f9692"],["images/blog/blog3.jpg","eed6a51012a942ce3f2c26e57d298830"],["images/clients/angular.png","c2771d1ebd3fbbcd3875deb11f512c2f"],["images/clients/bower.png","1404bfcf77912bd5a46220374539c34e"],["images/clients/buffer.png","7894899adb677009e5675b290a88ffb6"],["images/clients/codepen.png","0ce38e7ab7e7fc0938140b61f0a7cddd"],["images/clients/dribbble.png","9d928686ff551f181e32767bc08e0fc1"],["images/clients/dropbox.png","254b5f1800e8fa2a8b289a3c78b79b2e"],["images/clients/envato.png","5c7c94033be54621455dbf4967cd59d2"],["images/clients/evernote.png","ebd1c728a60a022eeb7e625bd79f345f"],["images/clients/firefox.png","f0672db555f5933f2dbf8fce238bd2eb"],["images/clients/github.png","6da29d1bb46b92557abe07165fc784bc"],["images/clients/grunt.png","b9ddfc3d41a672f1475c31c1c3fdf0e0"],["images/clients/jQuery.png","a8c96b3997c44f0da86632bc1c4e4706"],["images/clients/joomla.png","267664b6f27a76dad67bb79b73def68a"],["images/clients/magento.png","24bd4d8bc74c89c36a043276dbf918ee"],["images/clients/messenger.png","ab2b20b0fe2c61c451b107287cbff43b"],["images/clients/mozilla.png","51de81069999fb375110e62c58499084"],["images/clients/opera.png","83fa989293d7b38316d630f96d42924f"],["images/clients/pocket.png","ef2442dd26b4b19b8b4dd16d72240e5f"],["images/clients/spotify.png","b64f12f9dd3e95478c9e8b3f2ac0827c"],["images/clients/wordpress.png","7749a5b5c54f1bbe5cd66d57bdec27bd"],["images/contact-bg.jpg","1c1616eabf2058547cb43b35908fc405"],["images/hero-bg.jpg","a80046481cc397a86cbca54e0018f04a"],["images/lightgallery/loading.gif","bbdac9cda255c54bfd809110aff87898"],["images/lightgallery/video-play.png","dc34cc9c99e935cd9c88c036e34103f5"],["images/lightgallery/vimeo-play.png","dfe7764b4fe444c3880736ac6131f5b4"],["images/lightgallery/youtube-play.png","e6f0c233c87ddefab049c991c61e2d69"],["images/logo-ico.png","9c8c47c19fc96512e322d1067a763c64"],["images/logo.png","c8dfec5d02e88593b19f2c6e63340e37"],["images/portfolio/architecture.jpg","423ec2a0ce66bda75e50019bf5b77be1"],["images/portfolio/gallery/g-architecture.jpg","149a7cdbc0f58634f5bcea73834d559a"],["images/portfolio/gallery/g-minimalismo.jpg","35869aa83b3ec057a7355d38682ebb18"],["images/portfolio/gallery/g-salad.jpg","a5bb799f6e3cf73dd1de862cf2a87b89"],["images/portfolio/gallery/g-shutterbug.jpg","35a42e6fa393249003e3160408c99635"],["images/portfolio/gallery/g-skaterboy.jpg","f769e0777389e41ba6020b236ddf1301"],["images/portfolio/gallery/g-yellowwall.jpg","2431cb7f56a04412b2b86fa61c66d939"],["images/portfolio/minimalismo.jpg","eaf3729a6860b0d7eefc376a2f0753e5"],["images/portfolio/salad.jpg","7861785a02606e71334f3e3656e3f890"],["images/portfolio/shutterbug.jpg","1eb65b8fa2fa2fa65da2664f647ed746"],["images/portfolio/skaterboy.jpg","a08aa662c82b6c9a3f8ee97988b64a55"],["images/portfolio/yellowwall.jpg","7a422c0598d81cb8e69190fde33b9230"],["images/sample-image.jpg","387bc62fc2dee4e47e5f6564436a4866"],["images/services-bg.jpg","f0e21c79c088c8ae0c342c7be18b5b8b"],["images/shutterbug.jpg","b6038d57f88d30db742a88566d06e89f"],["images/speaking/sp1.jpg","21f17854354e68a3612ff617a0dc9c5f"],["images/speaking/sp2.jpg","dc2adefe8a26fdd15690ccec6f524672"],["images/speaking/sp3.jpg","edc6674404b2df84cd8a255c84d59fbe"],["images/speaking/sp4.jpg","bc05008cd56c0c36ba310da6754da3f6"],["images/speaking/sp5.jpg","52fd253cefee625d154cb11a2a67a35b"],["images/speaking/sp6.jpg","da409dbe4bae8c978504195e1a8fa8aa"],["images/speaking/sp7.jpg","927d9f956ce6c7aa1720a32ea049102b"],["images/speaking/sp8.jpg","a75571a15fd342de07df280a248ab353"],["images/speaking/sp9.jpg","7679ce130b277508d25451373421d193"],["images/website-opengraph/1200x630-og-image.png","eed12074c8ca3601235b48ef14e1c2e9"],["images/website-opengraph/favicon.ico","b1c5cd194a87cab17e3565b816f906b8"],["images/website-opengraph/logo-ico.png","9c8c47c19fc96512e322d1067a763c64"],["images/website-opengraph/logo.png","c8dfec5d02e88593b19f2c6e63340e37"],["inc/sendEmail.php","7a2a6042c6debe277a4f26cb26b72c64"],["index.html","7b4325ce1700857380d0793b37b400f2"],["js/bootstrap.js","fb81549ee2896513a1ed5714b1b1a0f0"],["js/bootstrap.min.js","e33b6ca092c1285745fefd617068a22e"],["js/cf-https-config.js","0ab74c7adc2339cd1e645260855fcad4"],["js/counter.js","fce7fd1924c570ab31311466a1df4325"],["js/custom-file-input.js","eb3420c12f06bef25ef1050f972c20f4"],["js/jquery-2.1.3.min.js","32015dd42e9582a80a84736f5d9a44d7"],["js/jquery.js","3c9137d88a00b1ae0b41ff6a70571615"],["js/main.js","a932aefa5b36736ee2439e0374db086e"],["js/modernizr.js","c6537b1adb7e309ed5da6b405191d3e9"],["js/pace.min.js","874d8be9cd6d6b72f1d63a5435edf2c3"],["js/plugins.js","d356666f7cdd4adc7d4ac782fa94e7c6"],["js/service-worker-handler.js","01ea2b3315b8b8e599d0ece5228671a9"],["send/success/assets/css/docs.min.css","ababa284ec86f79802c2cc0bb72865e4"],["send/success/assets/css/docs.min.css.map","b1ed74245285387e7937278a1dc0eaa2"],["send/success/assets/css/ie10-viewport-bug-workaround.css","631c61015480c581479c23afa0ab82da"],["send/success/assets/css/src/docs.css","fbe4262b9215cfd63aab8524384e1eda"],["send/success/assets/css/src/pygments-manni.css","a5f3edacafdfe02ed8f3279d84467ec8"],["send/success/assets/js/customize.min.js","f82d52fa39aa39dbcd33b0ac5a65e839"],["send/success/assets/js/docs.min.js","447e856332a6e7aefbfcca1234b30b6f"],["send/success/assets/js/ie-emulation-modes-warning.js","a40552917752e3b9dbf39a67177f8dc1"],["send/success/assets/js/ie10-viewport-bug-workaround.js","90e29070de7dcd28a451465ec74047be"],["send/success/assets/js/ie8-responsive-file-warning.js","de984b638bbc513f34a80bb8078b6a1d"],["send/success/assets/js/raw-files.min.js","e3e29ed3e4e9f571830895e497eba2ee"],["send/success/assets/js/src/application.js","bfc2e31e3b62845d4ee4191111bf1419"],["send/success/assets/js/src/customizer.js","f8de5e9641dad9ada7f1c284213f9e82"],["send/success/assets/js/vendor/Blob.js","4123823b350c1b40f7666ca54119ff3d"],["send/success/assets/js/vendor/FileSaver.js","118cea06079c94566d86f8cc20033656"],["send/success/assets/js/vendor/ZeroClipboard.min.js","b33d6b5868ea5815fb0a3f2c0165d72a"],["send/success/assets/js/vendor/anchor.min.js","64dff6848f1ca51e45dbe0da4c44a9fe"],["send/success/assets/js/vendor/autoprefixer.js","49aadb79369f63664a9146551e2e7be5"],["send/success/assets/js/vendor/holder.min.js","f8c6f52e723449480a11b9f4a8802f0a"],["send/success/assets/js/vendor/jquery.min.js","4f252523d4af0b478c810c2547a63e19"],["send/success/assets/js/vendor/jszip.min.js","88731e24340ce38647f6d595f0e464cb"],["send/success/assets/js/vendor/less.min.js","f491fcf8c8411f1e7062f34f690092f3"],["send/success/assets/js/vendor/uglify.min.js","de7af5db3a5f620335d9e5f3f4fb88f0"],["send/success/cover.css","5dd642df7e1959d25f8b897527b6ba06"],["send/success/dist/css/bootstrap-theme.css","b9b46bcc4dad6cc90fc4f95073c50735"],["send/success/dist/css/bootstrap-theme.css.map","d6cc0a3c7532b74efe92da8992bd7542"],["send/success/dist/css/bootstrap-theme.min.css","ab6b02efeaf178e0247b9504051472fb"],["send/success/dist/css/bootstrap-theme.min.css.map","5f587b800215ee268efd2676ac010b25"],["send/success/dist/css/bootstrap.css","2a31dca112f26923b51676cb764c58d5"],["send/success/dist/css/bootstrap.css.map","c7ffd8c7a285780039b2366034f3bca2"],["send/success/dist/css/bootstrap.min.css","ec3bb52a00e176a7181d454dffaea219"],["send/success/dist/css/bootstrap.min.css.map","35b79ebe0b7805c1c84524ad920faa33"],["send/success/dist/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["send/success/dist/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["send/success/dist/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["send/success/dist/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["send/success/dist/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["send/success/dist/js/bootstrap.js","fb81549ee2896513a1ed5714b1b1a0f0"],["send/success/dist/js/bootstrap.min.js","5869c96cc8f19086aee625d670d741f9"],["send/success/dist/js/npm.js","ccb7f3909e30b1eb8f65a24393c6e12b"],["send/success/index.html","45165126a4408e565a7f48e21a331faf"],["styles.html","b387b25a201e98dc06edd94ac56bbb82"],["zohoverify/verifyforzoho.html","fd749d3020f6ef359c76e8cae99963b2"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







