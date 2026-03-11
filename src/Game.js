
import { GameManager } from "./modules/GameManager.js";



const startButton = document.getElementById('start-button');
const clickableFields = document.querySelectorAll('.normal-field')

let gameManager;

startButton.addEventListener('click', () => {
    let rowInput = Number(document.getElementById('rows').value);
    let columnInput = Number(document.getElementById('columns').value);
    gameManager = new GameManager(rowInput, columnInput);
});








