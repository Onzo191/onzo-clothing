import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA-fUJxDTXMMm1tbNKMLC_d5sMkpP1L3-c',
  authDomain: 'onzo-clothing-db.firebaseapp.com',
  projectId: 'onzo-clothing-db',
  storageBucket: 'onzo-clothing-db.appspot.com',
  messagingSenderId: '17844851051',
  appId: '1:17844851051:web:4e35e19c6e2c3317603c2e',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log('error creating  the user', error.message);
    }

    return userDocRef;
  }
};
