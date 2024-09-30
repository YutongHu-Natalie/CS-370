// import { auth } from "firebaseui";
//sign-up
const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) =>{
    //prevent default action of submission
    e.preventDefault();

    const email = signupform[`signup-email`].value;
    const password = signupform[`signup-password`].value;
    
    //sign up the user given the details
    auth2.createUserWithEmailAndPassword(email, password).then(
        cred => {
            console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupform.reset();
        }
    );


} ); //when the form submits, we want to add their user if it doesn't exist

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signed out");
    });
});