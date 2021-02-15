import { css, notice, dataArr, setData } from '../js/utils.js'

class EnterClass extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s12 m12 bg-gradient-2 text-4b88a2">
            <h4 class="center">Enter Class</h4>
            <div class="row">
                <form id="enter-class" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="clname" type="text" autocomplete="off" class="text-4b88a2" placeholder="Class Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="clpassword" type="password" class="validate text-4b88a2" placeholder="Class Password">
                        </div>
                    </div>
                    <button class="btn">Enter</button>
                </form>
            </div>
        </div>`

        const enterClassForm = this._shadowRoot.querySelector('#enter-class')
        enterClassForm.addEventListener('submit', (e) => {
            e.preventDefault()

            // Get element
            const className = this._shadowRoot.querySelector('#clname').value
            const clPassword = this._shadowRoot.querySelector('#clpassword').value

            // Check if input and class information is valid and send request to firestore
            if (className.trim() == "" || clPassword.trim() == "") {
                notice("Please input valid class name or password")
            }
            let exist
            db.collection('classes').where('name', '==', className).where('password', '==', clPassword).get().then(doc => {
                exist = false
                doc.forEach(data => {
                    if (data.exists) {
                        if (data.data().member.includes(auth.currentUser.uid)) {
                            notice('You are already in this class')
                        } else {
                            const memData = {
                                member: dataArr(auth.currentUser.uid, 'union'),
                                info: dataArr({
                                    photoURL: auth.currentUser.photoURL,
                                    username: auth.currentUser.displayName
                                }, 'union')
                            }
                            setData('classes', data.id, true, {
                                member: memData.member
                            })
                            setData('members', data.id, true, memData).then(() => {
                                enterClassForm.reset()
                                notice(`You have joined class ${data.data().name}`)
                            })
                        }
                        exist = true
                    }
                })
                if (!exist) {
                    notice('Invalid class name or password')
                }
            })
        })
    }
}

window.customElements.define("enter-class", EnterClass)