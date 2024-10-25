import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {

  apiKey: "AIzaSyBXTg9LiVe7-LVHl9PdL0gcRqoMQlz76GI",

  authDomain: "gallery-updated.firebaseapp.com",

  projectId: "gallery-updated",

  storageBucket: "gallery-updated.appspot.com",

  messagingSenderId: "1096969150047",

  appId: "1:1096969150047:web:114e8c1546ee7bff2ac5ea"

};


const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app)
const firebaseFirestore = getFirestore(app)
const firebaseAuth = getAuth(app)
export {firebaseStorage ,firebaseFirestore , firebaseAuth}


