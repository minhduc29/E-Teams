import { css, notice, setData, dataArr } from '../js/utils.js'

class TodoScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row">
                <form id="add-todo" autocomplete="off" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="todo" type="text" class="text-4b88a2" placeholder="To-Do">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="time" type="text" class="text-4b88a2" placeholder="Time to complete this task (hour):">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="date" type="text" class="text-4b88a2" placeholder="Deadline (year-month-day)">
                        </div>
                    </div>
                    <button class="btn">Add</button>
                </form>
            </div>
        </div>
        <div id="todo-display" class="container"></div>`

        auth.onAuthStateChanged(user => {
            if (user) {
                // Add todo data to firestore
                const addTodoForm = this._shadowRoot.querySelector("#add-todo")
                addTodoForm.addEventListener('submit', (e) => {
                    e.preventDefault()

                    // Get value
                    const todo = this._shadowRoot.querySelector("#todo").value
                    const time = this._shadowRoot.querySelector("#time").value
                    const date = this._shadowRoot.querySelector("#date").value
                    let deadline
                    if (date.trim() == "")
                        deadline = new Date().getTime()
                    else
                        deadline = new Date(date).getTime()
                    function isNumeric(str) {
                        if (typeof str != "string") return false
                        return !isNaN(str) && !isNaN(parseFloat(str))
                    }

                    // Check valid
                    if (todo.trim() == "" || time.trim() == "" || !isNumeric(time.trim()) || isNaN(deadline)) {
                        notice("Please input valid information")
                    } else {
                        // Add data
                        const todoData = {
                            todo: dataArr({
                                content: todo.trim(),
                                time: Number(time.trim()),
                                date: deadline
                            }, 'union')
                        }
                        setData('todos', user.uid, true, todoData).then(() => {
                            // Reset form
                            addTodoForm.reset()
                        })
                    }
                })

                // Realtime firestore
                const todoDisplay = this._shadowRoot.querySelector("#todo-display")
                db.collection("todos").doc(user.uid).onSnapshot(snapshot => {
                    todoDisplay.innerHTML = ''

                    function prioritize(a, b) {
                        if (a.date != b.date) {
                            return a.date - b.date
                        } else {
                            return a.time - b.time
                        }
                    }

                    let todos = snapshot.data().todo
                    todos.sort(prioritize)
                    todos.forEach(doc => {
                        todoDisplay.innerHTML += `<todo-item content="${doc.content}" time="${doc.time}" date="${doc.date}"></todo-item>`
                    })
                })
            }
        })
    }
}

window.customElements.define("todo-screen", TodoScreen)