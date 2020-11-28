var GameOver = false;
var U = document.getElementsByClassName("L1");
var M = document.getElementsByClassName("L2");
var L = document.getElementsByClassName("L3");
var n = 0;

function ClickOnButton(ClassName, Index) {
    var Button = document.getElementsByClassName(ClassName);
    if (Button[Index].value == " " && !GameOver) {
        Button[Index].value = "O";
        Result();
        if (GameOver == false) {
            ComputerPlays();
        }
    }
}

function ComputerPlays() {
    if (U[0].value == "X" && U[1].value == "X" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[0].value == "X" && U[2].value == "X" && U[1].value == " ") {
        U[1].value = "X";
    } else if (U[1].value == "X" && U[2].value == "X" && U[0].value == " ") {
        U[0].value = "X";
    } else if (M[0].value == "X" && M[1].value == "X" && M[2].value == " ") {
        M[2].value = "X";
    } else if (M[0].value == "X" && M[2].value == "X" && M[1].value == " ") {
        M[1].value = "X";
    } else if (M[1].value == "X" && M[2].value == "X" && M[0].value == " ") {
        M[0].value = "X";
    } else if (L[0].value == "X" && L[1].value == "X" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[0].value == "X" && L[2].value == "X" && L[1].value == " ") {
        L[1].value = "X";
    } else if (L[1].value == "X" && L[2].value == "X" && L[0].value == " ") {
        L[0].value = "X";
    } else if (U[0].value == "X" && M[0].value == "X" && L[0].value == " ") {
        L[0].value = "X";
    } else if (L[0].value == "X" && M[0].value == "X" && U[0].value == " ") {
        U[0].value = "X";
    } else if (U[0].value == "X" && L[0].value == "X" && M[0].value == " ") {
        M[0].value = "X";
    } else if (U[1].value == "X" && M[1].value == "X" && L[1].value == " ") {
        L[1].value = "X";
    } else if (L[1].value == "X" && M[1].value == "X" && U[1].value == " ") {
        U[1].value = "X";
    } else if (U[1].value == "X" && L[1].value == "X" && M[1].value == " ") {
        M[1].value = "X";
    } else if (U[2].value == "X" && M[2].value == "X" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[2].value == "X" && M[2].value == "X" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[2].value == "X" && L[2].value == "X" && M[2].value == " ") {
        M[2].value = "X";
    } else if (U[0].value == "X" && M[1].value == "X" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[2].value == "X" && M[1].value == "X" && U[0].value == " ") {
        U[0].value = "X";
    } else if (U[0].value == "X" && L[2].value == "X" && M[1].value == " ") {
        M[1].value = "X";
    } else if (U[2].value == "X" && M[1].value == "X" && L[0].value == " ") {
        L[0].value = "X";
    } else if (L[0].value == "X" && M[1].value == "X" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[2].value == "X" && L[0].value == "X" && M[1].value == " ") {
        M[1].value = "X";
    } else if (U[0].value == "O" && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        M[1].value = "X";
    } else if (U[2].value == "O" && U[1].value == " " && U[0].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        M[1].value = "X";
    } else if (L[0].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[1].value == " " && L[2].value == " ") {
        M[1].value = "X";
    } else if (L[2].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[0].value == " " && L[1].value == " ") {
        M[1].value = "X";
    } else if (M[1].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[2].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        var Number = RandomWithRange(0, 3);
        if (Number == 0) {
            U[0].value = "X";
        } else if (Number == 1) {
            U[2].value = "X";
        } else if (Number == 2) {
            L[0].value = "X";
        } else if (Number == 3) {
            L[2].value = "X";
        }
    } else if (U[1].value == "O" && U[0].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        M[1].value = "X";
    } else if (L[1].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && M[2].value == " " && L[0].value == " " && L[2].value == " ") {
        M[1].value = "X";
    } else if (U[0].value == "O" && U[1].value == "O" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[0].value == "O" && U[2].value == "O" && U[1].value == " ") {
        U[1].value = "X";
    } else if (U[1].value == "O" && U[2].value == "O" && U[0].value == " ") {
        U[0].value = "X";
    } else if (M[0].value == "O" && M[1].value == "O" && M[2].value == " ") {
        M[2].value = "X";
    } else if (M[0].value == "O" && M[2].value == "O" && M[1].value == " ") {
        M[1].value = "X";
    } else if (M[1].value == "O" && M[2].value == "O" && M[0].value == " ") {
        M[0].value = "X";
    } else if (L[0].value == "O" && L[1].value == "O" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[0].value == "O" && L[2].value == "O" && L[1].value == " ") {
        L[1].value = "X";
    } else if (L[1].value == "O" && L[2].value == "O" && L[0].value == " ") {
        L[0].value = "X";
    } else if (U[0].value == "O" && M[0].value == "O" && L[0].value == " ") {
        L[0].value = "X";
    } else if (L[0].value == "O" && M[0].value == "O" && U[0].value == " ") {
        U[0].value = "X";
    } else if (U[0].value == "O" && L[0].value == "O" && M[0].value == " ") {
        M[0].value = "X";
    } else if (U[1].value == "O" && M[1].value == "O" && L[1].value == " ") {
        L[1].value = "X";
    } else if (L[1].value == "O" && M[1].value == "O" && U[1].value == " ") {
        U[1].value = "X";
    } else if (U[1].value == "O" && L[1].value == "O" && M[1].value == " ") {
        M[1].value = "X";
    } else if (U[2].value == "O" && M[2].value == "O" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[2].value == "O" && M[2].value == "O" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[2].value == "O" && L[2].value == "O" && M[2].value == " ") {
        M[2].value = "X";
    } else if (U[0].value == "O" && M[1].value == "O" && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[2].value == "O" && M[1].value == "O" && U[0].value == " ") {
        U[0].value = "X";
    } else if (U[0].value == "O" && L[2].value == "O" && M[1].value == " ") {
        M[1].value = "X";
    } else if (U[2].value == "O" && M[1].value == "O" && L[0].value == " ") {
        L[0].value = "X";
    } else if (L[0].value == "O" && M[1].value == "O" && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[2].value == "O" && L[0].value == "O" && M[1].value == " ") {
        M[1].value = "X";
    } else if (M[2].value == " " && M[1].value == "X" && M[0].value == " ") {
        M[2].value = "X";
    } else if (M[0].value == "X" && M[1].value == " " && M[2].value == " ") {
        M[2].value = "X";
    } else if (M[2].value == "X" && M[1].value == " " && M[0].value == " ") {
        M[0].value = "X";
    } else if (U[2].value == " " && U[1].value == "X" && U[0].value == " ") {
        U[2].value = "X";
    } else if (U[0].value == "X" && U[1].value == " " && U[2].value == " ") {
        U[2].value = "X";
    } else if (U[2].value == "X" && U[1].value == " " && U[0].value == " ") {
        U[0].value = "X";
    } else if (L[2].value == " " && L[1].value == "X" && L[0].value == " ") {
        L[2].value = "X";
    } else if (L[0].value == "X" && L[1].value == " " && L[2].value == " ") {
        L[2].value = "X";
    } else if (L[2].value == "X" && L[1].value == " " && L[0].value == " ") {
        L[0].value = "X";
    } else if (M[0].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[2].value == " " && M[1].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        U[0].value = "X";
    } else if (M[2].value == "O" && U[0].value == " " && U[1].value == " " && U[2].value == " " && M[0].value == " " && M[1].value == " " && L[0].value == " " && L[1].value == " " && L[2].value == " ") {
        U[2].value = "X";
    } else {
        var Num = RandomWithRange(0, 8)
        if (Num == 0 && U[0].value == " ") {
            U[0].value = "X";
        } else if (Num == 1 && U[1].value == " ") {
            U[1].value = "X";
        } else if (Num == 2 && U[2].value == " ") {
            U[2].value = "X";
        } else if (Num == 3 && M[0].value == " ") {
            M[0].value = "X";
        } else if (Num == 4 && M[1].value == " ") {
            M[1].value = "X";
        } else if (Num == 5 && M[2].value == " ") {
            M[2].value = "X";
        } else if (Num == 6 && L[0].value == " ") {
            L[0].value = "X";
        } else if (Num == 7 && L[1].value == " ") {
            L[1].value = "X";
        } else if (Num == 8 && L[2].value == " ") {
            L[2].value = "X";
        } else {
            if (U[0].value == " ") {
                U[0].value = "X";
            } else if (U[1].value == " ") {
                U[1].value = "X";
            } else if (U[2].value == " ") {
                U[2].value = "X";
            } else if (M[0].value == " ") {
                M[0].value = "X";
            } else if (M[1].value == " ") {
                M[1].value = "X";
            } else if (M[2].value == " ") {
                M[2].value = "X";
            } else if (L[0].value == " ") {
                L[0].value = "X";
            } else if (L[1].value == " ") {
                L[1].value = "X";
            } else if (L[2].value == " ") {
                L[2].value = "X";
            }
        }
    }
    Result();
}

function RandomWithRange(Min, Max) {
    return parseInt(Math.random() * (Max - Min) + Min)
}

function Result() {
    if (U[0].value == "X" && U[1].value == "X" && U[2].value == "X") {
        U[0].style.color = "#24B73D";
        U[1].style.color = "#24B73D";
        U[2].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[0].value == "O" && U[1].value == "O" && U[2].value == "O") {
        U[0].style.color = "#24B73D";
        U[1].style.color = "#24B73D";
        U[2].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (M[0].value == "X" && M[1].value == "X" && M[2].value == "X") {
        M[0].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        M[2].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (M[0].value == "O" && M[1].value == "O" && M[2].value == "O") {
        M[0].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        M[2].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (L[0].value == "X" && L[1].value == "X" && L[2].value == "X") {
        L[0].style.color = "#24B73D";
        L[1].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (L[0].value == "O" && L[1].value == "O" && L[2].value == "O") {
        L[0].style.color = "#24B73D";
        L[1].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (U[0].value == "X" && M[0].value == "X" && L[0].value == "X") {
        U[0].style.color = "#24B73D";
        M[0].style.color = "#24B73D";
        L[0].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[0].value == "O" && M[0].value == "O" && L[0].value == "O") {
        U[0].style.color = "#24B73D";
        M[0].style.color = "#24B73D";
        L[0].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (U[1].value == "X" && M[1].value == "X" && L[1].value == "X") {
        U[1].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[1].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[1].value == "O" && M[1].value == "O" && L[1].value == "O") {
        U[1].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[1].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (U[2].value == "X" && M[2].value == "X" && L[2].value == "X") {
        U[2].style.color = "#24B73D";
        M[2].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[2].value == "O" && M[2].value == "O" && L[2].value == "O") {
        U[2].style.color = "#24B73D";
        M[2].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (U[0].value == "X" && M[1].value == "X" && L[2].value == "X") {
        U[0].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[0].value == "O" && M[1].value == "O" && L[2].value == "O") {
        U[0].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[2].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (U[2].value == "X" && M[1].value == "X" && L[0].value == "X") {
        U[2].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[0].style.color = "#24B73D";
        setTimeout(() => {
            Lose()
        }, 500)
    } else if (U[2].value == "O" && M[1].value == "O" && L[0].value == "O") {
        U[2].style.color = "#24B73D";
        M[1].style.color = "#24B73D";
        L[0].style.color = "#24B73D";
        setTimeout(() => {
            Win()
        }, 500)
    } else if (!GameOver && U[0].value != " " && U[1].value != " " && U[2].value != " " && M[0].value != " " && M[1].value != " " && M[2].value != " " && L[0].value != " " && L[1].value != " " && L[2].value != " ") {
        GameOver = true;
        setTimeout(() => {
            alert("Draw!")
        }, 500)
    }
}

function Win() {
    GameOver = true;
    alert("You won!")
}

function Lose() {
    GameOver = true;
    alert("You lost!")
}

function Reset() {
    U[0].value = " ";
    U[1].value = " ";
    U[2].value = " ";
    M[0].value = " ";
    M[1].value = " ";
    M[2].value = " ";
    L[0].value = " ";
    L[1].value = " ";
    L[2].value = " ";

    for (var i = 0; i <= 2; i++) {
        U[i].style.color = "white";
        M[i].style.color = "white";
        L[i].style.color = "white";
    }
    GameOver = false;
}

setInterval(() => {
    if (GameOver) {
        Reset()
    }
}, 1000);