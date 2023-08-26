// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQB69jq37TxbXyw5PQ4fRa-tqYf6V2shA",
  authDomain: "uploadingfile-aa4c7.firebaseapp.com",
  projectId: "uploadingfile-aa4c7",
  storageBucket: "uploadingfile-aa4c7.appspot.com",
  messagingSenderId: "627374767395",
  appId: "1:627374767395:web:24aad25a653c5b5140a096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);