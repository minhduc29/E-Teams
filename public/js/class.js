// Add class data to firebase
const createClassForm = document.querySelector('#create-class');
createClassForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get element
    const className = createClassForm['clname'].value;
    const clPassword = createClassForm['clpassword'].value;
    const clpwConfirmation = createClassForm['clpwconfirmation'].value;

    // Check valid information
    if (clpwConfirmation !== clPassword) {
        alert('Password and password confirmation must be the same');
    } else {
        // Reference
        const classRef = db.collection('classes').doc(className);

        // Check valid class id
        classRef.get().then(doc => {
            if (doc.exists) {
                alert('Please try another class name')
            } else {
                // Add data to firestore
                db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
                    return classRef.set({
                        name: className,
                        password: clPassword,
                        owner: doc.data().username,
                        member: [auth.currentUser.uid]
                    }).then(() => {
                        // Reset form
                        const modal = document.querySelector('#create-class-modal');
                        M.Modal.getInstance(modal).close();
                        createClassForm.reset();
                    });
                });
            };
        });
    };
});

// Enter class
const enterClassForm = document.querySelector('#enter-class');
enterClassForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get element
    const className = enterClassForm['clname2'].value;
    const clPassword = enterClassForm['clpassword2'].value;

    // Reference to data in firestore
    const classRef = db.collection('classes').doc(className);

    // Check valid class id
    classRef.get().then(doc => {
        if (doc.exists) {
            // Check valid password
            if (doc.data().password == clPassword) {
                // Check if user already in class
                if (doc.data().member.includes(auth.currentUser.uid)) {
                    alert('You are already in this class')
                } else {
                    // Update class data in firestore
                    return classRef.set({
                        member: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                    }, {
                        merge: true
                    }).then(() => {
                        // Reset form
                        const modal = document.querySelector('#enter-class-modal');
                        M.Modal.getInstance(modal).close();
                        enterClassForm.reset();
                    });
                }
            } else {
                alert('Wrong password')
            }
        } else {
            alert(`There is no class named ${className}`)
        };
    });
});