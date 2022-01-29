import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA_tGru-SFJTaEleQ9K4m6DzRe1vQsonCY",
    authDomain: "kanbandojo.firebaseapp.com",
    projectId: "kanbandojo",
    storageBucket: "kanbandojo.appspot.com",
    messagingSenderId: "220417114068",
    appId: "1:220417114068:web:9fa24f4885bfdf72d36041"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage}