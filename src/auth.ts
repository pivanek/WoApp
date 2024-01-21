import { getApp, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, getFirestore, initializeFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX",
  appId: "XXX",
  measurementId: "XXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const database = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

export default auth;
