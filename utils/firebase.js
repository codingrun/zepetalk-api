import firebase from "firebase";
require("firebase/auth");
require("firebase/database");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.GA_APIKEY,
    authDomain: "junction-hack.firebaseapp.com",
    databaseURL: "https://junction-hack.firebaseio.com/",
    // projectId: "<your-cloud-firestore-project>",
    // storageBucket: "<your-storage-bucket>",
    // messagingSenderId: "<your-sender-id>",
  });
}

export default firebase;
