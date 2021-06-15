import { css, notice, closeModal, setData } from '../js/utils.js'

class RegisterForm extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <h4 class="center text-4b88a2">Register</h4>
        <div class="row">
            <form id="register" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="username" type="text" class="validate text-4b88a2" placeholder="Username">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="email" class="validate text-4b88a2" placeholder="Email">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate text-4b88a2" placeholder="Password">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="pwconfirmation" type="password" class="validate text-4b88a2" placeholder="Password Confirmation">
                    </div>
                </div>
                <button class="btn">Register</button>
            </form>
        </div>`

        // Register
        const registerForm = this._shadowRoot.querySelector('#register')
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault()

            // Get user info
            const username = this._shadowRoot.querySelector('#username').value
            const email = this._shadowRoot.querySelector('#email').value
            const password = this._shadowRoot.querySelector('#password').value
            const pwcf = this._shadowRoot.querySelector('#pwconfirmation').value

            // Register user
            if (username.trim() === '') {
                notice('Missing username')
            } else if (username.trim().length < 6) {
                notice('Username must be at least 6 characters')
            } else if (password !== pwcf) {
                notice('Password and password confirmation must be the same')
            } else if (password === pwcf) {
                let exist = false
                db.collection('users').where('username', '==', username.trim()).get().then(doc => {
                    doc.forEach(data => {
                        if (data.exists) {
                            exist = true
                        }
                    })
                    if (!exist) {
                        auth.createUserWithEmailAndPassword(email, password).then(cred => {
                            auth.currentUser.sendEmailVerification()
                            // Create data firestore
                            const initialData = {
                                username: username,
                                email: email,
                                photoURL: 'https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/users%2Fprofile_picture.png?alt=media&token=b81c9c34-010c-4249-aa74-3c36d7ca183b'
                            }
                            setData('users', cred.user.uid, false, initialData)
                            auth.currentUser.updateProfile({
                                displayName: username,
                                photoURL: 'https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/users%2Fprofile_picture.png?alt=media&token=b81c9c34-010c-4249-aa74-3c36d7ca183b'
                            })
                            notice(`User ${username} successfully registered`)
                        }).then(() => {
                            // Reset form
                            closeModal('#register-modal')
                            registerForm.reset()
                        }).catch(err => {
                            // Catch error
                            notice(err.message)
                        })
                    } else {
                        notice("This username has already been taken")
                    }
                })
            }
        })
    }
}

window.customElements.define("register-form", RegisterForm)