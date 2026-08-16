const CACHE_NAME = 'canary-app-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './canary.html',
  './hasoon.html',
  './breed.html',
  './system.html',
  './tahjeen.html',
  './train.html',
  './qa.html',
  './gift.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// تثبيت ملف الخدمة وحفظ الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استرجاع الملفات من التخزين المؤقت عند عدم وجود إنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});