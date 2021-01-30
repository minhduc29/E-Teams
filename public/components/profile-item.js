import { css, changeProfilePic, changePassword } from '../js/utils.js'

class ProfileItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <img id="profile-pic" src="" alt="Profile Picture" class="responsive-img">
        <h2 class="center text-4b88a2">Profile</h2>
        <div id="profile"></div><br>
        <button class="btn" id="change-pw">Change password</button>
        <input type="file" id="change-pp">`

        // Change profile picture
        const changePp = this._shadowRoot.querySelector("#change-pp")
        changePp.addEventListener('change', (e) => {
            e.preventDefault()
            changeProfilePic(e)
            changePp.value = ''
        })

        // Change password
        const changePw = this._shadowRoot.querySelector("#change-pw")
        changePw.addEventListener('click', (e) => {
            e.preventDefault()
            changePassword(auth.currentUser)
        })

        // Check and change data for current user
        auth.onAuthStateChanged(user => {
            if (user) {
                const html = `
                <br><h5 class="text-2f3162">Email: ${user.email}</h5>
                <br><h5 class="text-2f3162">Username: ${user.displayName}</h5>`
                this._shadowRoot.querySelector("#profile").innerHTML = html
                this._shadowRoot.querySelector("#profile-pic").src = user.photoURL

                // Realtime update photoURL
                db.collection('users').doc(user.uid).onSnapshot(snapshot => {
                    this._shadowRoot.querySelector("#profile-pic").src = snapshot.data().photoURL
                })
            }
        })
    }
}

window.customElements.define('profile-item', ProfileItem)