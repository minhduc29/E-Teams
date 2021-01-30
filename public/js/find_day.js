function calculateDay() {
    var DD = Number(prompt("Day: "))
    var MM = Number(prompt("Month: "))
    var YYYY = Number(prompt("Year: "))

    if (isValidDay(DD, MM, YYYY)) {
        dayExe(DD, MM, YYYY)
    } else {
        alert("Wrong date!")
    }
}

function isValidDay(DD, MM, YYYY) {
    if (DD <= 0 || DD > 31) {
        return false
    }
    if (MM <= 0 || MM > 12) {
        return false
    }
    if (YYYY <= 0) {
        return false
    }
    
    switch (MM) {
        case 4:
        case 6:
        case 9:
        case 11:
            if (DD > 30) {
                return false
            }
            break
        case 2:
            if ((YYYY % 4 == 0 && YYYY % 100 != 0) || (YYYY % 400 == 0)) {
                if (DD > 29) {
                    return false
                }
            } else {
                if (DD > 28) {
                    return false
                }
            }
    }

    return true
}

let container = document.querySelector(".container")
function dayExe(DD, MM, YYYY) {
    let birthday = new Date(YYYY, MM-1, DD)
    let day = birthday.getDay()

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    container.innerHTML += `<div>You were born on ${days[day]}</div>`
    let currentYrBd = new Date(new Date().getFullYear(), MM-1, DD)
    let d = currentYrBd.getDay()
    container.innerHTML += `<div>Your birthday in this year is on ${days[d]}</div>`
    container.innerHTML += `<div>Your birthday in next year is on ${days[d+1]}</div>`
}

calculateDay()

function toggle() {
    document.querySelector('body').classList.toggle('light');
}