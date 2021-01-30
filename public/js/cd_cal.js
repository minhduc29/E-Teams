let year = Math.round(Number(prompt("Enter year: ")))
while (!year || !(2019 < year && year < 2121)) {
    year = Math.round(Number(prompt("Please enter a valid year: ")))
}

let month = Math.round(Number(prompt("Enter month: ")))
while (!month || !(0 < month && month < 13)) {
    month = Math.round(Number(prompt("Please enter a valid month: ")))
}

let day = Math.round(Number(prompt("Enter day: ")))
while (!day || !(0 < day && day < 32)) {
    day = Math.round(Number(prompt("Please enter a valid day: ")))
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

if (isValidDay(day, month, year)) {
    let time = `${year}/${month}/${day}`
    $("#clock").countdown(time, function (e) {
        $(this).html(e.strftime(''
            + '<div><span>%m</span><span>Months</span></div>'
            + '<div><span>%n</span><span>Days</span></div>'
            + '<div><span>%H</span><span>Hours</span></div>'
            + '<div><span>%M</span><span>Min</span></div>'
            + '<div><span>%S</span><span>Sec</span></div>'
        ))
    })
} else {
    alert("Wrong date!")
}

function toggle() {
    document.querySelector('body').classList.toggle('light');
}