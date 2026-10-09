import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Sign In with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Google login error:", error);
    return { user: null, error: error.message };
  }
};

// Sign Out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

// Save user data to Firestore under their unique user ID
export const saveUserCloudData = async (userId, data) => {
  if (!userId) return false;
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      ...data,
      lastSyncedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Cloud sync deferred (offline or error):", err);
    return false;
  }
};

// Load user data from Firestore for a specific user ID
export const loadUserCloudData = async (userId) => {
  if (!userId) return null;
  try {
    const userDocRef = doc(db, "users", userId);
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
