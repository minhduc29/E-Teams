M.AutoInit();

// Copyright
let cpr = document.getElementById('cpr');
let year = new Date().getFullYear();
cpr.insertAdjacentHTML('beforeend', year);

// Setup UI for specific part
const logout = document.querySelectorAll('.logout');
const login = document.querySelectorAll('.login');

function setupUI(user) {
    if (user) {
        login.forEach(item => item.style.display = 'block');
        logout.forEach(item => item.style.display = 'none');
    } else {
        login.forEach(item => item.style.display = 'none');
        logout.forEach(item => item.style.display = 'block');
    }
}