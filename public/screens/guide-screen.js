import { css } from '../js/utils.js'

class GuideScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <h5 class="text-4b88a2">To-Do</h5>
            <p class="text-2f3162">Like normal to-do apps. This is where you can take note and make to-do list.</p>
            <p class="text-2f3162">Click the ADD TO-DO button and create your to-do list.</p>
            <p class="text-2f3162">The length of your to-do must be more than 1 character.</p>
            <p class="text-2f3162">You can delete your to-do list after that if you want by clicking the X button.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Chat Room</h5>
            <p class="text-2f3162">Like normal chat apps. This is where you can create chat room and send messages.</p>
            <p class="text-2f3162">Click the CREATE CHAT ROOM button and create your own chat room.</p>
            <p class="text-2f3162">The length of your room name must be at least 1 character and room name must be unique.</p>
            <p class="text-2f3162">You can add members to your chat room.</p>
            <p class="text-2f3162">Only members of the chat room can see it.</p>
            <p class="text-2f3162">Then just simply send your messages to your groups.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Account</h5>
            <p class="text-2f3162">You must have an account to use this website. Register and login are
                very simple.</p>
            <p class="text-2f3162">You can see the username and email that you're using to access our
                website in Profile.</p>
            <p class="text-2f3162">Your information are absolutely confidential. Even our team cannot
                know it.</p>
            <p class="text-2f3162">Your account may be deleted due to toxic behaviors.</p>
            <p class="text-2f3162">We'll soon update verifying email so make sure you use a real email.
            </p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Class</h5>
            <p class="text-2f3162">You can create class very easily with class name and password. Class
                name must be unique.</p>
            <p class="text-2f3162">To enter a class, you must type a class name and password. If that
                class is already existed, you'll be in that class. You just need to enter a specific class only once.
            </p>
            <p class="text-2f3162">Only the members of a class can see that class.</p>
            <p class="text-2f3162">This is where you can upload your files and get download URLs,
                pretty similar to Google Classroom.</p>
            <p class="text-2f3162">You can use this for working, studying or even playing.</p>
            <p class="text-2f3162">We're working to develop the functionality of messaging in class.
            </p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Discussion</h5>
            <p class="text-2f3162">This is where you post a discussion for everyone to discuss it
                through comment section (click the description and/or title to see the comments), like a forum.</p>
            <p class="text-2f3162">Discussions with bad content may be deleted by our team.</p>
            <p class="text-2f3162">Everyone who is authenticated can see discussions.</p>
            <p class="text-2f3162">We'll soon have admin team to check discussions and users.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Room</h5>
            <p class="text-2f3162">This functionality is still in experiments.</p>
            <p class="text-2f3162">This works quite similar to Zoom.</p>
            <p class="text-2f3162">We have only implemented the basic functionality of a video call.</p>
            <p class="text-2f3162">We are working as hard as possible to implement more functionality.</p>
            <p class="text-2f3162">You have to create a room first and the room name must be unique.</p>
            <p class="text-2f3162">Send your token for others and join the meeting.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Learning Log</h5>
            <p class="text-2f3162">This is where you keep track of your learning.</p>
            <p class="text-2f3162">Create your topics and everytime you learn something new, add a new
                entry to the suitable topic. Only you can see your topics and entries.</p>
            <p class="text-2f3162">Click the topic name and/or Entry to see your entries.</p>
            <p class="text-2f3162">You can now delete the topic and its entries.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Playground</h5>
            <p class="text-2f3162">This is where you have fun after stressful hours of studying.</p>
            <p class="text-2f3162">Click on a card and have fun.</p>
            <p class="text-2f3162">Maybe you will find some interesting facts about yourself or just an interesting game.</p>
            <p class="text-2f3162">Some of the games might need to be downloaded.</p>
            <p class="text-2f3162">Click on the link to download the game. Install it, open the folder that contains it then click on the .exe file.</p>
            <p class="text-2f3162">Now you can play it.</p>
            <p class="text-2f3162">If you still cannot play it, please contact Nguyen Minh Duc.</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Update</h5>
            <p class="text-2f3162">This is where we show our update, new features with date and time.</p>
            <p class="text-2f3162">You should frequently take a look at this part to make sure you
                don't miss anything new.</p>
            <p class="text-2f3162">16/10/2020: Fully integrate Learning Log into E-Teams</p>
            <p class="text-2f3162">17/10/2020: Allow user to change password in profile and update forget password functionality</p>
            <p class="text-2f3162">02/11/2020: Update color palette, font style, about and contact</p>
            <p class="text-2f3162">18/11/2020: Publish To-Do functionality</p>
            <p class="text-2f3162">19/11/2020: Allow user to delete topic in Learning Log</p>
            <p class="text-2f3162">21/11/2020: Update preloader</p>
            <p class="text-2f3162">23/11/2020: Allow user to delete class in Class</p>
            <p class="text-2f3162">28/11/2020: Publish Playground functionality</p>
            <p class="text-2f3162">06/12/2020: Fully integrate Agora into E-Teams</p>
            <p class="text-2f3162">12/12/2020: Add Chat Room to E-Teams</p>
            <p class="text-2f3162">23/03/2021: Fully update a new version of E-Teams</p>
        </div><br>

        <div class="container">
            <h5 class="text-4b88a2">Other</h5>
            <p class="text-2f3162">This is where we state some rules, errors, anything that's not
                relevant to the main features above. This part is vital. Don't miss anything in here.</p>
            <p class="text-2f3162">There maybe some errors or bugs that we haven't known, if they
                occur, don't worry, just easily reload the page. If it still occur, please contact us.</p>
            <p class="text-2f3162">This website is currently in experiments. We're working really hard
                to improve our website.</p>
            <p class="text-2f3162">We're really happy that we've received some positive feedback from
                users. Thanks you guys!</p>
            <p class="text-2f3162">For more information or should you have any questions or maybe you
                find an error, a bug, please contact Nguyen Minh Duc. The contact is always in the footer.</p>
        </div><br>`
    }
}

window.customElements.define("guide-screen", GuideScreen)