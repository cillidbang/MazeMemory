import {Renderer} from "./Renderer.js";
import {GameLogic} from "./GameLogic.js";


export class GameManager {

    constructor(rows, columns) {

        this.rows = rows;
        this.columns = columns;
        this.playboard = this.initialisePlayboardValue(rows, columns);

        this.executeGame();
    }



    executeGame(){

        let gameLogic = new GameLogic(this.playboard);
        let userInterface = new Renderer(gameLogic.playboard, gameLogic);

        gameLogic.createPath();
        userInterface.renderPlayboard();

        setTimeout(()=> userInterface.pathLightUp(false), 500);
        setTimeout(()=> userInterface.pathLightUp(true), 1000);
    }

    initialisePlayboardValue(rows, columns) {

        let emptyBoard = [];

        for (let row = 0; row < rows; row++) {

            emptyBoard[row] = []

            for (let column = 0; column < columns; column++) {
                emptyBoard[row][column] = false;
            }
        }

        return emptyBoard;
    }



}