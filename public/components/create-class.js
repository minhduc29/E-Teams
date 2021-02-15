import { css, setData, notice } from '../js/utils.js'

class CreateClass extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 bg-gradient-2 text-4b88a2">
            <h4 class="center">Create Class</h4>
            <div class="row">
                <form id="create-class" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="clname" type="text" autocomplete="off" class="text-4b88a2" placeholder="Class Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="clpassword" type="password" class="validate text-4b88a2" placeholder="Password for Class">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="clpwconfirmation" type="password" class="validate text-4b88a2" placeholder="Password Confirmation">
                        </div>
                    </div>
                    <button class="btn">Create</button>
                </form>
            </div>
        </div>`

        const createClassForm = this._shadowRoot.querySelector('#create-class')
        createClassForm.addEventListener('submit', (e) => {
            e.preventDefault()

            // Get element
            const className = this._shadowRoot.querySelector('#clname').value
            const clPassword = this._shadowRoot.querySelector('#clpassword').value
            const clpwConfirmation = this._shadowRoot.querySelector('#clpwconfirmation').value

            // Check valid information
            if (clpwConfirmation !== clPassword) {
                notice('Password and password confirmation must be the same')
            } else if (className.trim() == "" || clPassword.trim() == "") {
                notice("Please input valid class name or password")
            } else {
                // Check if doc already existed
                let able
                db.collection('classes').where('name', '==', className).where('password', '==', clPassword).get().then(doc => {
                    able = true
                    doc.forEach(data => {
                        if (data.exists) {
                            notice("Please try to enter more unique class name or password")
                            able = false
                        }
                    })
                    if (able) {
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

                        // Set data
                        const initialClassData = {
                            name: className,
                            password: clPassword,
                            owner: auth.currentUser.displayName,
                            ownerPhoto: auth.currentUser.photoURL,
                            ownerUID: auth.currentUser.uid, 
                            time: time,
                            member: [auth.currentUser.uid]
                        }
                        db.collection('members').add({
                            member: [auth.currentUser.uid],
                            info: [{
                                photoURL: auth.currentUser.photoURL,
                                username: auth.currentUser.displayName
                            }]
                        }).then(doc => {
                            setData('downloadURL', doc.id, false, {
                                file: []
                            })
                            setData('classes', doc.id, false, initialClassData).then(() => {
                                createClassForm.reset()
                                notice(`Created class ${className}`)
                            }).catch(err => {
                                notice(err.message)
                            })
                        })
                    }
                })
            }
        })
    }
}

window.customElements.define("create-class", CreateClass)