
//constants
const endOfPath = 5;

let score = 0;
let missed = 0;

function startNewGame() {


    createPath();

    renderPlayboard();
    setCssProperties(true);

    setTimeout(() => pathLightUp(true), 500);
    setTimeout(() => pathLightUp(false), 1000);


}



function pathLightUp(isOn) {

    let root = document.documentElement;

    if (!isOn) {
        root.style.setProperty('--field-light', 'rgb(255, 0, 8,0.2)')
    } else {
        root.style.setProperty('--field-light', 'rgb(255, 0, 8, 0.7)')
    }
}


function setCssProperties(isStart) {

    let root = document.documentElement;


    if (isStart) {
        root.style.setProperty('--rows', playboardRows);
        root.style.setProperty('--columns', playboardColumns);

    } else {
        root.style.setProperty('--field-status', 'crimson');

    }
}











function renderStats() {

    let scoreLine = document.getElementById('scoreboard-score');
    let missedLine = document.getElementById('scoreboard-missed');
    scoreLine.innerHTML = String(score);
    missedLine.innerHTML = String(missed);
}







