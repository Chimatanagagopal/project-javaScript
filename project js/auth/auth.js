
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
            apiKey: "AIzaSyAoCm5AphFAh-UkUzc2_B7X5SraWFniNtI",
            authDomain: "games-f2f3c.firebaseapp.com",
            projectId: "games-f2f3c",
            storageBucket: "games-f2f3c.appspot.com",
            messagingSenderId: "252276335571",
            appId: "1:252276335571:web:def8db66aee5e8dacd8526",
            measurementId: "G-E662114154"
};

function showToast(message, duration = 3000) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, duration);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    // Signup
    const signupButton = document.getElementById("btn1");
    if (signupButton) {
        signupButton.addEventListener("click", function () {
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    showToast("Signup successful!");
                    alert("Signup successful!");
                   
                    
                    console.log("User:", userCredential.user);
                    window.location.href = "login.html"; 
                })
                .catch((error) => {
                    // alert(`Signup failed: ${error.message}`);
                    showToast(`Signup failed: ${error.message}`);
                });
        });
    }

    // Login
    const loginButton = document.getElementById("btn2");
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            let email = document.getElementById("emaillogin").value.trim();
            let password = document.getElementById("passwordlogin").value.trim();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // showToast("Login successful!");
                    alert("Login successful!");
                    window.location.href = "./Games/again/games.html"; 

                    console.log("User:", userCredential.user);
                })
                .catch((error) => {
                    alert(`Login failed: ${error.message}`);
                    
                });
        });
    }

    // Forgot Password
    const forgotPasswordButton = document.getElementById("forgotPasswordBtn");
    if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener("click", function () {
            let email = prompt("Enter your email to reset password:");
            if (email) {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        alert("Password reset email sent!");
                        

                    })
                    .catch((error) => {
                       alert(`Error: ${error.message}`);
                    });
            }
        });
    }
});
