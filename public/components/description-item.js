import { css, redirect } from '../js/utils.js'

class DescriptionItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.title = this.getAttribute("title")
        this.description = this.getAttribute("description")
        this.link = this.getAttribute("link")
        this.redirect = this.getAttribute("redirect")
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="card bg-2f3162">
            <div class="card-content white-text height-140">
                <span class="card-title">${this.title}</span>
                <p>${this.description}</p>
            </div>
            <div class="card-action">
                <a id="redirect" class="teal-text text-accent-3" href="#">${this.link}</a>
            </div>
        </div>`
        this._shadowRoot.querySelector("#redirect").addEventListener('click', (e) => {
            e.preventDefault()
            redirect(this.redirect)
        })
    }
}

window.customElements.define('description-item', DescriptionItem)