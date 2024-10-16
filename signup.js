document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists. Please choose a different username.');
    } else {

        existingUsers.push({ username, password });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);

        alert('User registered successfully! You are now logged in.');
        window.location.href = 'index.html';
    }
});

