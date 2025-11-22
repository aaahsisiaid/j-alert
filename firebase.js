// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// あなたの Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyCeHtJQZfQBTv4TfZ7pF_qFFTk0Y81koq8",
  authDomain: "j-alert-1bb3c.firebaseapp.com",
  projectId: "j-alert-1bb3c",
  storageBucket: "j-alert-1bb3c.firebasestorage.app",
  messagingSenderId: "591499092612",
  appId: "1:591499092612:web:effb0f2e115b0d1f5c58d1",
  measurementId: "G-ZC1PWP3KLN"
};

// Firebase 初期化
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const auth = getAuth(app);

// 匿名ログイン
signInAnonymously(auth);
