import { css, notice, setData } from '../js/utils.js'

class DiscussionScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row center">
                <div class="col s12 m6">
                    <a href="#" id="s_btn" class="double btn-large waves-effect waves-light bg-4b88a2">Search</a>
                </div>
                <div class="col s12 m6">
                    <a href="#" id="p_btn" class="double btn-large waves-effect waves-light bg-4b88a2">Post</a>
                </div>
            </div>
            <div class="row display">
                <form id="discuss" class="col s12 topic">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="title" class="materialize-textarea text-4b88a2" placeholder="Title"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="description" class="materialize-textarea text-4b88a2" placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="file" id="file">
                        </div>
                    </div>
                    <button class="btn">Post</button>
                </form>
                <form id="search" class="col s12 topic">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="search-value" class="materialize-textarea text-4b88a2" placeholder="Search"></textarea>
                        </div>
                    </div>
                    <button class="btn"><i class="material-icons">search</i></button>
                </form>
            </div>
        </div>
        <div id="discuss-display" class="container"></div>`

        const searchForm = this._shadowRoot.querySelector('#search')
        const discussionForm = this._shadowRoot.querySelector('#discuss')

        this._shadowRoot.querySelector('#s_btn').addEventListener('click', (e) => {
            e.preventDefault()

            discussionForm.style.display = "none"
            if (searchForm.style.display == "none") {
                searchForm.style.display = 'block'
            } else {
                searchForm.style.display = "none"
            }
        })

        this._shadowRoot.querySelector('#p_btn').addEventListener('click', (e) => {
            e.preventDefault()

            searchForm.style.display = "none"
            if (discussionForm.style.display == "none") {
                discussionForm.style.display = 'block'
            } else {
                discussionForm.style.display = "none"
            }
        })

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const searchValue = this._shadowRoot.querySelector("#search-value").value
            const value = searchValue.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()

            if (value == "") {
                notice("Please input valid search information")
            } else {
                let exist = false
                db.collection('discussions').get().then(doc => {
                    this._shadowRoot.querySelector('#discuss-display').innerHTML = ""
                    doc.docs.forEach(data => {
                        const ownerSearch = data.data().owner.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()
                        const titleSearch = data.data().title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()
                        const descriptionSearch = data.data().description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()
                        const timeSearch = data.data().time.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()
                        if (ownerSearch.includes(value) || titleSearch.includes(value) || descriptionSearch.includes(value) || timeSearch.includes(value)) {
                            exist = true
                            this._shadowRoot.querySelector('#discuss-display').innerHTML += `<discussion-item title="${data.data().title}" description="${data.data().description}" ownerPhoto="${data.data().ownerPhoto}" img="${data.data().photoURL}" time="${data.data().time}" file="${data.data().file}" owner="${data.data().owner}" like="${data.data().liked.length}" uid="${data.id}"></discussion-item>`
                        }
                    })
                    if (!exist) {
                        this._shadowRoot.querySelector('#discuss-display').innerHTML = `<h3 class="center text-4b88a2">No search result</h3>`
                    }
                }).then(() => {
                    searchForm.reset()
                })
            }
        })

        discussionForm.addEventListener('submit', async (e) => {
            e.preventDefault()

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

            // Get url
            let isImage = false
            let url = ""

            const file = this._shadowRoot.querySelector("#file")
            if (file.files[0]) {
                // Check image
                if (file.files[0].type.startsWith("image")) {
                    isImage = true
                }

                // Get download url
                const fileRef = storageRef.child(`discussions/${auth.currentUser.uid}/${today}`)
                await fileRef.put(file.files[0])
                url = await fileRef.getDownloadURL()
            }

            // Get content
            const title = this._shadowRoot.querySelector('#title').value
            const description = this._shadowRoot.querySelector('#description').value

            // Check blank value and add doc to firestore
            if (title.trim() == '' || description.trim() == '') {
                notice('Please input valid title or description')
            } else {
                let data
                if (isImage) {
                    data = {
                        title: title.trim(),
                        description: description.trim(),
                        owner: auth.currentUser.displayName,
                        ownerPhoto: auth.currentUser.photoURL,
                        liked: [],
                        date: new Date(),
                        photoURL: url,
                        time: time,
                        file: "",
                        ownerUID: auth.currentUser.uid
                    }
                } else {
                    data = {
                        title: title.trim(),
                        description: description.trim(),
                        owner: auth.currentUser.displayName,
                        ownerPhoto: auth.currentUser.photoURL,
                        liked: [],
                        date: new Date(),
                        photoURL: "",
                        time: time,
                        file: url,
                        ownerUID: auth.currentUser.uid
                    }
                }

                db.collection('comments').add({}).then(doc => {
                    setData('discussions', doc.id, false, data).then(() => {
                        discussionForm.reset()
                    }).catch(err => {
                        notice(err.message)
                    })
                }).catch(err => {
                    notice(err.message)
                })
            }
        })

        // Display discussion
        const discussionRef = db.collection('discussions')
        discussionRef.orderBy('date', 'desc').onSnapshot(snapshot => {
            this._shadowRoot.querySelector('#discuss-display').innerHTML = ""
            snapshot.forEach(doc => {
                const data = doc.data()
                this._shadowRoot.querySelector('#discuss-display').innerHTML += `<discussion-item title="${data.title}" description="${data.description}" ownerPhoto="${data.ownerPhoto}" img="${data.photoURL}" time="${data.time}" file="${data.file}" owner="${data.owner}" like="${data.liked.length}" uid="${doc.id}"></discussion-item>`
            })
        })
    }
}

window.customElements.define("discussion-screen", DiscussionScreen)