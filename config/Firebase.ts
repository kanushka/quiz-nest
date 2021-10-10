import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiemyQPrYyR9VI33v87syni6h6Fwp8--Q",
    authDomain: "quiz-nest-73adb.firebaseapp.com",
    projectId: "quiz-nest-73adb",
    storageBucket: "quiz-nest-73adb.appspot.com",
    messagingSenderId: "914527178068",
    appId: "1:914527178068:web:169b1fc66b345213184cc1",
    measurementId: "G-YB5SHNL2NK",
};

let Firebase: firebase.app.App;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;