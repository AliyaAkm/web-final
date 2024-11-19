document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form submission reload

            // Get input values
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const passwordRepeat = document.getElementById('regPasswordRepeat').value.trim();

            if (!username || !password || !passwordRepeat) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== passwordRepeat) {
                alert('Passwords do not match.');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some((user) => user.username === username)) {
                alert('Username already exists! Please choose another one.');
                return;
            }

            // Add new user
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! You can now log in.');
            registerForm.reset();
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form submission reload

            // Get input values
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            if (!username || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((user) => user.username === username && user.password === password);

            if (user) {
                // Save logged-in user to localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful!');
                window.location.href = 'profile.html'; // Redirect to profile page
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }
});