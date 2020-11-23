// Reference
const topicRef = db.collection('topics')
const entryRef = db.collection('entries')

// Add topic data to firebase
const topicForm = document.querySelector('#add-topic')
topicForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get data
    const topicName = topicForm['topic-name'].value

    // Check blank value
    if (topicName == '') {
        alert('Missing topic name')
    } else {
        // Add data to firestore
        topicRef.add({
            topicName: topicName,
            ownerUID: auth.currentUser.uid
        }).then(() => {
            // Reset form
            const modal = document.querySelector('#add-topic-modal')
            M.Modal.getInstance(modal).close()
            topicForm.reset()
        }).catch(err => {
            alert(err.message)
        })
    }
})

let topics = []
// Display topic
topicRef.onSnapshot(snapshot => {
    topics = []
    let topicID = []
    snapshot.forEach(doc => {
        topics.push({ ...doc.data(), id: doc.id })
        topicID.push(doc.id)
    })
    let topic_html = ''
    topics.forEach(topic => {
        topic_html += ` <div class="topic col s12 m12 row">
                            <div class="card bg-2f3162">
                                <div class="card-content white-text">
                                    <a href="#${topic.id}" class="modal-trigger">
                                        <h4 class="center white-text">${topic.topicName}</h4>
                                        <p class="center white-text">Entry</p>
                                    </a>
                                    <button class="ll-del-btn btn"><i class="material-icons">clear</i></button>
                                </div>
                                <form class="entry-form col s12">
                                    <textarea class="entry materialize-textarea" placeholder="Add Entry"></textarea>
                                    <button class="btn">Add</button>
                                </form>
                            </div>
                            <div id="${topic.id}" class="modal bg-gradient-2">
                                <div class="entry-display modal-content"></div>
                            </div>
                        </div>`
    })
    document.querySelector('#topic-display').innerHTML = topic_html

    // Delete topic
    let llDelBtn = document.getElementsByClassName("ll-del-btn")
    for (let i = 0; i < llDelBtn.length; i++) {
        llDelBtn[i].addEventListener("click", () => {
            topicRef.doc(topicID[i]).delete()
            entryRef.doc(topicID[i]).delete()
        })
    }

    // Get element
    let entryDisplay = document.getElementsByClassName('entry-display')
    let entries = document.getElementsByClassName('entry')
    let entryForms = document.getElementsByClassName('entry-form')

    for (let i = 0; i < topicID.length; i++) {
        // Reference
        let entry = db.collection('entries').doc(topicID[i])

        // Save entry to firestore
        entryForms[i].addEventListener('submit', (e) => {
            e.preventDefault()

            return entry.set({
                entry: firebase.firestore.FieldValue.arrayUnion(entries[i].value)
            }, {
                merge: true
            }).then(() => {
                // Reset form
                entryForms[i].reset()
            })
        })
    }

    // Check owner
    let topiced = document.getElementsByClassName('topic')
    for (let i = 0; i < topics.length; i++) {
        if (auth.currentUser) {
            if (topics[i].ownerUID == auth.currentUser.uid) {
                topiced[i].style.display = 'block'
            } else {
                topiced[i].style.display = 'none'
            }
        } else {
            topiced[i].style.display = 'none'
        }
    }
    
    window.setTimeout(() => {
        M.AutoInit()
    }, 2000)

    // Display entry
    entryRef.onSnapshot(snapshot => {
        for (let i = 0; i < topicID.length; i++) {
            entryDisplay[i].innerHTML = ''
        }
        let entries = []
        snapshot.forEach(doc => {
            entries.push({ ...doc.data(), id: doc.id })
        })
        for (let i = 0; i < entries.length; i++) {
            for (let e = 0; e < entries[i].entry.length; e++) {
                let uid = entries[i].id
                let entry_html = `  <div class="row col s12 m12">
                                        <div data-id="${uid}" class="card">
                                            <div class="card-content bg-2f3162">
                                                <p class="white-text">${entries[i].entry[e]}</p><br>
                                            </div>
                                        </div>
                                    </div>`
                for (let i = 0; i < topicID.length; i++) {
                    if (uid == topicID[i]) {
                        entryDisplay[i].innerHTML += entry_html
                    }
                }
            }
        }

        window.setTimeout(() => {
            M.AutoInit()
        }, 2000)
    })
})

window.setTimeout(() => {
    M.AutoInit()
}, 2000)

auth.onAuthStateChanged(user => {
    window.setTimeout(() => {
        M.AutoInit()
        let topiced = document.getElementsByClassName('topic')
        if (user) {
            for (let i = 0; i < topics.length; i++) {
                if (topics[i].ownerUID == auth.currentUser.uid) {
                    topiced[i].style.display = 'block'
                } else {
                    topiced[i].style.display = 'none'
                }
            }
        } else {
            for (let i = 0; i < topics.length; i++) {
                topiced[i].style.display = 'none'
            }
        }
    }, 2000)
})