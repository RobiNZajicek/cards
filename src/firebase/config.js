import firebase from "firebase/app"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCNxXB0LjRssXWONk8ccsruuMbUx0Ovydk",
    authDomain: "card-musle.firebaseapp.com",
    projectId: "card-musle",
    storageBucket: "card-musle.appspot.com",
    messagingSenderId: "221901629872",
    appId: "1:221901629872:web:a105d5dc05ae4ac0038e75"
};


// počáteční nastavení firebase (init)
firebase.initializeApp(firebaseConfig)


// počáteční nastavení služeb (services)
const projectFirestore = firebase.firestore()


export { projectFirestore }