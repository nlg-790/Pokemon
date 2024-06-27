document.addEventListener('DOMContentLoaded', () => {
    // Example: If you need to handle button clicks to navigate to other pages
    document.getElementById('to-search').addEventListener('click', () => {
        window.location.href = 'search.html';
    });

    document.getElementById('to-team').addEventListener('click', () => {
        window.location.href = 'team.html';
    });

    document.getElementById('to-list').addEventListener('click', () => {
        window.location.href = 'list.html';
    });
});


