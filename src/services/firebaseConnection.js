import{ initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVNayDsUtKWqG2X7apx_6PkWZX88Ax8YY",
    authDomain: "sistema-chamados-ad7d6.firebaseapp.com",
    projectId: "sistema-chamados-ad7d6",
    storageBucket: "sistema-chamados-ad7d6.appspot.com",
    messagingSenderId: "203097929514",
    appId: "1:203097929514:web:2fc4d0fd53214d5ca05053",
    measurementId: "G-4BDC5N4K23"
};


  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  export {db, auth};