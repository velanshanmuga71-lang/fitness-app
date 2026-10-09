import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBbmhydazm6Cnj4c6AzwHGr0ZUo3UKVkos",
  authDomain: "vfit-20fc8.firebaseapp.com",
  projectId: "vfit-20fc8",
  storageBucket: "vfit-20fc8.firebasestorage.app",
  messagingSenderId: "704394545952",
  appId: "1:704394545952:web:4ee27ab86557f415afa545",
  measurementId: "G-9CG1TXC3T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save complete user state to Firestore
export const saveToCloud = async (data) => {
  try {
    const userDocRef = doc(db, "vfit_data", "velan");
    await setDoc(userDocRef, {
      ...data,
      lastSyncedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Cloud sync deferred (offline or permission issue):", err);
    return false;
  }
};

// Load user state from Firestore
export const loadFromCloud = async () => {
  try {
    const userDocRef = doc(db, "vfit_data", "velan");
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.warn("Failed to fetch cloud backup:", err);
    return null;
  }
};
