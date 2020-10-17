M.AutoInit();

// Copyright
let cpr = document.getElementById('cpr');
let year = new Date().getFullYear();
cpr.insertAdjacentHTML('beforeend', year);

// Setup UI for specific part
const logout = document.querySelectorAll('.logout');
const login = document.querySelectorAll('.login');
const profile = document.getElementById('profile');
function setupUI(user) {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // Display profile
            const html = `
                <br><h5>Email: ${user.email}</h5>
                <br><h5>Username: ${doc.data().username}</h5>
            `;
            profile.innerHTML = html;
        })

        // Toggle UI
        login.forEach(item => item.style.display = 'block');
        logout.forEach(item => item.style.display = 'none');
    } else {
        // Toggle UI
        login.forEach(item => item.style.display = 'none');
        logout.forEach(item => item.style.display = 'block');
    }
}

// Setup delete account
function deleteAccount(user) {
    const credential = firebase.auth.EmailAuthProvider.credential(
        email = prompt('Enter your email: '),
        password = prompt('Enter your password: ')
    );
    user.reauthenticateWithCredential(credential).then(() => {
        user.delete().catch(err => {
            alert(err.message);
        });
        const modal = document.querySelector('#profile-modal');
        M.Modal.getInstance(modal).close();
    }).catch(err => {
        alert(err.message);
    });
};

// Change password
function changePassword(user) {
    const credential = firebase.auth.EmailAuthProvider.credential(
        email = prompt('Enter your email: '),
        password = prompt('Enter your password: ')
    );
    user.reauthenticateWithCredential(credential).then(() => {
        let newPw = prompt('Enter your new password: ');
        let newPwCf = prompt('Confirm your new password: ');
        if (newPw == newPwCf) {
            user.updatePassword(newPw).catch(err => {
                alert(err.message);
            });
        } else {
            alert('Wrong new password confirmation');
        };

        return db.collection('users').doc(user.uid).update({
            password: newPw
        }).then(() => {
            alert('Password has been changed');
        });
    }).catch(err => {
        alert(err.message);
    });
};