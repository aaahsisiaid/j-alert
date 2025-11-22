import { db, auth } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

document.getElementById("save").onclick = async () => {
    const uid = auth.currentUser.uid;

    await setDoc(
        doc(db, "users", uid, "settings", "jalert"),
        {
            date: document.getElementById("training-date").value,
            daysBefore: Number(document.getElementById("days-before").value),
            notifyTime: document.getElementById("notify-time").value
        },
        { merge: true }
    );

    alert("保存しました！");
};
