import { css, getDocument, dataArr, setData, notice } from '../js/utils.js'

class DiscussionItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.title = this.getAttribute("title")
        this.description = this.getAttribute("description")
        this.owner = this.getAttribute("owner")
        this.ownerPhoto = this.getAttribute("ownerPhoto")
        this.time = this.getAttribute('time')
        this.img = this.getAttribute('img')
        this.file = this.getAttribute("file")
        this.like = this.getAttribute("like")
        this.id = this.getAttribute("uid")

        let file = ""
        let img = ""
        if (this.file) {
            file = `
            <div class="center-container">
                <a class="light-blue-text text-lighten-3" style="text-decoration: underline; color: #f67e7d;" target="_blank" href="${this.file}">Attachment</a>
                <br>
            </div>`
        }
        if (this.img) {
            img = `
            <div class="center-container">
                <img class="img-content responsive-img" src="${this.img}">
                <br>
            </div>`
        }
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 row">
            <div class="card bg-2f3162">
                <div class="card-content white-text">
                    <h4 style="margin-top: 0;" class="white-text">${this.title}</h4>
                    <p class="white-text">${this.description}</p><br>
                    ${img}
                    ${file}
                    <img src="${this.ownerPhoto}" class="circle chat-img responsive-img">
                    <span class="username teal-text text-accent-3">${this.owner}</span><br>
                    <span class="blue-grey-text text-lighten-3">${this.time}</span>
                    <div class="float-right">
                        <span>${this.like}</span>
                        <button class="btn"><i class="material-icons">thumb_up</i></button>
                    </div>
                </div>
            </div>
            <form class="col s12">
                <textarea class="materialize-textarea" placeholder="Comment"></textarea>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="file" id="file">
                    </div>
                </div>
                <button class="btn">Post</button>
            </form>
            <div class="col s12 comment-section">
                <div id="comment-display" class="bg-gradient-2"></div>
            </div>
        </div>`

        // Display comments
        this._shadowRoot.querySelector(".card").addEventListener('click', () => {
            const comment = this._shadowRoot.querySelector(".comment-section")
            if (comment.style.display == "none") {
                comment.style.display = "block"
            } else {
                comment.style.display = "none"
            }
        })

        // Listen to like action
        this._shadowRoot.querySelector("button").addEventListener('click', (e) => {
            e.preventDefault()
            $("body").removeClass("loaded")

            getDocument('discussions', this.id).then(doc => {
                if (doc.data().liked.includes(auth.currentUser.uid)) {
                    const data = {
                        liked: dataArr(auth.currentUser.uid, "remove")
                    }
                    return setData('discussions', this.id, true, data).then(() => {
                        $("body").addClass("loaded")
                    })
                } else {
                    const data = {
                        liked: dataArr(auth.currentUser.uid, "union")
                    }
                    return setData('discussions', this.id, true, data).then(() => {
                        $("body").addClass("loaded")
                    })
                }
            })
        })

        // Listen to submit comment action
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
                const fileRef = storageRef.child(`comments/${auth.currentUser.uid}/${today}`)
                await fileRef.put(file.files[0])
                url = await fileRef.getDownloadURL()
            }

            // Get content
            const content = this._shadowRoot.querySelector("textarea").value

            if (content.trim() == "") {
                notice("Please input valid comment")
            } else {
                let data
                if (isImage) {
                    data = {
                        comment: content.trim(),
                        owner: auth.currentUser.displayName,
                        ownerPhoto: auth.currentUser.photoURL,
                        photoURL: url,
                        time: time,
                        date: new Date(),
                        file: "",
                        ownerUID: auth.currentUser.uid
                    }
                } else {
                    data = {
                        comment: content.trim(),
                        owner: auth.currentUser.displayName,
                        ownerPhoto: auth.currentUser.photoURL,
                        photoURL: "",
                        time: time,
                        date: new Date(),
                        file: url,
                        ownerUID: auth.currentUser.uid
                    }
                }
                db.collection('comments').doc(this.id).collection('comments').add(data).then(() => {
                    this._shadowRoot.querySelector("form").reset()
                })
            }
        })

        // Display comments
        const commentDisplay = this._shadowRoot.querySelector("#comment-display")
        db.collection('comments').doc(this.id).collection('comments').orderBy('date', 'desc').limit(50).onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const data = change.doc.data()
                if (change.type == "added") {
                    commentDisplay.innerHTML += `<comment-item content="${data.comment}" ownerPhoto="${data.ownerPhoto}" img="${data.photoURL}" time="${data.time}" file="${data.file}" owner="${data.owner}"></comment-item>`
                }
            })
        })
    }
}

window.customElements.define("discussion-item", DiscussionItem)