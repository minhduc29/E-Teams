import { css, dataArr, getDocument, notice, setData } from '../js/utils.js'

class ChatItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.uid = this.getAttribute('uid')
        this.name = this.getAttribute('name')
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 row">
            <div class="card bg-2f3162">
                <div class="card-content white-text">
                    <h4 style="margin-top: 0;" class="white-text">${this.name}</h4>
                    <button class="chat-btn btn"><i class="material-icons">person_add</i></button>
                </div>
            </div>
            <form class="col s12">
                <textarea class="materialize-textarea" placeholder="Messages"></textarea>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="file" id="file">
                    </div>
                </div>
                <button class="btn">Send</button>
            </form>
            <div class="col s12 comment-section">
                <div id="comment-display" class="bg-gradient-2"></div>
            </div>
            <form class="col s12 add-pp">
                <input id="mem-email" type="email" autocomplete="off" placeholder="Email">
                <button class="btn">Add</button>
            </form>
        </div>`

        this._shadowRoot.querySelector(".card").addEventListener('click', () => {
            const comment = this._shadowRoot.querySelector(".comment-section")
            if (comment.style.display == "none") {
                comment.style.display = "block"
            } else {
                comment.style.display = "none"
            }
        })

        db.collection('messages').doc(this.uid).onSnapshot(snapshot => {
            const infos = snapshot.data().info
            const members = snapshot.data().member
            this._shadowRoot.querySelector("#comment-display").innerHTML = ''
            snapshot.data().message.forEach(mes => {
                const index = members.indexOf(mes.ownerUID)
                const photoURL = infos[index].photoURL
                const username = infos[index].username
                this._shadowRoot.querySelector("#comment-display").innerHTML += `<comment-item content="${mes.content}" owner="${username}" ownerPhoto="${photoURL}" time="${mes.time}" img="${mes.photoURL}" file="${mes.file}"></comment-item>`
            })
        })

        const addPp = this._shadowRoot.querySelector(".add-pp")
        this._shadowRoot.querySelector(".chat-btn").addEventListener('click', (e) => {
            e.preventDefault()

            if (addPp.style.display == "none") {
                addPp.style.display = "block"
            } else {
                addPp.style.display = "none"
            }
        })

        addPp.addEventListener('submit', (e) => {
            e.preventDefault()

            const mail = this._shadowRoot.querySelector("#mem-email").value
            
            if (mail.trim() == "") {
                notice("Please input valid email")
            } else {
                db.collection('users').where("email", "==", mail.trim()).get().then(data => {
                    data.forEach(doc => {
                        const infos = {
                            photoURL: doc.data().photoURL,
                            username: doc.data().username
                        }
                        setData('chats', this.uid, true, {
                            member: dataArr(doc.id, 'union')
                        })
                        setData('messages', this.uid, true, {
                            member: dataArr(doc.id, 'union'),
                            info: dataArr(infos, 'union')
                        }).then(() => {
                            addPp.reset()
                            addPp.style.display = "none"
                        })
                    })
                })
            }
        })

        this._shadowRoot.querySelector("form").addEventListener("submit", async (e) => {
            e.preventDefault()

            // Get time formated
            const today = new Date()
            let hr = today.getHours().toString()
            let min = today.getMinutes().toString()
            while (hr.length < 2) {
                hr = "0" + hr
            }
            while (min.length < 2) {
                min = "0" + min
            }
            const time = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${hr}:${min} ${today.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]}`

            // Get url
            let isImage = false
            let url = ""

            const file = this._shadowRoot.querySelector("#file")
            if (file.files[0]) {
                // Check image
                if (file.files[0].type.startsWith("image")) {
                    isImage = true
                }

                // Get download url
                const fileRef = storageRef.child(`messages/${auth.currentUser.uid}/${today}`)
                await fileRef.put(file.files[0])
                url = await fileRef.getDownloadURL()
            }

            // Get content
            const content = this._shadowRoot.querySelector("textarea").value
            let data
            if (isImage) {
                data = {
                    content: content.trim(),
                    photoURL: url,
                    time: time,
                    file: "",
                    ownerUID: auth.currentUser.uid
                }
            } else {
                data = {
                    content: content.trim(),
                    photoURL: "",
                    time: time,
                    file: url,
                    ownerUID: auth.currentUser.uid
                }
            }

            setData('messages', this.uid, true, {
                message: dataArr(data, 'union')
            }).then(() => {
                this._shadowRoot.querySelector("form").reset()
            })
        })
    }
}

window.customElements.define('chat-item', ChatItem)