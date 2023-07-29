"use strict"; // Start of use strict

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcWqS3PC4HQd9db5-qX_ZvP1uk055TG0c",
    authDomain: "articles-extraction.firebaseapp.com",
    projectId: "articles-extraction",
    storageBucket: "articles-extraction.appspot.com",
    messagingSenderId: "138442253622",
    appId: "1:138442253622:web:c84ac66b58b66254747f97",
    measurementId: "G-PL1X7KN8FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);