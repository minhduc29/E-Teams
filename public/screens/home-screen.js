import { css } from '../js/utils.js'

class HomeScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row">
                <div class="col s12 m6">
                    <description-item title="Class" description="Where teachers assign homework for students" link="Enter or create your class" redirect="class"></description-item>
                </div>
                <div class="col s12 m6">
                    <description-item title="Discussion" description="Where people discuss a topic or a question" link="Discuss or ask a question" redirect="discussion"></description-item>
                </div>
                <div class="col s12 m6">
                    <div class="card bg-2f3162">
                        <div class="card-content white-text height-140">
                            <span class="card-title">Room</span>
                            <p>Where people can make video call and voice chat</p>
                        </div>
                        <div class="card-action">
                            <a id="redirect" class="teal-text text-accent-3" href="./html/room.html" target="_blank">Video call and voice chat</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m6">
                    <description-item title="Learning Log" description="Keep track of your learning about specific topic" link="Keep track" redirect="learninglog"></description-item>
                </div>
                <div class="col s12 m6">
                    <description-item title="To-Do" description="Where people take note and make to-do list" link="Make To-Do list" redirect="todo"></description-item>
                </div>
                <div class="col s12 m6">
                    <description-item title="Playground" description="Where people spend some time to relax after stressful hours of studying and working" link="Play" redirect="playground"></description-item>
                </div>
                <div class="col s12 m6">
                    <description-item title="Chat Room" description="Where people create chat room and send messages" link="Chat" redirect="chat"></description-item>
                </div>
            </div>
        </div>`
    }
}

window.customElements.define("home-screen", HomeScreen)