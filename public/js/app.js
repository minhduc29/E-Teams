import { initialize, copyright, notice, setupUI, changePassword, forgotPassword, changeProfilePic, closeModal } from './function.js'

// Initialize
initialize()

// Copyright
copyright()

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
        notice('Missing username')
    } else if (username.length < 6) {
        notice('Username must be at least 6 characters')
    } else if (password !== pwcf) {
        notice('Password and password confirmation must be the same')
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
            closeModal('#register-modal')
            registerForm.reset()
        }).catch(err => {
            // Catch error
            notice(err.message)
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
        closeModal('#login-modal')
        loginForm.reset()
    }).catch(err => {
        // Catch error
        notice(err.message)
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

// Listen for auth status to setup UI
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