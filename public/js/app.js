import { initialize, copyright, notice, setupUI, checkUserData, listen } from './utils.js'
import '../components/chat-item.js'
import '../components/class-item.js'
import '../components/comment-item.js'
import '../components/contact-item.js'
import '../components/create-class.js'
import '../components/description-item.js'
import '../components/discussion-item.js'
import '../components/enter-class.js'
import '../components/entry-item.js'
import '../components/login-form.js'
import '../components/play-item.js'
import '../components/profile-item.js'
import '../components/register-form.js'
import '../components/todo-item.js'
import '../components/topic-item.js'
import '../screens/chat-screen.js'
import '../screens/class-screen.js'
import '../screens/discussion-screen.js'
import '../screens/guide-screen.js'
import '../screens/home-screen.js'
import '../screens/learninglog-screen.js'
import '../screens/playground-screen.js'
import '../screens/todo-screen.js'

// Initialize
initialize()

// Copyright
copyright()

// Listen to request to change screen
listen()

// Logout
const logoutBtn = document.getElementsByClassName('logout-btn')
for (let i = 0; i < logoutBtn.length; i++) {
    logoutBtn[i].addEventListener('click', (e) => {
        e.preventDefault()
        auth.signOut()
    })
}

// Listen for auth status to setup UI
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user)
        notice(`Welcome back ${user.displayName}`)
        checkUserData()
    } else {
        setupUI()
    }
})