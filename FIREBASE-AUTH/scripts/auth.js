//making some things visible when logged in
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user){
        console.log("user logged in: ", user);
    }
    else{
        console.log("user logged out");
    }
});




//sign-up
const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) =>{
    //prevent default action of submission
    e.preventDefault();

    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;
    
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
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});