import { css, dataArr, setData } from '../js/utils.js'

class EntryItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this.uid = this.getAttribute('uid')
        this.content = this.getAttribute("content")
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="row col s12 m12">
            <div class="card">
                <div class="card-content bg-2f3162">
                    <p class="white-text">${this.content}</p><br>
                    <button class="del-btn btn"><i class="material-icons">clear</i></button>
                </div>
            </div>
        </div>`

        // Delete function
        const delBtn = this._shadowRoot.querySelector(".del-btn")
        delBtn.addEventListener('click', (e) => {
            e.preventDefault()

            const entryData = {
                entry: dataArr(this.content, 'remove')
            }
            setData('entries', this.uid, true, entryData)
        })
    }
}

window.customElements.define('entry-item', EntryItem)