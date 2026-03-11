import { GameLogic} from "../modules/GameLogic";
import { ViewHandling } from "./modules/ViewHandling";

let playboardRows;
let playboardColumns;
let playboard;

//constants
const endOfPath = 5;

const moveUp = "moveUp";
const moveRight = "moveRight";
const moveDown = "moveDown";
const moveLeft = "moveLeft";

let lastRow;
let firstRow;
let lastColumn;
let firstColumn;

let lastXPathGeneration;
let lastYPathGeneration;

let lastSuccesFullX;
let lastSuccesFullY;

let score = 0;
let missed = 0;

function startNewGame() {

    playboard = [];

    console.log("rows: " + playboardRows + " columns: " + playboardColumns);

    playboard = initialisePlayboardValue();


    lastRow = playboard.length - 1;
    firstRow = 0;
    lastColumn = playboard[0].length - 1
    firstColumn = 0;

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

function initialisePlayboardValue() {
    return Array.from(Array(playboardRows), () => Array.from(Array(playboardColumns), () => false));
}

function createPath() {

    let startRow = playboard.length - 1;
    let startColumn = Math.floor(Math.random() * (playboard[0].length - 1));


    lastXPathGeneration = lastSuccesFullX = startRow;
    lastYPathGeneration = lastSuccesFullY = startColumn;


    console.log("start logging...\n")
    console.log("start field: " + lastXPathGeneration.row + " / " + lastYPathGeneration.column + "\n")
    playboard[startRow][startColumn] = true;


    while (!pathEndCondition()) {
        moveAction(lastXPathGeneration, lastYPathGeneration);
    }
}

function moveAction(currentRow, currentColumn) {

    let validOptions = getValidOptions(currentRow, currentColumn);
    let move = Math.floor(Math.random() * validOptions.length);

    switch (validOptions[move]) {

        case moveUp:
            console.log("(UP) " + currentRow + " / " + currentColumn);
            playboard[currentRow - 1][currentColumn] = true;
            lastXPathGeneration = currentRow - 1;
            lastYPathGeneration = currentColumn;
            break;
        case moveRight:
            console.log("(RIGHT) " + currentRow + " / " + currentColumn);
            playboard[currentRow][currentColumn + 1] = true;
            lastXPathGeneration = currentRow;
            lastYPathGeneration = currentColumn + 1;
            break;
        case moveDown:
            console.log("(DOWN) " + currentRow + " / " + currentColumn);
            playboard[currentRow + 1][currentColumn] = true;
            lastXPathGeneration = currentRow + 1;
            lastYPathGeneration = currentColumn;
            break;
        case moveLeft:
            console.log("(LEFT) " + currentRow + " / " + currentColumn);
            playboard[currentRow][currentColumn - 1] = true;
            lastXPathGeneration = currentRow;
            lastYPathGeneration = currentColumn - 1;
            break;
        case endOfPath:
            playboard[currentRow][currentColumn] = true;
            lastXPathGeneration = currentRow;
            lastYPathGeneration = currentColumn;
            break;

    }
}

function getValidOptions(row, column) {

    let validatedOptions = [];


    //TODO check if this is needed?
    if (insideArray(row, column)) {

        //check up
        if (row !== firstRow && playboard[row - 1][column - 1] !== true && playboard[row - 1][column + 1] !== true && playboard[row - 1][column] !== true) {
            validatedOptions.push(moveUp);
        }

        //check right
        if (column !== lastColumn &&
            playboard[row - 1][column + 1] !== true &&
            playboard[row][column + 1] !== true) {

            if (row === lastRow) {
                validatedOptions.push(moveRight);
            } else if (playboard[row + 1][column + 1] !== true) {
                validatedOptions.push(moveRight);
            }
        }
        //check left
        if (column !== firstColumn &&
            playboard[row - 1][column - 1] !== true &&
            playboard[row][column - 1] !== true) {

            if (row === lastRow) {
                validatedOptions.push(moveLeft);
            } else if (playboard[row + 1][column - 1] !== true) {
                validatedOptions.push(moveLeft);
            }
        }

        //check down
        if (row !== lastRow &&
            column > firstColumn &&
            column < lastColumn) {

            if (playboard[row + 1][column - 1] === false &&
                playboard[row + 1][column - 2] === false &&
                playboard[row + 1][column + 1] === false &&
                playboard[row + 1][column + 2] === false) {

                if (playboard[row + 1][column] !== true) {
                    if (row < lastRow - 1 &&
                        playboard[row + 2][column] !== true) {
                        validatedOptions.push(moveDown);
                    } else if (row < lastRow) {
                        validatedOptions.push(moveDown);
                    }
                }
            }

        }
        return validatedOptions;
    }
}

function insideArray(rowIndex, columnIndex) {

    return (rowIndex <= playboard.length - 1) && (rowIndex >= 0) && (columnIndex <= playboard[0].length - 1) && (columnIndex >= 0);
}

function renderStats() {

    let scoreLine = document.getElementById('scoreboard-score');
    let missedLine = document.getElementById('scoreboard-missed');
    scoreLine.innerHTML = String(score);
    missedLine.innerHTML = String(missed);
}

function renderPlayboard() {

    let playboardElement = document.getElementById('board');

    playboardElement.innerHTML = "";

    for (let row = 0; row < playboardRows; row++) {
        for (let column = 0; column < playboardColumns; column++) {

            if (playboard[row][column] === true) {
                playboardElement.innerHTML += `
                    <div onclick="validateInput(true, this)" class="path-board board-field" data-x=${row} data-y=${column}></div>`;
            } else {
                playboardElement.innerHTML += `         
                <div class="board-field"> </div>
            `;
            }
        }
    }
}

function pathEndCondition() {

    for (let item of playboard[0]) {
        if (item === true) {
            return true;
        }
    }
    return false;
}

function checkIfValidMove(currentX, currentY) {
    return currentX === lastSuccesFullX && currentY === lastSuccesFullY
        || currentX === lastSuccesFullX + 1 && currentY === lastSuccesFullY
        || currentX === lastSuccesFullX - 1 && currentY === lastSuccesFullY || currentX === lastSuccesFullX && currentY === lastSuccesFullY + 1 || currentX === lastSuccesFullX && currentY === lastSuccesFullY - 1;
}

function validateInput(isPath, currentField) {

    console.log("checking field...")

    if (isPath) {

        let currentX = Number(currentField.getAttribute("data-x"));
        let currentY = Number(currentField.getAttribute("data-y"));

        if (checkIfValidMove(currentX, currentY) && currentX !== 0) {
            lastSuccesFullX = currentX;
            lastSuccesFullY = currentY;

            currentField.className = "discovered";
            setCssProperties(false);
            score++;
        }
        else if (currentX === 0) {
            lastSuccesFullX = currentX;
            lastSuccesFullY = currentY;

            currentField.className = "discovered";
            setCssProperties(false);
            alert("WINNNN")
        }
        renderStats();
    }
}

function initialiseGame() {

    playboardRows = Number(document.getElementById("rows").value);
    playboardColumns = Number(document.getElementById("columns").value);

    startNewGame();
}


