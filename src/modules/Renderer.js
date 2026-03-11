

export class Renderer {

    constructor(playboard, gameLogic) {
        this.playboard = playboard;
        this.gameLogic = gameLogic;
        this.score = 0;
        this.missed = 0;
        this.gameRunning = true;

    }



    renderPlayboard() {


        let playboardElement = document.getElementById('board');

        playboardElement.innerHTML = "";

        let fieldId = 0;

        for (let row = 0; row < this.playboard.length; row++) {
            for (let column = 0; column < this.playboard[0].length ; column++) {


                const newDiv = document.createElement('div');
                newDiv.id = `${fieldId++}`;

                let isPath = this.playboard[row][column] === true;
                isPath ? newDiv.className ='path-field' : newDiv.className = 'normal-field';


                newDiv.x = row;
                newDiv.y = column;
                this.attachEventListener(newDiv, row, column,isPath);

                playboardElement.appendChild(newDiv);


            }
        }
    }

    attachEventListener(newDiv, row, column, isPath) {
        newDiv.addEventListener('click', () => {

        if (this.gameRunning) {

            let action = this.gameLogic.validateInput(isPath, row, column);

            if (action && row !== 0) {
                if (isPath) {
                    console.log(`field: ${row}/${column} is the path`);
                    newDiv.className = "discovered"
                    this.score++;
                    document.getElementById('scoreboard-score').innerText = this.score;
                }
            } else if (row === 0) {
                console.log(`field: ${row}/${column} is not the path`);
                newDiv.className = "discovered";
                console.log("END!")
                this.gameRunning = false;
                score = 0;
                missed = 0;
            } else {
                this.missed++;
                document.getElementById('scoreboard-missed').innerText = this.missed;
            }

            // if the move was possible     ->  then we want to check if it is on the correct path -> if it is set             currentField.className = "discovered";
            //                              ->  the winning condition was met

        }
        else {
            alert("GAME END");
        }
        });
    }

    renderStats() {

        let scoreLine = document.getElementById('scoreboard-score');
        let missedLine = document.getElementById('scoreboard-missed');
        scoreLine.innerHTML = String(score);
        missedLine.innerHTML = String(missed);
    }

     setCssProperties(isStart) {

        let root = document.documentElement;


        if (isStart) {
            root.style.setProperty('--rows', playboardRows);
            root.style.setProperty('--columns', playboardColumns);

        } else {
            root.style.setProperty('--field-status', 'crimson');

        }
    }

    pathLightUp(isOn) {

        let root = document.documentElement;

        if (!isOn) {
            root.style.setProperty('--path-lightup-color', 'red')
        } else {
            root.style.setProperty('--path-lightup-color', '#8151d9')
        }
    }
}
