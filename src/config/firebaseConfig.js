import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDolOZMc-UodjynPUfkjyrq9m95VO3Peck",
    authDomain: "task-picker-de255.firebaseapp.com",
    databaseURL: "https://task-picker-de255.firebaseio.com",
    projectId: "task-picker-de255",
    storageBucket: "task-picker-de255.appspot.com",
    messagingSenderId: "614294430544"
  };
  firebase.initializeApp(config);
  firebase.firestore();