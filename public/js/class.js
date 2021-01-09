import { notice, closeModal, initialize, setData, getDocument, dataArr } from './function.js'

// Add class data to firebase
const createClassForm = document.querySelector('#create-class')
createClassForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get element
    const className = createClassForm['clname'].value
    const clPassword = createClassForm['clpassword'].value
    const clpwConfirmation = createClassForm['clpwconfirmation'].value

    // Check valid information
    if (clpwConfirmation !== clPassword) {
        notice('Password and password confirmation must be the same')
    } else {
        const memRef = db.collection('members').doc(className)
        const urlRef = db.collection('downloadURL').doc(className)

        // Check valid class id
        getDocument('classes', className).then(doc => {
            if (doc.exists) {
                notice('Please try another class name')
            } else {
                // Add data to firestore
                getDocument('users', auth.currentUser.uid).then(doc => {
                    const initialClassData = {
                        name: className,
                        password: clPassword,
                        owner: doc.data().username,
                        ownerUID: auth.currentUser.uid
                    }
                    setData('classes', className, false, initialClassData).then(() => {
                        // Reset form
                        closeModal('#create-class-modal')
                        createClassForm.reset()
                    })
                }).then(() => {
                    const initialMemData = {
                        member: [auth.currentUser.uid]
                    }
                    setData('members', className, false, initialMemData).then(() => {
                        const initialUrlData = {
                            file: []
                        }
                        setData('downloadURL', className, false, initialUrlData)
                    })
                })
            }
        })
    }
})

// Enter class
const enterClassForm = document.querySelector('#enter-class')
enterClassForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get element
    const className = enterClassForm['clname2'].value
    const clPassword = enterClassForm['clpassword2'].value

    // Check valid class id
    getDocument('classes', className).then(doc => {
        if (doc.exists) {
            // Check valid password
            if (doc.data().password == clPassword) {
                // Check if user already in class
                getDocument('members', className).then(mem => {
                    if (mem.data().member.includes(auth.currentUser.uid)) {
                        notice('You are already in this class')
                    } else {
                        // Update class data in firestore
                        const memData = {
                            member: dataArr(auth.currentUser.uid, 'union')
                        }
                        setData('members', className, true, memData).then(() => {
                            // Reset form
                            closeModal('#enter-class-modal')
                            enterClassForm.reset()
                        })
                    }
                })
            } else {
                notice('Wrong password')
            }
        } else {
            notice(`There is no class named ${className}`)
        }
    })
})

// Reference
const refClass = db.collection('classes')
const refMem = db.collection('members')
const refURL = db.collection('downloadURL')

let members = []
let id = []

// Display class
refClass.onSnapshot(snapshot => {
    document.querySelector('#class-display').innerHTML = ''
    id = []
    let classes = []
    snapshot.forEach(doc => {
        classes.push({ ...doc.data(), id: doc.id })
        id.push(doc.id)
    })
    let html = ''
    classes.forEach(cl => {
        html += `<div class="class card bg-2f3162">
                    <div class="card-content white-text">
                        <h4 class="center">${cl.name}</h4>
                        <p class="teal-text text-accent-3 center">by ${cl.owner}</p>
                        <a href="#${cl.id}" class="modal-trigger"><p class="center white-text">Details</p></a>
                        <button class="ll-del-btn btn"><i class="material-icons">clear</i></button>
                        <div id="${cl.id}" class="modal card-content bg-2f3162">
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
    })
    document.querySelector('#class-display').innerHTML += html

    initialize()

    // Delete class
    let llDelBtn = document.getElementsByClassName("ll-del-btn")
    for (let i = 0; i < llDelBtn.length; i++) {
        llDelBtn[i].addEventListener("click", () => {
            if (classes[i].ownerUID == auth.currentUser.uid) {
                refClass.doc(classes[i].name).delete()
                refMem.doc(classes[i].name).delete()
                refURL.doc(classes[i].name).delete()
                storageRef.child(classes[i].name).listAll().then(res => {
                    res.items.forEach(f => f.delete())
                })
            } else {
                notice("You don't have permission to delete this class")
            }
        })
    }

    // Display member
    refMem.onSnapshot(snapshot => {
        // Get element
        let memberDisplay = document.getElementsByClassName('member-display')

        members = []
        snapshot.forEach(doc => {
            members.push({ ...doc.data(), id: doc.id })
        })

        for (let i = 0; i < members.length; i++) {
            let mem_html = ''
            memberDisplay[i].innerHTML = ''
            for (let e = 0; e < members[i].member.length; e++) {
                let uid = members[i].id
                getDocument('users', members[i].member[e]).then(doc => {
                    mem_html += `<li class="col s12 m3">${doc.data().username}</li>`
                    for (let x = 0; x < id.length; x++) {
                        if (uid == id[x]) {
                            memberDisplay[x].innerHTML = mem_html
                        }
                    }
                })
            }
        }

        let classed = document.getElementsByClassName('class')
        for (let i = 0; i < members.length; i++) {
            getDocument('members', members[i].id).then(doc => {
                if (auth.currentUser) {
                    if (doc.data().member.includes(auth.currentUser.uid)) {
                        classed[i].style.display = 'block'
                    } else {
                        classed[i].style.display = 'none'
                    }
                } else {
                    classed[i].style.display = 'none'
                }
            })
        }
    })

    // Firebase storage
    let fileUpload = document.getElementsByClassName('fileUpload')
    let urlDisplay = document.getElementsByClassName('url-display')
    for (let i = 0; i < fileUpload.length; i++) {
        fileUpload[i].addEventListener('change', (e) => {
            // Get file
            let file = e.target.files[0]

            if (file) {
                let md = document.querySelectorAll(".modal")
                for (let i = 0; i < md.length; i++) {
                    if (md[i].style.display == "block") {
                        M.Modal.getInstance(md[i]).close()
                    }
                }
                $("body").removeClass("loaded")

                getURL(i, file)

                async function getURL(i, file) {
                    // File ref
                    let fileRef = storageRef.child(`${members[i].id}/${file.name}`)

                    // Upload file
                    await fileRef.put(file)

                    // Get download URL
                    let url = await fileRef.getDownloadURL()
                    const fileInfo = {
                        fileName: file.name,
                        url: url
                    }
                    const fileData = {
                        file: dataArr(fileInfo, 'union')
                    }
                    setData('downloadURL', id[i], true, fileData)
                    $("body").addClass("loaded")
                }
            }
        })
    }

    refURL.onSnapshot(docURL => {
        let urls = []
        docURL.forEach(doc => {
            urls.push({ ...doc.data(), id: doc.id })
        })
        for (let i = 0; i < urls.length; i++) {
            let url_html = ''
            urlDisplay[i].innerHTML = ''
            for (let e = 0; e < urls[i].file.length; e++) {
                url_html += `<li>${urls[i].file[e].fileName}: ${urls[i].file[e].url}</li><br>`
                for (let j = 0; j < id.length; j++) {
                    if (urls[i].id == id[j])
                        urlDisplay[j].innerHTML = url_html
                }
            }
        }
    })
})

auth.onAuthStateChanged(user => {
    initialize()
    let classed = document.getElementsByClassName('class')
    for (let i = 0; i < members.length; i++) {
        if (user) {
            getDocument('members', members[i].id).then(doc => {
                if (doc.data().member.includes(auth.currentUser.uid)) {
                    classed[i].style.display = 'block'
                } else {
                    classed[i].style.display = 'none'
                }
            })
        } else {
            classed[i].style.display = 'none'
        }
    }
})