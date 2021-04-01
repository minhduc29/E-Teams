import { css, dataArr, setData } from '../js/utils.js'

class TodoItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.content = this.getAttribute("content")
        this.time = this.getAttribute("time")
        this.date = this.getAttribute("date")
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="row col s12 m12">
            <div class="card">
                <div class="card-content bg-2f3162">
                    <p class="white-text">TASK: ${this.content}</p><br>
                    <p class="white-text">TIME TO COMPLETE (HOUR): ${this.time}</p><br>
                    <p class="white-text">DAYS LEFT: ${this.date}</p><br>
                    <button class="todo-del-btn btn"><i class="material-icons">clear</i></button>
                </div>
            </div>
        </div>`

        // Delete function
        const delBtn = this._shadowRoot.querySelector(".todo-del-btn")
        delBtn.addEventListener('click', () => {
            const todoData = {
                todo: dataArr({
                    content: this.content,
                    time: Number(this.time),
                    date: Number(this.date)
                }, 'remove')
            }
            setData('todos', auth.currentUser.uid, true, todoData)
        })
    }
}

window.customElements.define('todo-item', TodoItem)