// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//ver8 initialization:
//import firebase from 'firebase/app'

import { getStorage } from 'firebase/storage';
import { getFirestore, collection, query, orderBy } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.API_KEY",
  authDomain: "simple-gallery-1ebfa.firebaseapp.com",
  projectId: "simple-gallery-1ebfa",
  storageBucket: "simple-gallery-1ebfa.appspot.com",
  messagingSenderId: "790289855917",
  appId: "1:790289855917:web:635c4dfd1262c08cdedd24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//we assign initializeApp to a variable to pass into other firebase service functions
//ver 8:
//firebase.initializeApp(firebaseConfig)

//connecting app to firestore and storage
export const db = getFirestore(app);
export const storage = getStorage(app);
export const collectionRef = collection(db, 'images');
export const q = query(collectionRef, orderBy('createdAt', 'desc'));



