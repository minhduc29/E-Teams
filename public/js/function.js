// Init
function initialize() {
    M.AutoInit()
}

// Copyright
function copyright() {
    const cpr = document.getElementById('cpr')
    const year = new Date().getFullYear()
    cpr.insertAdjacentHTML('beforeend', year)
}

// Toastify
function notice(msg) {
    M.toast({ html: msg, classes: 'bg-4b88a2' })
}

// Setup UI for specific part
function setupUI(user) {
    const logout = document.querySelectorAll('.logout')
    const login = document.querySelectorAll('.login')
    const profile = document.getElementById('profile')

    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // Display profile
            const html = `
                <br><h5>Email: ${user.email}</h5>
                <br><h5>Username: ${doc.data().username}</h5>`
            profile.innerHTML = html

            if (doc.data().photoURL) {
                $("#profile-pic").attr('src', doc.data().photoURL)
            }
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
                notice(err.message)
            })
        } else {
            notice('Wrong new password confirmation')
        }

        return db.collection('users').doc(user.uid).update({
            password: newPw
        }).then(() => {
            notice('Password has been changed')
        })
    }).catch(err => {
        notice(err.message)
    })
}

// Forgot password
function forgotPassword() {
    let email = prompt('Enter your email: ')
    auth.sendPasswordResetEmail(email).then(() => {
        notice('Please check your email')
    }).catch(err => {
        notice(err.message)
    })
}

// Change profile picture
async function changeProfilePic(e) {
    let file = e.target.files[0]
    let userRef = db.collection('users').doc(auth.currentUser.uid)

    if (file) {
        $('body').removeClass('loaded')
        M.Modal.getInstance($("#profile-modal")).close()

        let fileRef = storageRef.child(`users/${auth.currentUser.uid}.jpg`)

        await fileRef.put(file)
        let url = await fileRef.getDownloadURL()

        userRef.set({
            photoURL: url
        }, {
            merge: true
        })
    }

    userRef.onSnapshot(snapshot => {
        $("#profile-pic").attr('src', snapshot.data().photoURL)
        $('body').addClass('loaded')
    })
}

// Close modal
function closeModal(modalID) {
    const modal = document.querySelector(modalID)
    M.Modal.getInstance(modal).close()
}

export { initialize, copyright, notice, setupUI, changePassword, forgotPassword, changeProfilePic, closeModal }