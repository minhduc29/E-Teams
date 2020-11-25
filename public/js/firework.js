var t = 0;
var canvas = document.querySelector("canvas");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = 'hsla(0,0%,0%,1)';

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function draw() {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'hsla(0,0%,0%,.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var foo, i, j, r;
    foo = Math.sin(t) * 2 * Math.PI;
    for (i = 0; i < 400; ++i) {
        r = 400 * Math.sin(i * foo);
        context.globalCompositeOperation = '';
        context.fillStyle = 'hsla(' + i + 12 + ',100%, 60%,1)';
        context.beginPath();
        context.arc(Math.sin(i) * r + (canvas.width / 2),
            Math.cos(i) * r + (canvas.height / 2),
            1.5, 0, Math.PI * 2);
        context.fill();

    }
    t += 0.000005;
    return t %= 2 * Math.PI;

};

function run() {
    window.requestAnimationFrame(run);
    draw();
}
run();