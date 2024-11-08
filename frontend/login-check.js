document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const username = localStorage.getItem('username');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginForm = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const logoutButton = document.getElementById('logout-button');

    if (loggedIn) {
        if (welcomeMessage) {
            welcomeMessage.innerHTML = `Welcome, ${username}!`;
        }
        if (loginForm) {
            loginForm.style.display = 'none';
        }
        if (signupLink) {
            signupLink.style.display = 'none';
        }
        if (logoutButton) {
            logoutButton.style.display = 'block';
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('username');
                window.location.href = 'index.html';
            });
        }
    } else {
        if (welcomeMessage) {
            welcomeMessage.innerHTML = '';
        }
        if (loginForm) {
            loginForm.style.display = 'block';
        }
        if (signupLink) {
            signupLink.style.display = 'block';
        }
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
    }
});
