// Register
const registerForm = document.querySelector('#register');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const username = registerForm['username'].value;
    const email = registerForm['email2'].value;
    const password = registerForm['password2'].value;
    const pwcf = registerForm['pwconfirmation'].value;

    // Register user
    if (username == '') {
        alert('Missing username');
    } else if (username.length < 6) {
        alert('Username must be at least 6 characters');
    } else if (password !== pwcf) {
        alert('Password and password confirmation must be the same');
    } else if (password === pwcf) {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            // Update profile
            auth.currentUser.updateProfile({
                displayName: username
            });

            // Reset form
            const modal = document.querySelector('#register-modal');
            M.Modal.getInstance(modal).close();
            registerForm.reset();
        }).catch(err => {
            // Catch error
            alert(err.message);
        });
    };
});

// Login
const loginForm = document.querySelector('#login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // Login user
    auth.signInWithEmailAndPassword(email, password).then(() => {
        // Reset form
        const modal = document.querySelector('#login-modal');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err => {
        // Catch error
        alert(err.message);
    });
});

// Logout
const logoutBtn = document.getElementsByClassName('logout-btn');
for (let i = 0; i < logoutBtn.length; i++) {
    logoutBtn[i].addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    })
}

// Listen for auth status and allow user to delete their account
const delBtn = document.getElementById('del-btn');
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
        delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteAccount(user);
        });
    } else {
        setupUI();
    };
});