// Service Worker for Pomodoro Timer
const CACHE_NAME = 'pomodoro-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/notification.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

let timer = null;
let timeLeft = 0;
let isRunning = false;
let mode = 'work';

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'START_TIMER':
      timeLeft = payload.timeLeft;
      mode = payload.mode;
      isRunning = true;
      if (!timer) {
        timer = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage({ type: 'TIMER_TICK', payload: timeLeft });
              });
            });
          } else {
            clearInterval(timer);
            timer = null;
            isRunning = false;
            self.registration.showNotification('Pomodoro Timer', {
              body: `${mode === 'work' ? 'Work session' : 'Break'} completed!`,
              icon: '/pomodoro-icon.svg',
              badge: '/pomodoro-icon.svg',
              vibrate: [200, 100, 200]
            });
          }
        }, 1000);
      }
      break;
    case 'PAUSE_TIMER':
      isRunning = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      break;
    case 'RESET_TIMER':
      isRunning = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      timeLeft = payload.timeLeft;
      mode = payload.mode;
      break;
  }
});