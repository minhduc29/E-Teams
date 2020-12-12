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
                M.toast({html: "Please try another chat room name", classes: 'bg-4b88a2'})
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
        M.toast({html: "Invalid chat room name", classes: 'bg-4b88a2'})
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
                                <input class="msg" placeholder="Message" type="text">
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

    // Send messages
    let sendMsg = document.getElementsByClassName("send-msg")
    let msgContainer = document.getElementsByClassName("msg")
    let msgDisplay = document.getElementsByClassName("msg-display")
    for (let i = 0; i < sendMsg.length; i++) {
        sendMsg[i].addEventListener('submit', (e) => {
            e.preventDefault()

            chatRef.doc(chats[i].id).set({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    content: msgContainer[i].value,
                    by: chats[i].uids.indexOf(auth.currentUser.uid)
                })
            }, {
                merge: true
            }).then(() => {
                sendMsg[i].reset()
            })
        })
    }

    // Display messages
    for (let i = 0; i < chats.length; i++) {
        msgDisplay[i].innerHTML = ''
        for (let j = 0; j < chats[i].messages.length; j++) {
            let index = chats[i].messages[j].by
            msgDisplay[i].innerHTML += `<div class="card">
                                            <div class="card-content bg-2f3162">
                                                <img src="${chats[i].infos[index].photoURL}" alt="${chats[i].infos[index].username}" class="circle chat-img responsive-img">
                                                <span class="username teal-text text-accent-3">${chats[i].infos[index].username}</span>
                                                <p class="content white-text">${chats[i].messages[j].content}</p>
                                            </div>
                                        </div>`
        }
    }

    initialize()
})