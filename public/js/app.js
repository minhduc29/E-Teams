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
                M.toast({html: err.message, classes: 'bg-4b88a2'})
            })
        } else {
            M.toast({html: 'Wrong new password confirmation', classes: 'bg-4b88a2'})
        }

        return db.collection('users').doc(user.uid).update({
            password: newPw
        }).then(() => {
            M.toast({html: 'Password has been changed', classes: 'bg-4b88a2'})
        })
    }).catch(err => {
        M.toast({html: err.message, classes: 'bg-4b88a2'})
    })
}

// Forgot password
function forgotPassword() {
    let email = prompt('Enter your email: ')
    auth.sendPasswordResetEmail(email).then(() => {
        M.toast({html: 'Please check your email', classes: 'bg-4b88a2'})
    }).catch(err => {
        M.toast({html: err.message, classes: 'bg-4b88a2'})
    })
}

// Change profile picture
async function changeProfilePic(e) {
    let file = e.target.files[0]
    userRef = db.collection('users').doc(auth.currentUser.uid)

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