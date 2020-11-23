function initialize() {
    M.AutoInit()
}

initialize()

// Copyright
let cpr = document.getElementById('cpr')
let year = new Date().getFullYear()
cpr.insertAdjacentHTML('beforeend', year)

// Setup UI for specific part
const logout = document.querySelectorAll('.logout')
const login = document.querySelectorAll('.login')
const profile = document.getElementById('profile')
function setupUI(user) {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // Display profile
            const html = `
                <br><h5>Email: ${user.email}</h5>
                <br><h5>Username: ${doc.data().username}</h5>`
            profile.innerHTML = html
        })

        // Toggle UI
        login.forEach(item => item.style.display = 'block')
        logout.forEach(item => item.style.display = 'none')
    } else {
        // Toggle UI
        login.forEach(item => item.style.display = 'none')
        logout.forEach(item => item.style.display = 'block')
    }
}

// Change password
function changePassword(user) {
    const credential = firebase.auth.EmailAuthProvider.credential(
        email = prompt('Enter your email: '),
        password = prompt('Enter your password: ')
    )
    user.reauthenticateWithCredential(credential).then(() => {
        let newPw = prompt('Enter your new password: ')
        let newPwCf = prompt('Confirm your new password: ')
        if (newPw == newPwCf) {
            user.updatePassword(newPw).catch(err => {
                alert(err.message)
            })
        } else {
            alert('Wrong new password confirmation')
        }

        return db.collection('users').doc(user.uid).update({
            password: newPw
        }).then(() => {
            alert('Password has been changed')
        })
    }).catch(err => {
        alert(err.message)
    })
}

// Forgot password
function forgotPassword() {
    let email = prompt('Enter your email: ')
    auth.sendPasswordResetEmail(email).then(() => {
        alert('Please check your email')
    }).catch(err => {
        alert(err.message)
    })
}