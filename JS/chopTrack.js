import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyDP_5nrM0oNpYJlQ7EBFh9wGOT8HVRSarI",
    authDomain: "choptrack-801d8.firebaseapp.com",
    databaseURL: "https://choptrack-801d8-default-rtdb.firebaseio.com",
    projectId: "choptrack-801d8",
    storageBucket: "choptrack-801d8.appspot.com",
    messagingSenderId: "724720116664",
    appId: "1:724720116664:web:7ea82bb915f2cdc8cfe54d",
    measurementId: "G-JBXRZVJ8ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);


    // Add Item Button Click Event
    document.getElementById('add_item_button').addEventListener('click', function(e) {
        e.preventDefault();  // Prevent default form submission
            
        // Get form data
        const foodName = document.getElementById('food_name').value;
        const expirationDate = document.getElementById('expir_date').value;
        const notify = document.getElementById('notify').checked;

        console.log(foodName);

        const db = getDatabase();
        set(ref(db), {
            food_name: foodName,
            expiration_date: expirationDate,
            notify: notify

        })
    

                        
    })
})