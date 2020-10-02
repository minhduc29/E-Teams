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
        user.delete();
        const modal = document.querySelector('#profile-modal');
        M.Modal.getInstance(modal).close();
    }).catch(err => {
        alert(err.message);
    });
};