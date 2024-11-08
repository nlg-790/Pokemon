document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const users = JSON.parse(localStorage.getItem('users')) || [];


    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
       
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('email', email);
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});


