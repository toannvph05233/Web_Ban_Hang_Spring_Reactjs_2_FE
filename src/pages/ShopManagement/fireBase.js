// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey : "AIzaSyCR21ub_RXjnWoExl3sKHiKiR_z2SEyb-c" ,
    authDomain : "student-152fa.firebaseapp.com" ,
    projectId : "student-152fa" ,
    storageBucket : "student-152fa.appspot.com" ,
    messagingSenderId : "747107177064" ,
    appId : "1:747107177064:web:1ed1b3df1507f1add561dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);