// Add class data to firebase
const classForm = document.querySelector('#class');
classForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get data
    const className = classForm['clname'].value;
    const clPassword = classForm['clpassword'].value;
    const clpwConfirmation = classForm['clpwconfirmation'].value;

    // Check valid information
    if (clpwConfirmation !== clPassword) {
        alert('Password and password confirmation must be the same');
    } else {
        // Reference
        const classRef = db.collection('classes').doc(className);
        classRef.get().then(doc => {
            if (doc.exists) {
                // Check valid class id
                alert('Please try another class name')
            } else {
                // Add data to firestore
                db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
                    return classRef.set({
                        name: className,
                        password: clPassword,
                        owner: doc.data().username,
                        member: []
                    }).then(() => {
                        // Reset form
                        const modal = document.querySelector('#class-modal');
                        M.Modal.getInstance(modal).close();
                        classForm.reset();
                    }).catch(err => {
                        alert(err.message);
                    });
                });
            };
        });
    };
});