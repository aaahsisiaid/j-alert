/* firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// ここにも firebaseConfig を入れるか、クライアント側で使っているプロジェクトIDと同じプロジェクトであれば省略可能
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeHtJQZfQBTv4TfZ7pF_qFFTk0Y81koq8",
  authDomain: "j-alert-1bb3c.firebaseapp.com",
  projectId: "j-alert-1bb3c",
  storageBucket: "j-alert-1bb3c.firebasestorage.app",
  messagingSenderId: "591499092612",
  appId: "1:591499092612:web:effb0f2e115b0d1f5c58d1",
  measurementId: "G-ZC1PWP3KLN"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// バックグラウンドで受け取ったメッセージのハンドリング
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const title = payload.notification?.title || 'J-Alert';
  const options = {
    body: payload.notification?.body || '',
    // icon: '/icons/icon-192.png',
    // badge: '/icons/badge-72.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

