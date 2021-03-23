import { css } from '../js/utils.js'

class ClassScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="row center">
            <div class="col s12 m6">
                <a href="#" id="create-class" class="double btn-large waves-effect waves-light bg-4b88a2 modal-trigger">Create Class</a>
            </div>
            <div class="col s12 m6">
                <a href="#" id="enter-class" class="double btn-large waves-effect waves-light bg-4b88a2 modal-trigger">Enter Class</a>
            </div>
        </div>
        <br><br>
        <div class="container">
            <div class="row s12 m12"></div>
        </div>
        <div id="class-display" class="container"></div>`

        this._shadowRoot.querySelector("#create-class").onclick = (e) => {
            e.preventDefault()
            this._shadowRoot.querySelector(".m12").innerHTML = "<create-class></create-class>"
        }
        this._shadowRoot.querySelector("#enter-class").onclick = (e) => {
            e.preventDefault()
            this._shadowRoot.querySelector(".m12").innerHTML = "<enter-class></enter-class>"
        }

        db.collection('classes').where('member', 'array-contains', auth.currentUser.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#class-display").innerHTML = ""
            snapshot.forEach(doc => {
                this._shadowRoot.querySelector("#class-display").innerHTML += `<class-item uid="${doc.id}" ownerUID="${doc.data().ownerUID}" name="${doc.data().name}" time="${doc.data().time}" owner="${doc.data().owner}" ownerPhoto="${doc.data().ownerPhoto}"></class-item>`
            })
        })
    }
}

window.customElements.define("class-screen", ClassScreen)