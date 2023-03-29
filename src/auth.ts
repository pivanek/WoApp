import { getApp, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, getFirestore, initializeFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBR7iakNAphBci9qfDrViIciRkr-YRL0GU",
  authDomain: "woapp-3b522.firebaseapp.com",
  projectId: "woapp-3b522",
  storageBucket: "woapp-3b522.appspot.com",
  messagingSenderId: "74787447481",
  appId: "1:74787447481:web:a663f67a4c401e5ddcf168",
  measurementId: "G-R079BK8KFW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const database = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

export default auth;
