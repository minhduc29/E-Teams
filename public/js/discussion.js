import { notice, closeModal, initialize, getDocument, dataArr, setData } from './utils.js'

// Add discussion data to firebase
const discussionForm = document.querySelector('#discuss')
discussionForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get data
    const title = discussionForm['title'].value
    const description = discussionForm['description'].value

    // Check blank value
    if (title == '' || description == '') {
        notice('Missing title or description')
    } else {
        // Add data to firestore
        getDocument('users', auth.currentUser.uid).then(doc => {
            db.collection('discussions').add({
                title: title,
                description: description,
                owner: doc.data().username,
                like: 0
            }).then(() => {
                // Reset form
                closeModal('#discuss-modal')
                discussionForm.reset()
            }).catch(err => {
                notice(err.message)
            })
        })
    }
})

// Display discussion
const ref = db.collection('discussions')
const ref2 = db.collection('comments')
ref.onSnapshot(snapshot => {
    let id = []
    let discussions = []
    snapshot.forEach(doc => {
        discussions.push({ ...doc.data(), id: doc.id })
    })
    let html = ''
    discussions.forEach(discussion => {
        id.push(discussion.id)
        html += `<div class="col s12 m12 row">
                    <div class="card bg-2f3162">
                        <div class="card-content white-text">
                            <a href="#${discussion.id}" class="modal-trigger">
                                <span class="card-title white-text">${discussion.title}</span>
                                <p class="white-text">${discussion.description}</p><br>
                                <span class="teal-text text-accent-3">by ${discussion.owner}</span>
                            </a>
                            <div class="float-right">
                                <span>${discussion.like}</span>
                                <button class="btn like"><i class="material-icons">thumb_up</i></button>
                            </div>
                        </div>
                        <form class="comment-form col s12">
                            <textarea class="comment materialize-textarea" placeholder="Comment"></textarea>
                            <button class="btn">Post</button>
                        </form>
                    </div>
                    <div id="${discussion.id}" class="modal bg-gradient-2">
                        <div class="comment-display modal-content"></div>
                    </div>
                </div>`
    })
    document.querySelector('#discuss-display').innerHTML = html

    // Get element
    let likes = document.getElementsByClassName('like')
    let commentForms = document.getElementsByClassName('comment-form')
    let comments = document.getElementsByClassName('comment')
    let commentDisplay = document.getElementsByClassName('comment-display')

    // Action with discussion
    for (let i = 0; i < id.length; i++) {
        // Define firestore data
        let user = db.collection('users').doc(auth.currentUser.uid)
        let discussion = db.collection('discussions').doc(id[i])

        // Like discussion
        likes[i].addEventListener('click', (e) => {
            e.preventDefault()
            $("body").removeClass("loaded")

            getDocument('users', auth.currentUser.uid).then(doc => {
                // Check if user hasn't already liked
                if (doc.data().liked.includes(id[i])) {
                    // Update the array in user doc
                    return user.update({
                        liked: dataArr(id[i], 'remove')
                    }).then(() => {
                        // Update the likes on the discussion
                        return discussion.update({
                            like: dataArr(-1, 'increment')
                        }).then(() => {
                            $("body").addClass("loaded")
                        })
                    })
                } else {
                    // Update the array in user doc
                    return user.update({
                        liked: [...doc.data().liked, id[i]]
                    }).then(() => {
                        // Update the likes on the discussion
                        return discussion.update({
                            like: dataArr(1, 'increment')
                        }).then(() => {
                            $("body").addClass("loaded")
                        })
                    })
                }
            })
        })

        // Save comment to firestore
        commentForms[i].addEventListener('submit', (e) => {
            e.preventDefault()

            getDocument('users', auth.currentUser.uid).then(doc => {
                const commentInfo = {
                    owner: doc.data().username,
                    comment: comments[i].value
                }
                const commentData = {
                    comment: dataArr(commentInfo, 'union')
                }
                setData('comments', id[i], true, commentData).then(() => {
                    // Reset form
                    commentForms[i].reset()
                })
            })
        })
    }

    initialize()

    // Display comment
    ref2.onSnapshot(snapshot => {
        for (let i = 0; i < id.length; i++) {
            commentDisplay[i].innerHTML = ''
        }
        let comments = []
        snapshot.forEach(doc => {
            comments.push({ ...doc.data(), id: doc.id })
        })
        for (let i = 0; i < comments.length; i++) {
            for (let e = 0; e < comments[i].comment.length; e++) {
                let uid = comments[i].id
                let cmt_html = `<div class="row col s12 m12">
                                    <div data-id="${uid}" class="card">
                                        <div class="card-content bg-2f3162">
                                            <p class="white-text">${comments[i].comment[e].comment}</p><br>
                                            <span class="teal-text text-accent-3">by ${comments[i].comment[e].owner}</span>
                                        </div>
                                    </div>
                                </div>`
                for (let i = 0; i < id.length; i++) {
                    if (uid == id[i]) {
                        commentDisplay[i].innerHTML += cmt_html
                    }
                }
            }
        }
    })
})