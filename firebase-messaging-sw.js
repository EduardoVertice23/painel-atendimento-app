importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAF-XHOh4SqOtBBTXPdTSnoolujiTCquSc",
  authDomain: "atendimentoclientebv-658e7.firebaseapp.com",
  projectId: "atendimentoclientebv-658e7",
  storageBucket: "atendimentoclientebv-658e7.firebasestorage.app",
  messagingSenderId: "641137924211",
  appId: "1:641137924211:web:30adb0e6924abed1b7b206"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Atendimento pendente';
  const body = (payload.notification && payload.notification.body) || '';
  self.registration.showNotification(title, {
    body,
    icon: 'icon-192.png'
  });
});
