/* keydown*/
document.addEventListener('keydown', (event) => {
    const key = event.key;

    switch (key) {
        case '1':

            window.location.href = 'index.html';
            break;
        case '2':

            window.location.href = 'review.html';
            break;
        case '3':

            window.location.href = 'releases.html';
            break;
        case '4':

            window.location.href = 'contact.html';
            break;
        default:
            break;
    }
});

// Handle form navigation and validation
var Form1 = document.getElementById("Form1");
var Form2 = document.getElementById("Form2");
var Form3 = document.getElementById("Form3");

var Next1 = document.getElementById("Next1");
var Next2 = document.getElementById("Next2");
var Back1 = document.getElementById("Back1");
var Back2 = document.getElementById("Back2");

var progress = document.getElementById("progress");

// Save form data to local storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function loadFromLocalStorage(key) {
    return localStorage.getItem(key) || '';
}

// Helper function to show error messages
function showError(input, message) {
    const parent = input.parentElement;
    const error = document.createElement('small');
    error.style.color = 'red';
    error.textContent = message;
    parent.appendChild(error);
    input.classList.add('is-invalid');  
}

// Helper function to clear errors
function clearErrors(form) {
    const invalidInputs = form.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => input.classList.remove('is-invalid'));

    const errors = form.querySelectorAll('small');
    errors.forEach(error => error.remove());
}

// Email format validation using regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Validate Form1 (email, username, and message)
function validateForm1() {
    clearErrors(Form1);
    let isValid = true;

    const email = Form1.querySelector('input[placeholder="Email"]');
    const username = Form1.querySelector('input[placeholder="User name"]');
    const message = Form1.querySelector('textarea');

    if (email.value === '' || !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    }

    if (username.value === '') {
        showError(username, 'Username is required.');
        isValid = false;
    }

    if (message.value === '') {
        showError(message, 'Message is required.');
        isValid = false;
    }

    return isValid;
}

// Validate Form2 (name, surname, and additional information)
function validateForm2() {
    clearErrors(Form2);
    let isValid = true;

    const name = Form2.querySelector('input[placeholder="Name"]');
    const surname = Form2.querySelector('input[placeholder="Surname"]');
    const additionalInfo = Form2.querySelector('textarea');

    if (name.value === '') {
        showError(name, 'Name is required.');
        isValid = false;
    }

    if (surname.value === '') {
        showError(surname, 'Surname is required.');
        isValid = false;
    }

    if (additionalInfo.value === '') {
        showError(additionalInfo, 'Additional information is required.');
        isValid = false;
    }

    return isValid;
}

// Handle "Next" and "Back" buttons
Next1.onclick = function() {
    if (validateForm1()) {
        // Save Form1 data to local storage
        const email = Form1.querySelector('input[placeholder="Email"]').value;
        const username = Form1.querySelector('input[placeholder="User name"]').value;
        const message = Form1.querySelector('textarea').value;

        saveToLocalStorage('email', email);
        saveToLocalStorage('username', username);
        saveToLocalStorage('message', message);

        // Navigate to Form2
        Form1.style.left = "-560px";
        Form2.style.left = "50px";
        progress.style.width = "334px";
    }
};

Back1.onclick = function() {
    // Navigate back to Form1
    Form1.style.left = "50px";
    Form2.style.left = "560px";
    progress.style.width = "167px";
};

Next2.onclick = function() {
    if (validateForm2()) {
        // Save Form2 data to local storage
        const name = Form2.querySelector('input[placeholder="Name"]').value;
        const surname = Form2.querySelector('input[placeholder="Surname"]').value;
        const additionalInfo = Form2.querySelector('textarea').value;

        saveToLocalStorage('name', name);
        saveToLocalStorage('surname', surname);
        saveToLocalStorage('additionalInfo', additionalInfo);

        // Navigate to Form3
        Form2.style.left = "-560px";
        Form3.style.left = "50px";
        progress.style.width = "501px";
    }
};

Back2.onclick = function() {
    // Navigate back to Form2
    Form2.style.left = "50px";
    Form3.style.left = "560px";
    progress.style.width = "334px";
};

// Load saved data from local storage when the page is loaded
window.onload = function() {
    // Load Form1 data
    Form1.querySelector('input[placeholder="Email"]').value = loadFromLocalStorage('email');
    Form1.querySelector('input[placeholder="User name"]').value = loadFromLocalStorage('username');
    Form1.querySelector('textarea').value = loadFromLocalStorage('message');

    // Load Form2 data
    Form2.querySelector('input[placeholder="Name"]').value = loadFromLocalStorage('name');
    Form2.querySelector('input[placeholder="Surname"]').value = loadFromLocalStorage('surname');
    Form2.querySelector('textarea').value = loadFromLocalStorage('additionalInfo');
};

// Handle form submission with validation
Form3.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Clear local storage
    localStorage.clear();

    // Alert the user and refresh the page after submission
    alert('Form submitted successfully! The page will now refresh.');

    // Refresh the page after successful submission
    window.location.reload();
});