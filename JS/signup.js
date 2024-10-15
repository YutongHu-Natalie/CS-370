import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"
import { getFirestore, doc, getDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from   "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"; 

//error pop-ups
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
// Function to open the popup

function openPopup() {
    popup.style.display = 'block';
}
// Function to close the popup
function closePopupFunc() {
    popup.style="display: none";
}
// Event listeners
// Close the popup when the close button is clicked
closePopup.addEventListener('click', closePopupFunc);
// Close the popup when clicking outside the popup content
popupOverlay.addEventListener('click', function (event) {
    if (event.target === popupOverlay) {
        closePopupFunc();
    }
});


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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

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
            // console.log(cred.user);
            // console.log("user creation");
            // console.log(db);
            
            const user = cred.user;
            const usersCollection = collection(db, 'userProfile'); 
            // console.log("userCollection", usersCollection);

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
        }
    ).catch ((e) =>{
        if (e.code === 'auth/email-already-in-use') {
            const element = document.getElementById("signupErrorContent");
            element.textContent = "This user already exists!"; 
            openPopup();
            //alert("This user already exists!");
        } else if (e.code === 'auth/invalid-email') {
            const element = document.getElementById("signupErrorContent");
            element.textContent = "Invalid email!"; 
            openPopup();
            //alert("Invalid email.");
        } else if (e.code === 'auth/weak-password') {
            const element = document.getElementById("signupErrorContent");
            element.textContent = "Invalid password! Must be longer than 6 characters."; 
            openPopup();
            alert("Invalid password. Must be longer than 6 characters.");
        } else if (e.code === 'auth/invalid-password') {
            const element = document.getElementById("signupErrorContent");
            element.textContent = "Invalid password!"; 
            openPopup();
            alert("Invalid password!");
        }else {
            const element = document.getElementById("signupErrorContent");
            element.textContent = e.message; 
            openPopup();
            //alert(e.message);
        }    
    });
} ); //when the form submits, we want to add their user if it doesn't exist

