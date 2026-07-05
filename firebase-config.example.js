// ============================================================
// Firebase Config — copiá este archivo como firebase-config.js
// y reemplazá con los datos de tu proyecto
// ============================================================

var firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID'
};

var db, auth, storage;

try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  auth = firebase.auth();
  storage = firebase.storage();
  if (db.settings) db.settings({ merge: true });
} catch (e) {
  console.warn('Firebase no configurado — usando datos estáticos');
}
