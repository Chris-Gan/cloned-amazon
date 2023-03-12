import admin from "firebase-admin";
// import { getApps } from "firebase-admin/app";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// if (!getApps().length) {
//   admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// }

const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  : admin.app();

// const adminDb = admin.firestore();
const adminDb = app.firestore();

export { adminDb };
