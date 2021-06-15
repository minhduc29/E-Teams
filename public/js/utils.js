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
    if (user) {
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
    const email = prompt('Enter your email: ')
    const password = prompt('Enter your password: ')
    const credential = firebase.auth.EmailAuthProvider.credential(email, password)
    user.reauthenticateWithCredential(credential).then(() => {
        let newPw = prompt('Enter your new password: ')
        let newPwCf = prompt('Confirm your new password: ')
        if (newPw == newPwCf && newPw.trim() !== "") {
            user.updatePassword(newPw).then(() => {
                notice('Password has been changed')
            }).catch(err => {
                notice(err.message)
            })
        } else {
            notice('Wrong new password confirmation or invalid password')
        }
    }).catch(err => {
        notice(err.message)
    })
}

// Forgot password
function forgotPassword() {
    const email = prompt('Enter your email: ')
    auth.sendPasswordResetEmail(email).then(() => {
        notice('Please check your email')
    }).catch(err => {
        notice(err.message)
    })
}

// Change profile picture
async function changeProfilePic(e) {
    let file = e.target.files[0]

    if (file) {
        if (file.type.startsWith("image")) {
            $('body').removeClass('loaded')
            closeModal("#profile-modal")

            let fileRef = storageRef.child(`users/${auth.currentUser.uid}.jpg`)

            await fileRef.put(file)
            let url = await fileRef.getDownloadURL()

            const data = {
                photoURL: url
            }
            setData('users', auth.currentUser.uid, true, data).then(() => {
                $('body').addClass('loaded')
            })
            auth.currentUser.updateProfile(data)
            const datum = {
                ownerPhoto: url
            }

            db.collection("discussions").where("ownerUID", "==", auth.currentUser.uid).get().then(doc => {
                doc.forEach(data => {
                    setData('discussions', data.id, true, datum)
                })
            })

            db.collection('comments').get().then(doc => {
                doc.forEach(subdoc => {
                    db.collection('comments').doc(subdoc.id).collection('comments').where("ownerUID", "==", auth.currentUser.uid).get().then(data => {
                        data.forEach(dataa => {
                            db.collection('comments').doc(subdoc.id).collection('comments').doc(dataa.id).set(datum, {
                                merge: true
                            })
                        })
                    })
                })
            })

            db.collection('classes').where("ownerUID", "==", auth.currentUser.uid).get().then(doc => {
                doc.forEach(data => {
                    setData('classes', data.id, true, datum)
                })
            })

            db.collection("members").where('member', 'array-contains', auth.currentUser.uid).get().then(doc => {
                doc.forEach(data => {
                    const infos = data.data()
                    const index = infos.member.indexOf(auth.currentUser.uid)
                    setData('members', data.id, true, {
                        member: dataArr(infos.member[index], 'remove'),
                        info: dataArr(infos.info[index], 'remove')
                    })
                    setData('members', data.id, true, {
                        member: dataArr(auth.currentUser.uid, 'union'),
                        info: dataArr({
                            photoURL: url,
                            username: auth.currentUser.displayName
                        }, 'union')
                    })
                })
            })

            db.collection('messages').where('member', 'array-contains', auth.currentUser.uid).get().then(doc => {
                doc.forEach(data => {
                    const infos = data.data()
                    const index = infos.member.indexOf(auth.currentUser.uid)
                    setData('messages', data.id, true, {
                        member: dataArr(infos.member[index], 'remove'),
                        info: dataArr(infos.info[index], 'remove')
                    })
                    setData('messages', data.id, true, {
                        member: dataArr(auth.currentUser.uid, 'union'),
                        info: dataArr({
                            photoURL: url,
                            username: auth.currentUser.displayName
                        }, 'union')
                    })
                })
            })
        } else {
            notice("Please choose an image")
        }
    }
}

// Change username
function changeUsername() {
    const username = prompt("Enter your new username: ")
    if (username.trim() == "") {
        notice("Please input valid username")
    } else if (username.trim().length < 6) {
        notice("Username must be at least 6 characters")
    } else if (username.trim() == auth.currentUser.displayName) {
        notice("New username must be different from current username")
    } else {
        closeModal("#profile-modal")
        let exist = false
        db.collection('users').where('username', '==', username.trim()).get().then(doc => {
            doc.forEach(data => {
                if (data.exists) {
                    exist = true
                }
            })
            if (exist) {
                notice("This username has already been taken")
            } else {
                $('body').removeClass('loaded')
                setData('users', auth.currentUser.uid, true, {
                    username: username
                }).then(() => {
                    $('body').addClass('loaded')
                })
                auth.currentUser.updateProfile({
                    displayName: username
                })
                const datum = {
                    owner: username
                }

                db.collection("discussions").where("ownerUID", "==", auth.currentUser.uid).get().then(doc => {
                    doc.forEach(data => {
                        setData('discussions', data.id, true, datum)
                    })
                })

                db.collection('comments').get().then(doc => {
                    doc.forEach(subdoc => {
                        db.collection('comments').doc(subdoc.id).collection('comments').where("ownerUID", "==", auth.currentUser.uid).get().then(data => {
                            data.forEach(dataa => {
                                db.collection('comments').doc(subdoc.id).collection('comments').doc(dataa.id).set(datum, {
                                    merge: true
                                })
                            })
                        })
                    })
                })

                db.collection("classes").where("ownerUID", "==", auth.currentUser.uid).get().then(doc => {
                    doc.forEach(data => {
                        setData('classes', data.id, true, datum)
                    })
                })

                db.collection("members").where('member', 'array-contains', auth.currentUser.uid).get().then(doc => {
                    doc.forEach(data => {
                        const infos = data.data()
                        const index = infos.member.indexOf(auth.currentUser.uid)
                        setData('members', data.id, true, {
                            member: dataArr(infos.member[index], 'remove'),
                            info: dataArr(infos.info[index], 'remove')
                        })
                        setData('members', data.id, true, {
                            member: dataArr(auth.currentUser.uid, 'union'),
                            info: dataArr({
                                photoURL: auth.currentUser.photoURL,
                                username: username
                            }, 'union')
                        })
                    })
                })

                db.collection('messages').where('member', 'array-contains', auth.currentUser.uid).get().then(doc => {
                    doc.forEach(data => {
                        const infos = data.data()
                        const index = infos.member.indexOf(auth.currentUser.uid)
                        setData('messages', data.id, true, {
                            member: dataArr(infos.member[index], 'remove'),
                            info: dataArr(infos.info[index], 'remove')
                        })
                        setData('messages', data.id, true, {
                            member: dataArr(auth.currentUser.uid, 'union'),
                            info: dataArr({
                                photoURL: auth.currentUser.photoURL,
                                username: username
                            }, 'union')
                        })
                    })
                })
            }
        })
    }
}

// Close modal
function closeModal(modalID) {
    const modal = document.querySelector(modalID)
    M.Modal.getInstance(modal).close()
}

// Set data firestore
function setData(collection, doc, merge, data) {
    if (merge) {
        return db.collection(collection).doc(doc).set(data, { merge: true })
    } else {
        return db.collection(collection).doc(doc).set(data)
    }
}

// Array union firestore
function dataArr(data, type) {
    if (type == 'union') {
        return firebase.firestore.FieldValue.arrayUnion(data)
    } else if (type == 'remove') {
        return firebase.firestore.FieldValue.arrayRemove(data)
    } else if (type == 'increment') {
        return firebase.firestore.FieldValue.increment(data)
    }
}

// Get document firestore
function getDocument(collection, doc) {
    return db.collection(collection).doc(doc).get()
}

// CSS for web component
const css = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<style>
    @import "./css/style.css"
</style>`

// Check user data completion
function checkUserData() {
    if (!auth.currentUser.displayName) {
        db.collection("users").doc(auth.currentUser.uid).get().then(doc => {
            auth.currentUser.updateProfile({
                displayName: doc.data().username,
                photoURL: doc.data().photoURL
            })
        })
    }
    if (!auth.currentUser.emailVerified) {
        notice("Please verify your email!")
        auth.currentUser.sendEmailVerification()
    }
}

// Redirect
function redirect(screen) {
    const doc = document.querySelector("title")
    const main = document.querySelector("#body")
    const title = document.querySelector("#title")
    const description = document.querySelector("#description")
    if (screen == "home") {
        doc.innerHTML = "E-Teams"
        main.innerHTML = "<home-screen></home-screen>"
        title.innerHTML = "E-Teams"
        description.innerHTML = "A modern website mainly for online learning"
    } else if (screen == "class") {
        doc.innerHTML = "E-Teams | Class"
        main.innerHTML = "<class-screen></class-screen>"
        title.innerHTML = "Class"
        description.innerHTML = "Where teachers assign homework for students"
    } else if (screen == "discussion") {
        doc.innerHTML = "E-Teams | Discussion"
        main.innerHTML = "<discussion-screen></discussion-screen>"
        title.innerHTML = "Discussion"
        description.innerHTML = "Where people discuss a topic or a question"
    } else if (screen == "learninglog") {
        doc.innerHTML = "E-Teams | Learning Log"
        main.innerHTML = "<learninglog-screen></learninglog-screen>"
        title.innerHTML = "Learning Log"
        description.innerHTML = "Keep track of your learning about specific topic"
    } else if (screen == "todo") {
        doc.innerHTML = "E-Teams | To-Do"
        main.innerHTML = "<todo-screen></todo-screen>"
        title.innerHTML = "To-Do"
        description.innerHTML = "Where people take note and make to-do list"
    } else if (screen == "playground") {
        doc.innerHTML = "E-Teams | Playground"
        main.innerHTML = "<playground-screen></playground-screen>"
        title.innerHTML = "Playground"
        description.innerHTML = "Where people spend some time to relax after stressful hours of studying"
    } else if (screen == "chat") {
        doc.innerHTML = "E-Teams | Chat Room"
        main.innerHTML = "<chat-screen></chat-screen>"
        title.innerHTML = "Chat Room"
        description.innerHTML = "Where people create chat room and send messages"
    } else if (screen == "guide") {
        doc.innerHTML = "E-Teams | User Guide"
        main.innerHTML = "<guide-screen></guide-screen>"
        title.innerHTML = "User Guide"
        description.innerHTML = "User guide, instruction, usage and update for this website"
    }
}

export { initialize, copyright, notice, setupUI, changePassword, forgotPassword, changeProfilePic, closeModal, setData, dataArr, getDocument, css, checkUserData, redirect, changeUsername }