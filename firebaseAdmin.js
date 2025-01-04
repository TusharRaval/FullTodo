const admin = require("firebase-admin");
const serviceAccount = require("./todos-46a7e-firebase-adminsdk-yod24-2d07d5d655.json"); // Use your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const tasksCollection = db.collection("tasks");

module.exports = { db, tasksCollection };
