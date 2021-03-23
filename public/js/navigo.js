import { redirect } from "./utils.js"

// Navigo
var router = new Navigo(null, true, "#!")

router.on(() => {
    redirect('home')
}).resolve()

router.on({
    '/todo': () => {
        redirect('todo')
    },
    '/chat': () => {
        redirect('chat')
    },
    '/class': () => {
        redirect('class')
    },
    '/discussion': () => {
        redirect('discussion')
    },
    '/learninglog': () => {
        redirect('learninglog')
    },
    '/playground': () => {
        redirect('playground')
    },
    '/guide': () => {
        redirect('guide')
    },
    '*': () => {
        redirect('home')
    }
}).resolve()