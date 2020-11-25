let ball = document.getElementsByClassName('ball')
let scr = 0
let rightIndex
function color() {
let r = Math.floor(Math.random() * 255)
let g = Math.floor(Math.random() * 255)
let b = Math.floor(Math.random() * 255)
let rightColor = `rgb(${r}, ${g}, ${b})`
let rgb = document.getElementById('rgb')
rgb.textContent = rightColor
rightIndex = Math.floor(Math.random() * 3)
ball[rightIndex].style.backgroundColor = rightColor
for(i = 0; i < ball.length; i++) {
    if(i != rightIndex) {
        let wrongNumber1 = Math.floor(Math.random() * 100 + 25)
        var x = Math.random()
        if(x > 0.5) {
            wrongNumber1 = -wrongNumber1
        }
        let wrongNumber2 = Math.floor(Math.random() * 100 + 25)
        var x = Math.random()
        if(x > 0.5) {
            wrongNumber2 = -wrongNumber2
        }
        let wrongNumber3 = Math.floor(Math.random() * 100 + 25)
        var x = Math.random()
        if(x > 0.5) {
            wrongNumber3 = -wrongNumber3
        }
        let wrongColor = `rgb(${r + wrongNumber1}, ${g + wrongNumber2}, ${b + wrongNumber3})`
        ball[i].style.backgroundColor = wrongColor
    }
}}
function setup() {for(i = 0; i < ball.length; i++) {
    ball[i].addEventListener('click', (e)=>{
        let ballIndex = e.target.getAttribute('index')
        let score = document.getElementById('score')
        if(ballIndex == rightIndex) {
            scr++
        } else {
            scr = 0
        }
        score.textContent = `SCORE: ${scr}`
        color()
    })
}}
color()
setup()