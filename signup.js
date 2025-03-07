// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD36qSJ8YAPc3A4FL9jlBGlpiWwj530SPQ",
  authDomain: "guessthesinger10.firebaseapp.com",
  databaseURL: "https://guessthesinger10-default-rtdb.firebaseio.com",
  projectId: "guessthesinger10",
  storageBucket: "guessthesinger10.firebasestorage.app",
  messagingSenderId: "97201023235",
  appId: "1:97201023235:web:ab111d9acb43ef7d4be136",
  measurementId: "G-3R005HTKEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const database = getDatabase(app); // Firebase Realtime Database

// Listen for form submission
document.getElementById('signupForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();  // Prevent default form submission (page reload)

  // Get form values
  var newUsername = getElementVal('newUsername');
  var newEmail = getElementVal('newEmail');
  var newPassword = getElementVal('newPassword');

  // Create the user in Firebase Authentication
  createUserWithEmailAndPassword(auth, newEmail, newPassword)
    .then((userCredential) => {
      // User successfully created
      const user = userCredential.user;
      console.log('User created: ', user);

      // Save additional user info in the Realtime Database under their userId.
      saveUserInfo(newUsername, newEmail, user.uid);

      // Redirect to the login page (or directly to your game page if desired)
      window.location.href = 'login.html';
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode}, ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    });
}

// Function to save the user's info in the Realtime Database
const saveUserInfo = (newUsername, newEmail, userId) => {
  // Reference to a database path specific to this user
  const userRef = ref(database, 'signupForm/' + userId);
  
  // Save the user's username, email, and uid
  set(userRef, {
    newUsername: newUsername,
    newEmail: newEmail,
    userId: userId
  });
};

// Helper function to get values from form elements by id
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
