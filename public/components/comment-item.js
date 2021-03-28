import { css } from '../js/utils.js'

class CommentItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.content = this.getAttribute("content")
        this.owner = this.getAttribute("owner")
        this.ownerPhoto = this.getAttribute("ownerPhoto")
        this.time = this.getAttribute('time')
        this.img = this.getAttribute('img')
        this.file = this.getAttribute("file")

        let file = ""
        let img = ""
        if (this.file) {
            file = `
            <div class="center-container">
                <a class="light-blue-text text-lighten-3" style="text-decoration: underline; color: #f67e7d;" target="_blank" href="${this.file}">Attachment</a>
            </div>`
        }
        if (this.img) {
            img = `
            <div class="center-container">
                <img class="img-comment responsive-img" src="${this.img}">
            </div>`
        }
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="col s8 m8 row">
            <div class="card bg-2f3162">
                <div class="card-content white-text">
                    <p class="white-text" style="overflow-wrap: break-word;">${this.content}</p><br>
                    ${img}
                    ${file}
                    <img src="${this.ownerPhoto}" class="circle chat-img responsive-img">
                    <span class="username teal-text text-accent-3">${this.owner}</span><br>
                    <span class="blue-grey-text text-lighten-3">${this.time}</span>
                </div>
            </div>
        </div>`
    }
}

window.customElements.define("comment-item", CommentItem)