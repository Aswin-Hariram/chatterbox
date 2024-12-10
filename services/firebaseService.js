
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {  getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
 

const firebaseConfig = {
    apiKey: "AIzaSyA2wsKUR63Eom7xckzfEEMJkw2iKQrwOQM",
    authDomain: "chatapp-7f329.firebaseapp.com",
    projectId: "chatapp-7f329",
    storageBucket: "chatapp-7f329.firebasestorage.app",
    messagingSenderId: "904337106724",
    appId: "1:904337106724:web:6d73c53ae710edf54af5b1",
    measurementId: "G-67FMQR903C"
};

let auth;
let firedb
let app
if (getApps().length === 0) {
     app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)

    })
    firedb=getFirestore(app)
}
else{
    auth=getAuth();
    firedb=getFirestore();
    
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
    
}
export const fserv = {
    mauth:auth,
    db:firedb,

    
}
export const fire = firebase;
export const storage = getStorage(getApp(), "gs://chatapp-7f329.firebasestorage.app");
