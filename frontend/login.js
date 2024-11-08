document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    const users = JSON.parse(localStorage.getItem('users')) || [];


    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
       
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});


