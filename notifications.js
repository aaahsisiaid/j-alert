import { messaging, db, auth } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getToken } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js";

// あなたの VAPID KEY
const VAPID_KEY = "MxvVFjGwvEqhEb5q7oUEceeyUQ3HK6KRR-nVbM2r9I4";

document.getElementById("test-notify").onclick = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        alert("通知が許可されていません！");
        return;
    }

    // FCM トークン取得
    const token = await getToken(messaging, {
        vapidKey: VAPID_KEY
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
        token: token,
        updated: Date.now()
    }, { merge: true });

    alert("通知受信の準備OK！");
};
