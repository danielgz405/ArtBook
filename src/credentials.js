// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvfanNZAf8nFmXmfxQK9mIvtgV7ZUylvY',
  authDomain: 'art-book-48c79.firebaseapp.com',
  projectId: 'art-book-48c79',
  storageBucket: 'art-book-48c79.appspot.com',
  messagingSenderId: '913509393696',
  appId: '1:913509393696:web:4948b89144c0b8e03c2345',
  measurementId: 'G-C63DZ3WBD1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
