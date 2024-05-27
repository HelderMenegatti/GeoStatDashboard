function fetchToken() {
    const username = document.getElementById('id_username').value;
    const password = document.getElementById('id_password').value;
    localStorage.setItem('userName', username);
    localStorage.setItem('password', password);
}

document.getElementById('submit-form').addEventListener('click', fetchToken);