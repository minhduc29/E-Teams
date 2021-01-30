import { css } from '../js/utils.js'

class ContactItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = `
        ${css}
        <h4 class="center">Contact</h4>
        <div>
            <h5>Facebook</h5>
            <p><a class="white-text" target="_blank" href="https://www.facebook.com/profile.php?id=100009400054425">Nguyen Minh Duc</a></p>
        </div><br>
        <div>
            <h5>Phone number</h5>
            <p>Nguyen Minh Duc: 0981062376</p>
        </div><br>
        <div>
            <h5>Email</h5>
            <p>Nguyen Minh Duc: ngmductm@gmail.com</p>
        </div><br>
        <div>
            <h5>Discord</h5>
            <p>Nguyen Minh Duc: The Master#3287</p>
        </div><br>
        <div>
            <h5>Github</h5>
            <p><a class="white-text" target="_blank" href="https://github.com/minhduc29">Nguyen Minh Duc</a></p>
        </div><br>
        <div>
            <h5>LinkedIn</h5>
            <p><a class="white-text" target="_blank" href="https://www.linkedin.com/in/duc-nguyen-178297205/">Nguyen Minh Duc</a></p>
        </div><br>
        <div>
            <h5>Discord</h5>
            <p>Nguyen Minh Duc: The Master#3287</p>
        </div><br>
        <div>
            <h5>Instagram</h5>
            <p>Nguyen Minh Duc: ngnmduc</p>
        </div>`
    }
}

window.customElements.define('contact-item', ContactItem)