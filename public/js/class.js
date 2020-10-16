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
        const memRef = db.collection('members').doc(className);

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
                        owner: doc.data().username
                    }).then(() => {
                        // Reset form
                        const modal = document.querySelector('#create-class-modal');
                        M.Modal.getInstance(modal).close();
                        createClassForm.reset();
                    });
                }).then(() => {
                    return memRef.set({
                        member: [auth.currentUser.uid]
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
    const memRef = db.collection('members').doc(className);

    // Check valid class id
    classRef.get().then(doc => {
        if (doc.exists) {
            // Check valid password
            if (doc.data().password == clPassword) {
                // Check if user already in class
                memRef.get().then(mem => {
                    if (mem.data().member.includes(auth.currentUser.uid)) {
                        alert('You are already in this class');
                    } else {
                        // Update class data in firestore
                        return memRef.set({
                            member: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                        }, {
                            merge: true
                        }).then(() => {
                            // Reset form
                            const modal = document.querySelector('#enter-class-modal');
                            M.Modal.getInstance(modal).close();
                            enterClassForm.reset();
                        })
                    }
                })
            } else {
                alert('Wrong password')
            }
        } else {
            alert(`There is no class named ${className}`)
        };
    });
});

// Reference
const refClass = db.collection('classes');
const refMem = db.collection('members');
const refURL = db.collection('downloadURL');

let members = [];
let id = [];

// Display class
refClass.onSnapshot(snapshot => {
    let classes = [];
    snapshot.forEach(doc => {
        classes.push({ ...doc.data(), id: doc.id });
        id.push(doc.id);
    });
    let html = '';
    classes.forEach(cl => {
        html += `<div class="class card indigo">
                    <div class="card-content white-text">
                        <h4 class="center">${cl.name}</h4>
                        <p class="teal-text text-accent-3 center">by ${cl.owner}</p>
                        <a href="#${cl.id}" class="modal-trigger"><p class="center white-text">Details</p></a>
                        <div id="${cl.id}" class="modal card-content indigo">
                            <span class="card-title">Members:</span>
                            <ul class="member-display row"></ul>
                            <ul class="url-display row"></ul>
                            <form class="col s12">
                                <div class="row">
                                    <input type="file" class="fileUpload">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`
    });
    document.querySelector('#class-display').innerHTML += html

    // Get element
    let memberDisplay = document.getElementsByClassName('member-display');

    // Display member
    refMem.onSnapshot(snapshot => {
        for (let i = 0; i < id.length; i++) {
            memberDisplay[i].innerHTML = '';
        };

        snapshot.forEach(doc => {
            members.push({ ...doc.data(), id: doc.id });
        });

        for (let i = 0; i < members.length; i++) {
            for (let e = 0; e < members[i].member.length; e++) {
                let uid = members[i].id;
                db.collection('users').doc(members[i].member[e]).get().then(doc => {
                    let mem_html = `<li class="col s12 m3">${doc.data().username}</li>`;
                    for (let x = 0; x < uid.length; x++) {
                        if (uid == id[x]) {
                            memberDisplay[x].innerHTML += mem_html;
                        };
                    };
                });
            };
        };

        let classed = document.getElementsByClassName('class');
        for (let i = 0; i < members.length; i++) {
            const memRef = db.collection('members').doc(members[i].id);
            memRef.get().then(doc => {
                if (auth.currentUser) {
                    if (doc.data().member.includes(auth.currentUser.uid)) {
                        classed[i].style.display = 'block';
                    } else {
                        classed[i].style.display = 'none';
                    };
                } else {
                    classed[i].style.display = 'none';
                };
            });
        };
    });
});

auth.onAuthStateChanged(user => {
    window.setTimeout(() => {
        M.AutoInit();
        if (user) {
            let classed = document.getElementsByClassName('class');
            for (let i = 0; i < members.length; i++) {
                const memRef = db.collection('members').doc(members[i].id);
                memRef.get().then(doc => {
                    if (doc.data().member.includes(auth.currentUser.uid)) {
                        classed[i].style.display = 'block';
                    } else {
                        classed[i].style.display = 'none';
                    };
                });
            };
        } else {
            for (let i = 0; i < members.length; i++) {
                classed[i].style.display = 'none';
            };
        };
    }, 2000);
});

window.setTimeout(() => {
    M.AutoInit();

    // Firebase storage
    let fileUpload = document.getElementsByClassName('fileUpload');
    let urlDisplay = document.getElementsByClassName('url-display');
    for (let i = 0; i < fileUpload.length; i++) {
        fileUpload[i].addEventListener('change', (e) => {
            // Get file
            let file = e.target.files[0];

            // Storage ref
            let storageRef = storage.ref(`${members[i].id}/${file.name}`);

            // Upload file
            storageRef.put(file);

            // Get download URL
            setTimeout(() => {
                storage.ref().child(`${members[i].id}/${file.name}`).getDownloadURL().then(url => {
                    refURL.doc(id[i]).set({
                        file: firebase.firestore.FieldValue.arrayUnion({
                            fileName: file.name,
                            url: url
                        })
                    }, {
                        merge: true
                    });
                });
            }, 3000);
        });
    };

    refURL.onSnapshot(docURL => {
        for (let i = 0; i < urlDisplay.length; i++) {
            urlDisplay[i].innerHTML = '';
        };
        let urls = [];
        docURL.forEach(doc => {
            urls.push(doc.data())
        });
        let url_html = '';
        for (let i = 0; i < urls.length; i++) {
            for (let e = 0; e < urls[i].file.length; e++) {
                url_html += `<li>${urls[i].file[e].fileName}: ${urls[i].file[e].url}</li><br>`
            };
        };
        for (let i = 0; i < urlDisplay.length; i++) {
            urlDisplay[i].innerHTML += url_html;
        };
    });
}, 2000);