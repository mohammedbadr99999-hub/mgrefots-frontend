import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlGfYkINIo-4ncILVOOMbfi7CaaCdjeZQ",
  authDomain: "mgrefots.firebaseapp.com",
  projectId: "mgrefots",
  storageBucket: "mgrefots.firebasestorage.app",
  messagingSenderId: "559063887956",
  appId: "1:559063887956:web:d3aebcf7bc387546d27dc1",
  measurementId: "G-KV8HX8CQ84"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export { firebase };
