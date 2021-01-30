import { css } from '../js/utils.js'

class PlayItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.src = this.getAttribute('src')
        this.title = this.getAttribute('title')
        this.description = this.getAttribute('description')
        this.link = this.getAttribute('link')
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="card bg-2f3162">
            <div class="card-image">
                <img src="${this.src}">
                <a class="btn-floating halfway-fab waves-effect waves-light bg-4b88a2" target="_blank" href="${this.link}">
                    <i class="material-icons">play_arrow</i>
                </a>
            </div>
            <div class="card-content white-text height-140">
                <span class="card-title">${this.title}</span>
                <p>${this.description}</p>
            </div>
            <div class="card-action">
                <a class="teal-text text-accent-3" target="_blank" href="${this.link}">${this.title}</a>
            </div>
        </div>`
    }
}

window.customElements.define('play-item', PlayItem)