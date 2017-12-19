---
layout: post
lang: en
ref: service-workers
title: Service Workers
image: /assets/images/posts/service-workers.jpg
medium: 
description: Site users are often faced with a problem of websites taking too much time to load in high latency and low bandwidth internet. With a Service Worker, you can now cache your whole website and load it even without internet. Web applications like Progressive Web Apps (PWA) utilize this technology to make a web app's contents work offline. Read my blog on how to build one.
---

> What is a service worker?

A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers will support other things like periodic sync or geofencing. The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responses. The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

Below is an overly simplified version of the service worker lifecycle on its first installation: 

![Service Worker Lifecycle](/assets/images/posts/body/sw-lifecycle-thumbnail.jpg "Service Worker Lifecycle")

My website [homepage](https://www.marcreyes.ph) now has a service worker. A snackbar notification will indicate whether or not the site caching was successfully achieved. Normally, service workers don't work on webpages that are not served over https so the secure homepage site is an advantage. Caching usually takes around 5-10 seconds to finish depending on the speed of your connection. Once done, turn off your internet connection and check whether the site still loads. Below is a sample of working and properly loaded portfolio content: 

![Sample Service Worker Lifecycle](/assets/images/posts/body/sw-working-thumbnail.jpg "Sample Service Worker Lifecycle")

You may also have the option to save it on your phone home screen like a native app. Yes, it works! Service workers will be added to all marcreyes.ph webpages, soon. 

---

Read more about service workers on the **[Google Developers](https://developers.google.com/web/fundamentals/getting-started/primers/)** page.