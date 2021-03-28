import { css, dataArr, notice, setData } from '../js/utils.js'

class ClassItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this.uid = this.getAttribute('uid')
        this.ownerUID = this.getAttribute('ownerUID')
        this.owner = this.getAttribute('owner')
        this.ownerPhoto = this.getAttribute('ownerPhoto')
        this.name = this.getAttribute('name')
        this.time = this.getAttribute('time')
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 row">
            <div class="card cursor bg-2f3162">
                <div class="card-content white-text">
                    <h4 style="margin-top: 0;" class="center white-text">${this.name}</h4>
                    <img src="${this.ownerPhoto}" class="circle chat-img responsive-img">
                    <span class="username teal-text text-accent-3">${this.owner}</span><br>
                    <span class="blue-grey-text text-lighten-3">${this.time}</span>
                    <button class="ll-del-btn btn"><i class="material-icons">clear</i></button>
                </div>
            </div>
            <form class="col s12">
                <div class="row">
                    <input class="col s12" type="file" id="file">
                </div>
                <button class="btn">Post</button>
            </form>
            <div class="col s12 comment-section" style="height: 450px">
                <div class="bg-2f3162 card" style="height: 150px; overflow: auto;" id="member-display"></div>
                <div class="bg-2f3162 card" style="height: 250px; overflow: auto;" id="url-display"></div>
            </div>
        </div>`

        this._shadowRoot.querySelector(".card").addEventListener('click', () => {
            const comment = this._shadowRoot.querySelector(".comment-section")
            if (comment.style.display == "none") {
                comment.style.display = "block"
            } else {
                comment.style.display = "none"
            }
        })

        this._shadowRoot.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault()

            if (auth.currentUser.uid == this.ownerUID) {
                db.collection('classes').doc(this.uid).delete()
                db.collection('members').doc(this.uid).delete()
                db.collection('downloadURL').doc(this.uid).delete()
            } else {
                notice("You don't have permission to delete this class")
            }
        })

        this._shadowRoot.querySelector('form').addEventListener('submit', async (e) => {
            e.preventDefault()

            const today = new Date()
            let url = ""

            const file = this._shadowRoot.querySelector("#file")
            if (file.files[0]) {
                // Get download url
                const fileRef = storageRef.child(`classes/${auth.currentUser.uid}/${today}`)
                await fileRef.put(file.files[0])
                url = await fileRef.getDownloadURL()
            }
            const fileName = file.files[0].name
            setData('downloadURL', this.uid, true, {
                file: dataArr({
                    name: fileName,
                    url: url
                }, 'union')
            }).then(() => {
                this._shadowRoot.querySelector("form").reset()
            })
        })

        db.collection('members').doc(this.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#member-display").innerHTML = `<p style="margin: 0;" class="card-title white-text center">Members<p>`
            snapshot.data().info.forEach(doc => {
                this._shadowRoot.querySelector("#member-display").innerHTML += `
                <div class="col s3 m3">
                    <div class="bg-2f3162 card">
                        <img src="${doc.photoURL}" class="circle chat-img responsive-img">
                        <span class="username teal-text text-accent-3">${doc.username}</span>
                    </div>
                </div>`
            })
        })

        db.collection('downloadURL').doc(this.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#url-display").innerHTML = `<p style="margin: 0;" class="card-title white-text center">Files<p>`
            snapshot.data().file.forEach(doc => {
                this._shadowRoot.querySelector("#url-display").innerHTML += `
                <div class="col s12">
                    <div class="bg-2f3162 card">
                        <p class="white-text" style="overflow-wrap: break-word;">${doc.name}: ${doc.url}<p>
                    </div>
                </div>`
            })
        })
    }
}

window.customElements.define("class-item", ClassItem) 