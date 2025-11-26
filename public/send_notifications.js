
// send_notifications.js
const fs = require('fs');
const admin = require('firebase-admin');

(async ()=>{
  try {
    const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (!b64) throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 が設定されていません');
    const json = Buffer.from(b64, 'base64').toString('utf8');
    const cred = JSON.parse(json);

    admin.initializeApp({ credential: admin.credential.cert(cred) });
    const db = admin.firestore();

    const now = admin.firestore.Timestamp.now();
    // 未送信で notifyAt <= now のドキュメントを取得
    const snaps = await db.collection('schedules').where('sent','==',false).where('notifyAt','<=',now).limit(200).get();
    if (snaps.empty) { console.log('No schedules to send'); return; }

    // 端末トークン全取得（簡易実装：全トークンに送る）
    const tokenDocs = await db.collection('device_tokens').get();
    const tokens = tokenDocs.docs.map(d => d.id).filter(Boolean);
    if (!tokens.length) { console.log('No device tokens'); return; }

    for (const doc of snaps.docs) {
      const data = doc.data();
      const payload = {
        notification: {
          title: 'J-Alert 訓練通知',
          body: data.text || '訓練があります。'
        },
        data: { scheduleId: doc.id }
      };

      // 500トークンまでまとめて送れる
      const BATCH = 400;
      for (let i=0;i<tokens.length;i+=BATCH) {
        const batch = tokens.slice(i,i+BATCH);
        const res = await admin.messaging().sendToDevice(batch, payload);
        console.log('Sent batch', i/BATCH, res.results && res.results.length);
      }

      // 送信済みに更新（再送防止）
      await doc.ref.update({ sent: true, sentAt: admin.firestore.FieldValue.serverTimestamp() });
    }
    console.log('Done');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
