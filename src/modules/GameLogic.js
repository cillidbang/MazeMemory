
export class GameLogic {

    constructor(playboard) {
        this.playboard = playboard;

        this.playboardData = {
            lastRow: playboard.length - 1,
            firstRow: 0,
            lastColumn: playboard[0].length - 1,
            firstColumn: 0
        }

        this.variables = {
            lastXPathGeneration: undefined,
            lastYPathGeneration: undefined,
            lastSuccesFullX: undefined,
            lastSuccesFullY: undefined
        }

        this.constants = {
            moveUp: "moveUp",
            moveRight: "moveRight",
            moveDown: "moveDown",
            moveLeft: "moveLeft",
            endOfPath: 5,

            fieldSet: "field-set",
            gameEnd: "game-end",
            missed: "missed"
        }

    }



    createPath(){

        let startRow = this.playboardData.lastRow;
        let startColumn = Math.floor(Math.random() * (this.playboard[0].length - 1));


        this.variables.lastXPathGeneration = this.variables.lastSuccesFullX = startRow;
        this.variables.lastYPathGeneration = this.variables.lastSuccesFullY = startColumn;

        console.log("start field: " + this.variables.lastXPathGeneration + " / " + this.variables.lastYPathGeneration + "\n")
        this.playboard[startRow][startColumn] = true;

        while (!this.pathEndCondition()) {
            this.moveAction(this.variables.lastXPathGeneration, this.variables.lastYPathGeneration);
        }
    }



    moveAction(currentRow, currentColumn){
        let validOptions = this.getValidOptions(currentRow, currentColumn);
        let move = Math.floor(Math.random() * validOptions.length);

        switch (validOptions[move]) {

            case this.constants.moveUp:
                console.log("(UP) " + currentRow + " / " + currentColumn);
                this.playboard[currentRow - 1][currentColumn] = true;
                this.variables.lastXPathGeneration = currentRow - 1;
                this.variables.lastYPathGeneration = currentColumn;
                break;
            case this.constants.moveRight:
                console.log("(RIGHT) " + currentRow + " / " + currentColumn);
                this.playboard[currentRow][currentColumn + 1] = true;
                this.variables.lastXPathGeneration = currentRow;
                this.variables.lastYPathGeneration = currentColumn + 1;
                break;
            case this.constants.moveDown:
                console.log("(DOWN) " + currentRow + " / " + currentColumn);
                this.playboard[currentRow + 1][currentColumn] = true;
                this.variables.lastXPathGeneration = currentRow + 1;
                this.variables.lastYPathGeneration = currentColumn;
                break;
            case this.constants.moveLeft:
                console.log("(LEFT) " + currentRow + " / " + currentColumn);
                this.playboard[currentRow][currentColumn - 1] = true;
                this.variables.lastXPathGeneration = currentRow;
                this.variables.lastYPathGeneration = currentColumn - 1;
                break;
            case this.constants.endOfPath:
                this.playboard[currentRow][currentColumn] = true;
                this.variables.lastXPathGeneration = currentRow;
                this.variables.lastYPathGeneration = currentColumn;
                break;

        }
    }

    getValidOptions(row, column) {
        let validatedOptions = [];

        //TODO check if this is needed?
        if (this.insideArray(row, column)) {

            //check up
            if (row !== this.playboardData.firstRow && this.playboard[row - 1][column - 1] !== true && this.playboard[row - 1][column + 1] !== true && this.playboard[row - 1][column] !== true) {
                validatedOptions.push(this.constants.moveUp);
            }

            //check right
            if (column !== this.playboardData.lastColumn &&
                this.playboard[row - 1][column + 1] !== true &&
                this.playboard[row][column + 1] !== true) {

                if (row === this.playboardData.lastRow) {
                    validatedOptions.push(this.constants.moveRight);
                } else if (this.playboard[row + 1][column + 1] !== true) {
                    validatedOptions.push(this.constants.moveRight);
                }
            }
            //check left
            if (column !== this.playboardData.firstColumn &&
                this.playboard[row - 1][column - 1] !== true &&
                this.playboard[row][column - 1] !== true) {

                if (row === this.playboardData.lastRow) {
                    validatedOptions.push(this.constants.moveLeft);
                } else if (this.playboard[row + 1][column - 1] !== true) {
                    validatedOptions.push(this.constants.moveLeft);
                }
            }

            //check down
            if (row !== this.playboardData.lastRow &&
                column > this.playboardData.firstColumn &&
                column < this.playboardData.lastColumn) {

                if (this.playboard[row + 1][column - 1] === false &&
                    this.playboard[row + 1][column - 2] === false &&
                    this.playboard[row + 1][column + 1] === false &&
                    this.playboard[row + 1][column + 2] === false) {

                    if (this.playboard[row + 1][column] !== true) {
                        if (row < this.playboardData.lastRow - 1 &&
                            this.playboard[row + 2][column] !== true) {
                            validatedOptions.push(this.constants.moveDown);
                        } else if (row < this.playboardData.lastRow) {
                            validatedOptions.push(this.constants.moveDown);
                        }
                    }
                }

            }
            return validatedOptions;
        }


    }

    insideArray(rowIndex, columnIndex) {

        return (rowIndex <= this.playboard.length - 1) && (rowIndex >= 0) && (columnIndex <= this.playboard[0].length - 1) && (columnIndex >= 0);
    }

    pathEndCondition() {

        for (let item of this.playboard[0]) {
            if (item === true) {
                return true;
            }
        }
        return false;
    }

    validateInput(isPath, row, column) {

        console.log("checking field...")

        if (isPath) {

            if (this.checkIfValidMove(row, column)) {

                this.variables.lastSuccesFullX = row;
                this.variables.lastSuccesFullY = column;

                return true;
            }
        }
        return false;
    }

    checkIfValidMove(currentX, currentY) {
        return currentX === this.variables.lastSuccesFullX && currentY === this.variables.lastSuccesFullY
            || currentX === this.variables.lastSuccesFullX + 1 && currentY === this.variables.lastSuccesFullY
            || currentX === this.variables.lastSuccesFullX - 1 && currentY === this.variables.lastSuccesFullY || currentX === this.variables.lastSuccesFullX && currentY === this.variables.lastSuccesFullY + 1 || currentX === this.variables.lastSuccesFullX && currentY === this.variables.lastSuccesFullY - 1;
    }
}
