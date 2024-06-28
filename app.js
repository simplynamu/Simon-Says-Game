let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }

});

function gameflash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}

function userflash(btn) {
    btn.classList.add('userflash');
    setTimeout(function() {
        btn.classList.remove('userflash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random btn choose
    let ranidx = Math.floor(Math.random() * 3);
    let rcolor = btns[ranidx];
    let rbtn = document.querySelector(`.${rcolor}`);
    console.log(rbtn);
    gameSeq.push(rcolor);
    console.log(gameSeq);
    gameflash(rbtn);
}

function checkans(idx) {
    // console.log("curr level : ", level);
    // let idx = level - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b> ${level} </b> <br>Press any key to Start.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    // console.log(this);
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute('id');
    console.log(usercolor);
    userSeq.push(usercolor);

    checkans(userSeq.length - 1);
}

let allbtn = document.querySelectorAll('.btn');
for (btn of allbtn) {
    btn.addEventListener('click', btnpress);
}

function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}