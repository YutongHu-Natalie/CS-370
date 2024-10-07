import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from   "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyC0ZUVo-XpFuatRsPbKibyrUiuO29n6msI",
    authDomain: "chopchop-49d57.firebaseapp.com",
    projectId: "chopchop-49d57",
    storageBucket: "chopchop-49d57.appspot.com",
    messagingSenderId: "290107923557",
    appId: "1:290107923557:web:6e6723a8b49d167982ba8c"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
//tracking of user authentication status
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user){
        console.log("user logged in: ", user);
        let elements = document.querySelectorAll(".logged-out");
        console.log(elements);
        elements.forEach(element =>{
            element.style = 'display:none;'
        });
        elements = document.querySelectorAll(".logged-in");
        elements.forEach(element =>{
            element.style = 'display:compact;';
        });
        
    }
    else{
        console.log("user logged out");
        let elements = document.querySelectorAll(".logged-in");
        console.log(elements);
        elements.forEach(element =>{
            element.style = 'display:none;';
        });
        elements = document.querySelectorAll(".logged-out");
        elements.forEach(element =>{
            element.style = 'display:compact;';
        });
    }
});

//sign-up
const signupform = document.querySelector('#signup-form');

signupform.addEventListener('submit', (e) =>{
    //prevent default action of submission
    e.preventDefault();

    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;
    const name = signupform['signup-name'].value;
    const number = signupform['signup-number'].value;
        //sign up the user given the details
    createUserWithEmailAndPassword(auth, email, password).then(
        cred => {
            console.log(cred.user);
            console.log("user creation");
            console.log(db);
            const modal = document.querySelector('#modal-signup');
            
            const user = cred.user;
            const usersCollection = collection(db, 'userProfile'); 
            console.log("userCollection", usersCollection);

            const docRef = doc(usersCollection, user.uid); 
            const data = {
                name: name,
                phoneNumber: number,
            }
            try {
                const docdoc = setDoc(docRef, data);
                console.log("Document written with ID: ", docdoc.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            M.Modal.getInstance(modal).close();
            signupform.reset();
        }
    ).catch ((e) =>{
        if (e.code === 'auth/email-already-in-use') {
            alert("This user already exists!");
        } else if (e.code === 'auth/invalid-email') {
            alert("Invalid email.");
        } else if (e.code === 'auth/weak-password') {
            alert("Invalid password. Must be longer than 6 characters.");
        } else if (e.code === 'auth/invalid-password') {
            alert("Invalid password!");
        }else {
            alert(e.message);
        }    
    });

} ); //when the form submits, we want to add their user if it doesn't exist

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//login
// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  signInWithEmailAndPassword(auth, email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
      }).catch ((e) =>{
        if (e.code === 'auth/invalid-email') {
            alert("Invalid email.");
        } else if (e.code === 'auth/user-not-found') {
            alert("User not found.");
        } else if (e.code === 'auth/invalid-credential') {
            alert("Incorrect email or password.");
        } else {
            alert(e.message);
        }   
    });
  

});