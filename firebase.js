// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseClonfig = {

    apiKey : "AIzaSyCzZsj42BVTYD_FZYcsyu4jGCMnHwERSEU" ,
    authDomain : "students-2950f.firebaseapp.com" ,
    projectId : "students-2950f" ,
    storageBucket : "students-2950f.appspot.com" ,
    messagingSenderId : "1090823057936" ,
    appId : "1:1090823057936:web:d279b33b41d740c48f5095"

};

// Initialize Firebase
export const app = initializeApp(firebaseClonfig);
export const storage = getStorage(app);