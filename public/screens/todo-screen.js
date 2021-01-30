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
                    <button class="btn">Add</button>
                </form>
            </div>
        </div>
        <div id="todo-display" class="container"></div>`
        // Add todo data to firestore
        const addTodoForm = this._shadowRoot.querySelector("#add-todo")
        addTodoForm.addEventListener('submit', (e) => {
            e.preventDefault()

            // Get value
            const todo = this._shadowRoot.querySelector("#todo").value

            // Check valid
            if (todo.trim() == "") {
                notice("Please input valid to-do!")
            } else {
                // Add data
                const todoData = {
                    todo: dataArr(todo, 'union')
                }
                setData('todos', auth.currentUser.uid, true, todoData).then(() => {
                    // Reset form
                    addTodoForm.reset()
                })
            }
        })

        // Realtime firestore
        const todoDisplay = this._shadowRoot.querySelector("#todo-display")
        db.collection("todos").doc(auth.currentUser.uid).onSnapshot(snapshot => {
            todoDisplay.innerHTML = ''
            
            snapshot.data().todo.forEach(doc => {
                todoDisplay.innerHTML += `<todo-item content="${doc}"></todo-item>`
            })
        })
    }
}

window.customElements.define("todo-screen", TodoScreen)