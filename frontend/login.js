// document.getElementById('login-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/users/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('loggedIn', 'true');
//             localStorage.setItem('email', email);
//             alert('Login successful!');
//             window.location.href = 'index.html';
//         } else {
//             alert(data.error);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred during login. Please try again.');
//     }
// });
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Save token in localStorage
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to home
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    }
});



