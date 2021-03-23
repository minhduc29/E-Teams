import { css, notice, setData } from '../js/utils.js'

class LearningLogScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row">
                <form id="add-topic" autocomplete="off" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="topic" type="text" class="text-4b88a2" placeholder="Topic">
                        </div>
                    </div>
                    <button class="btn">Add</button>
                </form>
            </div>
        </div>
        <div id="topic-display" class="container"></div>`

        const addTopicForm = this._shadowRoot.querySelector("#add-topic")
        addTopicForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const topic = this._shadowRoot.querySelector("#topic").value
            if (topic.trim() == "") {
                notice("Please input valid topic name")
            } else {
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

                db.collection('entries').add({
                    entry: []
                }).then(doc => {
                    setData('topics', doc.id, false, {
                        ownerUID: auth.currentUser.uid,
                        time: time,
                        topic: topic.trim()
                    })
                    addTopicForm.reset()
                })
            }
        })

        db.collection('topics').where('ownerUID', '==', auth.currentUser.uid).onSnapshot(snapshot => {
            this._shadowRoot.querySelector("#topic-display").innerHTML = ""
            snapshot.forEach(doc => {
                this._shadowRoot.querySelector("#topic-display").innerHTML += `<topic-item uid="${doc.id}" topic="${doc.data().topic}" time="${doc.data().time}"></topic-item>`
            })
        })
    }
}

window.customElements.define("learninglog-screen", LearningLogScreen)