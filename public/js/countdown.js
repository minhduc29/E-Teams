$("#clock").countdown('2022/1/1', function(e) {
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