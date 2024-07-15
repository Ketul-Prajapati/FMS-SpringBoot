
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "add apikey here",
    authDomain: "csproconnect-f40a5.firebaseapp.com",
    projectId: "csproconnect-f40a5",
    storageBucket: "csproconnect-f40a5.appspot.com",
    messagingSenderId: "579282644402",
    appId: "1:579282644402:web:adab4e2fa6deb4d6b1c8ab",
    measurementId: "G-7LPWZZ7WTB"
  }


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
