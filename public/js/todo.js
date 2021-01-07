import { notice, closeModal } from './function.js'

// Reference
const todoRef = db.collection("todos")

// Add todo data to firestore
$("#add-todo").submit((e) => {
    e.preventDefault()

    // Get value
    let todo = $("#todo").val()

    // Check length
    if (todo.length > 1) {
        // Add data
        todoRef.doc(auth.currentUser.uid).set({
            todo: firebase.firestore.FieldValue.arrayUnion(todo)
        }, {
            merge: true
        }).then(() => {
            // Reset form and close modal
            closeModal("#todo-modal")
            document.querySelector("#add-todo").reset()
        })
    } else {
        notice("The length of to-do must be more than 1 character")
    }
})

// Realtime firestore
let todoDisplay = document.querySelector("#todo-display")
todoRef.onSnapshot(snapshot => {
    todoDisplay.innerHTML = ''

    let todos = []
    let content = []

    snapshot.forEach(doc => {
        todos.push({...doc.data(), id: doc.id})
    })

    // Display todo
    let todoHtml = ''
    for (let i = 0; i < todos.length; i++) {
        for (let j = 0; j < todos[i].todo.length; j++) {
            todoHtml = `<div class="row col s12 m12">
                            <div class="card">
                                <div class="card-content bg-2f3162">
                                    <p class="white-text">${todos[i].todo[j]}</p><br>
                                    <button class="del-btn btn"><i class="material-icons">clear</i></button>
                                </div>
                            </div>
                        </div>`
            if (todos[i].id == auth.currentUser.uid) {
                content.push(todos[i].todo[j])
                todoDisplay.innerHTML += todoHtml
            }
        }
    }

    // Delete function
    let delBtn = document.getElementsByClassName("del-btn")
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", () => {
            todoRef.doc(auth.currentUser.uid).update({
                todo: firebase.firestore.FieldValue.arrayRemove(content[i])
            })
        })
    }
})