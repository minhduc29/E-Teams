import { css, notice, setData } from '../js/utils.js'

class ChatScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row">
                <form id="create-chat" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="chat-name" class="text-4b88a2" placeholder="Chat Room Name" autocomplete="off" type="text">
                        </div>
                    </div>
                    <button class="btn">Create</button>
                </form>
            </div>
        </div>
        <div id="room-display" class="container"></div>`

        this._shadowRoot.querySelector("#create-chat").addEventListener("submit", (e) => {
            e.preventDefault()

            const roomName = this._shadowRoot.querySelector("#chat-name").value
            if (roomName.trim().length == 0) {
                notice("Please input valid chat room name")
            } else {
                db.collection('messages').add({
                    member: [auth.currentUser.uid],
                    info: [{
                        photoURL: auth.currentUser.photoURL,
                        username: auth.currentUser.displayName
                    }],
                    message: []
                }).then(doc => {
                    setData('chats', doc.id, false, {
                        member: [auth.currentUser.uid],
                        name: roomName.trim()
                    })
                    this._shadowRoot.querySelector("#create-chat").reset()
                })
            }
        })

        db.collection('chats').where('member', 'array-contains', auth.currentUser.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#room-display").innerHTML = ""
            snapshot.forEach(doc => {
                this._shadowRoot.querySelector("#room-display").innerHTML += `<chat-item uid="${doc.id}" name="${doc.data().name}"></chat-item>`
            })
        })
    }
}

window.customElements.define("chat-screen", ChatScreen)