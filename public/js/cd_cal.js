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
let time = `${year}/${month}/${day}`

$("#clock").countdown(time, function(e) {
    $(this).html(e.strftime(''
    + '<div><span>%m</span><span>Months</span></div>'
    + '<div><span>%n</span><span>Days</span></div>'
    + '<div><span>%H</span><span>Hours</span></div>'
    + '<div><span>%M</span><span>Min</span></div>'
    + '<div><span>%S</span><span>Sec</span></div>'
    ))
})

function toggle() {
    document.querySelector('body').classList.toggle('light');
}