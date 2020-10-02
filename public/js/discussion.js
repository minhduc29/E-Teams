// Add discussion data to firebase
const discussionForm = document.querySelector('#discuss');
discussionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get data
    const title = discussionForm['title'].value;
    const description = discussionForm['description'].value;

    // Add data to firestore
    db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
        db.collection('discussion').add({
            title: title,
            description: description,
            owner: doc.data().username
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
const ref = firebase.firestore().collection('discussion');
ref.onSnapshot(snapshot => {
    let discussions = [];
    snapshot.forEach(doc => {
        discussions.push(doc.data());
    });

    let html = '';
    discussions.forEach(discussion => {
        html += `<div class="row">
                    <div class="col s12 m12">
                        <div class="card light-blue darken-4">
                            <div class="card-content white-text">
                                <span class="card-title">${discussion.title}</span>
                                <p>${discussion.description}</p><br>
                                <p class="teal-text text-accent-3">by: ${discussion.owner}</p>
                            </div>
                        </div>
                    </div>
                </div>`
    });
    document.querySelector('#discuss-display').innerHTML = html;
});