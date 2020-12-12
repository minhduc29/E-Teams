// Reference
const chatRef = db.collection("chats")

// Create chat room
$("#create-chat").submit((e) => {
    e.preventDefault()

    // Get value
    let chatName = $("#chat-name").val()

    // Check valid
    if (chatName.length > 0) {
        chatRef.doc(chatName).get().then(doc => {
            if (doc.exists) {
                alert("Please try another chat room name")
            } else {
                // Add data to firestore
                db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
                    return chatRef.doc(chatName).set({
                        uids: [auth.currentUser.uid],
                        infos: [{
                            photoURL: doc.data().photoURL,
                            username: doc.data().username
                        }],
                        messages: []
                    })
                }).then(() => {
                    // Reset form
                    const modal = document.querySelector('#create-chat-modal')
                    M.Modal.getInstance(modal).close()
                    document.querySelector("#create-chat").reset()
                })
            }
        })
    } else {
        alert("Invalid chat room name")
    }
})

chatRef.onSnapshot(snapshot => {
    document.querySelector('#chat-display').innerHTML = ''
    let chats = []
    snapshot.forEach(doc => {
        chats.push({ ...doc.data(), id: doc.id })
    })
    let html = ''
    chats.forEach(chat => {
        html += `<li class="chat">
                    <h4 class="collapsible-header bg-2f3162 white-text">${chat.id}</h4>
                    <a href="#add-mem-modal" class="btn chat-btn waves-effect waves-light bg-4b88a2 modal-trigger"><i class="material-icons">person_add</i></a>
                    <div class="collapsible-body">
                        <div class="msg-display"></div>
                        <form class="col s12 send-msg">
                            <div class="input-field col s12">
                                <input id="${chat.id}" type="text">
                                <label for="${chat.id}">Message</label>
                            </div>
                            <button class="btn">Send</button>
                        </form>
                    </div>
                </li>`
    })
    document.querySelector('#chat-display').innerHTML += html

    // Check member to switch display
    let chated = document.getElementsByClassName("chat")
    for (let i = 0; i < chated.length; i++) {
        if (chats[i].uids.includes(auth.currentUser.uid)) {
            chated[i].style.display = "block"
        } else {
            chated[i].style.display = "none"
        }
    }

    // Add members
    let chatBtn = document.getElementsByClassName("chat-btn")
    for (let i = 0; i < chatBtn.length; i++) {
        chatBtn[i].addEventListener("click", function () {
            let chatID = chats[i].id
            $("#add-mem").submit((e) => {
                e.preventDefault()

                let mail = $("#mem-email").val()
                db.collection('users').where("email", "==", mail).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        return chatRef.doc(chatID).set({
                            uids: firebase.firestore.FieldValue.arrayUnion(doc.id),
                            infos: firebase.firestore.FieldValue.arrayUnion({
                                photoURL: doc.data().photoURL,
                                username: doc.data().username
                            })
                        }, {
                            merge: true
                        }).then(() => {
                            const modal = document.querySelector('#add-mem-modal')
                            M.Modal.getInstance(modal).close()
                            document.querySelector('#add-mem').reset()
                        })
                    })
                })
            })
        })
    }

    initialize()
})