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
        console.log(chat);
        html += `<div class="col s12 m12 row">
                    <div class="card bg-2f3162">
                        <div class="card-content white-text">
                            <a href="#${chat.id}" class="modal-trigger">
                                <h4 class="center white-text">${chat.id}</h4>
                            </a>
                        </div>
                        <form class="entry-form col s12">
                            <textarea class="entry materialize-textarea" placeholder="Messages"></textarea>
                            <button class="btn">Send</button>
                        </form>
                    </div>
                    <div id="${chat.id}" class="modal bg-gradient-2">
                        <div class="modal-content"></div>
                    </div>
                </div>`
    })
    document.querySelector('#chat-display').innerHTML += html

    initialize()
})