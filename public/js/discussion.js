// Add discussion data to firebase
const discussionForm = document.querySelector('#discuss');
discussionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get data
    const title = discussionForm['title'].value;
    const description = discussionForm['description'].value;

    // Add data to firestore
    db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
        db.collection('discussions').add({
            title: title,
            description: description,
            owner: doc.data().username,
            like: 0
        }).then(() => {
            // Reset form
            const modal = document.querySelector('#discuss-modal');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        }).catch(err => {
            alert(err.message);
        });
    });
});

// Display discussion
const ref = firebase.firestore().collection('discussions');
ref.onSnapshot(snapshot => {
    var id = [];
    let discussions = [];
    snapshot.forEach(doc => {
        discussions.push({ ...doc.data(), id: doc.id });
    });
    let html = '';
    discussions.forEach(discussion => {
        id.push(discussion.id)
        html += `<div class="row">
                    <div class="col s12 m12">
                        <div class="card light-blue darken-4">
                            <div class="card-content white-text">
                                <span class="card-title">${discussion.title}</span>
                                <p>${discussion.description}</p><br>
                                <span class="teal-text text-accent-3">by: ${discussion.owner}</span>
                                <div class="float-right">
                                    <span>${discussion.like}</span>
                                    <button class="btn like"><i class="material-icons">thumb_up</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    });
    document.querySelector('#discuss-display').innerHTML = html;

    // Get like button
    var like = document.getElementsByClassName('like');

    // Like discussion
    for (let i = 0; i < id.length; i++) {
        like[i].addEventListener('click', () => {
            // Define firestore data
            let user = db.collection('users').doc(auth.currentUser.uid);
            let discussion = db.collection('discussions').doc(id[i]);

            return user.get().then(doc => {
                // Check if user hasn't already liked
                if (doc.data().liked.includes(id[i])) {
                    // Update the array in user doc
                    return user.update({
                        liked: firebase.firestore.FieldValue.arrayRemove(id[i])
                    }).then(() => {
                        // Update the likes on the discussion
                        return discussion.update({
                            like: firebase.firestore.FieldValue.increment(-1)
                        });
                    })
                } else {
                    // Update the array in user doc
                    return user.update({
                        liked: [...doc.data().liked, id[i]]
                    }).then(() => {
                        // Update the likes on the discussion
                        return discussion.update({
                            like: firebase.firestore.FieldValue.increment(1)
                        });
                    });
                };
            });
        });
    };
});