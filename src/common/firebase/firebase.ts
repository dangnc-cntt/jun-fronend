import firebase from "firebase/compat";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBw9q46vC8AldGOeBZRSG3lzNl6EL95YVE",
    authDomain: "jun-shop-24c25.firebaseapp.com",
    projectId: "jun-shop-24c25",
    storageBucket: "jun-shop-24c25.appspot.com",
    messagingSenderId: "931215950321",
    appId: "1:931215950321:web:9bfe3e61ab30ba88c10450",
    measurementId: "G-6N3DX80J7C"
};

firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export {storage, firebase as default};