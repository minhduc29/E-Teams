import { css, dataArr, notice, setData } from '../js/utils.js'

class TopicItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.uid = this.getAttribute('uid')
        this.time = this.getAttribute('time')
        this.topic = this.getAttribute('topic')
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 row">
            <div class="card cursor bg-2f3162">
                <div class="card-content white-text">
                    <h4 style="margin-top: 0;" class="white-text center">${this.topic}</h4>
                    <p class="blue-grey-text text-lighten-3 center">${this.time}</p>
                    <button class="chat-btn btn"><i class="material-icons">clear</i></button>
                </div>
            </div>
            <form class="col s12">
                <textarea class="materialize-textarea text-4b88a2" placeholder="Entries"></textarea>
                <button class="btn">Add</button>
            </form>
            <div class="col s12 comment-section">
                <div id="comment-display" class="bg-gradient-2"></div>
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

        this._shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault()

            const content  = this._shadowRoot.querySelector('textarea').value
            if (content.trim() == "") {
                notice("Please input valid entry")
            } else {
                setData('entries', this.uid, true, {
                    entry: dataArr(content.trim(), 'union')
                })
                this._shadowRoot.querySelector('form').reset()
            }
        })

        db.collection('entries').doc(this.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#comment-display").innerHTML = ""

            snapshot.data().entry.forEach(doc => {
                this._shadowRoot.querySelector("#comment-display").innerHTML += `<entry-item content="${doc}" uid="${this.uid}"></entry-item>`
            })
        })

        this._shadowRoot.querySelector(".chat-btn").addEventListener('click', (e) => {
            e.preventDefault()

            db.collection('topics').doc(this.uid).delete()
            db.collection('entries').doc(this.uid).delete()
        })
    }
}

window.customElements.define('topic-item', TopicItem)