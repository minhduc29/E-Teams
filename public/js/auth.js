// Register
const registerForm = document.querySelector('#register')
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get user info
    const username = registerForm['username'].value
    const email = registerForm['email2'].value
    const password = registerForm['password2'].value
    const pwcf = registerForm['pwconfirmation'].value

    // Register user
    if (username == '') {
        M.toast({html: 'Missing username', classes: 'bg-4b88a2'})
    } else if (username.length < 6) {
        M.toast({html: 'Username must be at least 6 characters', classes: 'bg-4b88a2'})
    } else if (password !== pwcf) {
        M.toast({html: 'Password and password confirmation must be the same', classes: 'bg-4b88a2'})
    } else if (password === pwcf) {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            // Create data firestore
            return db.collection('users').doc(cred.user.uid).set({
                username: username,
                email: email,
                liked: [],
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/users%2Fprofile_picture.png?alt=media&token=b81c9c34-010c-4249-aa74-3c36d7ca183b'
            })
        }).then(() => {
            // Reset form
            const modal = document.querySelector('#register-modal')
            M.Modal.getInstance(modal).close()
            registerForm.reset()
        }).catch(err => {
            // Catch error
            M.toast({html: err.message, classes: 'bg-4b88a2'})
        })
    }
})

// Login
const loginForm = document.querySelector('#login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get user info
    const email = loginForm['email'].value
    const password = loginForm['password'].value

    // Login user
    auth.signInWithEmailAndPassword(email, password).then(() => {
        // Reset form
        const modal = document.querySelector('#login-modal')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
    }).catch(err => {
        // Catch error
        M.toast({html: err.message, classes: 'bg-4b88a2'})
    })
})

// Logout
const logoutBtn = document.getElementsByClassName('logout-btn')
for (let i = 0; i < logoutBtn.length; i++) {
    logoutBtn[i].addEventListener('click', (e) => {
        e.preventDefault()
        auth.signOut()
    })
}

// Listen for auth status
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user)
    } else {
        setupUI()
    }
})

// Change password
const changePw = document.getElementById('change-pw')
changePw.addEventListener('click', (e) => {
    e.preventDefault()
    changePassword(auth.currentUser)
})

// Forgot password
const forgotPw = document.getElementById('forgot-pw')
forgotPw.addEventListener('click', (e) => {
    e.preventDefault()
    forgotPassword()
})

// Change profile picture
const changePp = document.getElementById('change-pp')
changePp.addEventListener('change', (e) => {
    e.preventDefault()
    changeProfilePic(e)
})