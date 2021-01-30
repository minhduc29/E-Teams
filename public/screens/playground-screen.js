import { css } from '../js/utils.js'

class PlaygroundScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._shadowRoot.innerHTML = `
        ${css}
        <div class="container">
            <div class="row">
                <div class="col s12 m4">
                    <play-item src="./images/firework.jpg" title="Firework" description="Colorful and satisfied firework" link="./html/firework.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/hangman.jpg" title="Hangman" description="Simple hangman game about Solar System topic" link="./html/hangman.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/calculator.png" title="Calculator" description="Simple calculator with basic functionality, dark mode and light mode" link="./html/calculator.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/color.jpg" title="Color Guessing" description="Simple game for guessing random color" link="./html/color.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/analog_clock.png" title="Analog Clock" description="Simple analog clock with dark mode and light mode" link="./html/analog_clock.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/digital_clock.jpg" title="Digital Clock" description="Simple digital clock with month, day, year, dark mode and light mode" link="./html/digital_clock.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/countdown.jpg" title="Countdown" description="2022 New Year Countdown with dark mode and light mode" link="./html/countdown.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/cd_calculator.png" title="Countdown Calculator" description="Calculate countdown time with dark mode and light mode" link="./html/cd_cal.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/solar_system.jpg" title="Solar System" description="Want to know more about the Solar System and have some fun?" link="https://minhduc29.github.io/Solar-System/"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/light.jpg" title="Light" description="A simple game with 12 levels to turn on the light" link="./html/light.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/tictactoe.jpg" title="Tic Tac Toe" description="A simple tic tac toe 3x3 game" link="./html/tictactoe.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/bd_cal.jpg" title="Birthday Calculator" description="A simple program to calculate the day of the week of your birthday with dark mode and light mode" link="./html/find_day.html"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/sudoku.png" title="Sudoku" description="Classic Sudoku game. Guide for downloading and playing in Playground - User Guide" link="https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/games%2FSudoku.exe?alt=media&token=135bf0c2-9191-414e-bcd5-7968b7669e92"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/alien_invasion.jpg" title="Alien Invasion" description="Classic Alien Invasion game. Guide for downloading and playing in Playground - User Guide" link="https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/games%2FAlien-Invasion.exe?alt=media&token=efe30c34-e315-497f-a627-ee87f17eecdc"></play-item>
                </div>
                <div class="col s12 m4">
                    <play-item src="./images/snake_game.jpg" title="Snake Game" description="Classic Snake Game. Guide for downloading and playing in Playground - User Guide" link="https://firebasestorage.googleapis.com/v0/b/e-teams.appspot.com/o/games%2FSnake-Game.exe?alt=media&token=fcbe5eb1-7297-4a50-82de-b52d0e73fa15"></play-item>
                </div>
            </div>
        </div>`
    }
}

window.customElements.define("playground-screen", PlaygroundScreen)