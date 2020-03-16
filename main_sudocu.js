var choose = '';

function createMatrix() {
    var Matrix = {};
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            Matrix[i + '_' + j] = ['', 0];
        }
    }
    return Matrix;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function newGame(Matrix) {
    let i = 0;
    while (i < 20) {
        let position = [getRandomInt(1, 10), getRandomInt(1, 10)];
        let positionStr = position[0] + "_" + position[1];
        let number = getRandomInt(1, 10);
        if (easyCheck(Matrix, position, number)) {
            i++;
            Matrix[positionStr][0] = number;
            Matrix[positionStr][1] = 1;
        }
    }

    return Matrix;
}

function easyCheck(Matrix, position, number) {
    for (let i= 1; i<10; i++) {
        if (Matrix[position[0]+'_'+i][0] === number){
            return false;
        }
        if (Matrix[i+'_'+position[1]][0] === number){
            return false;
        }

    }

    let combination = [0, 0];
    let first = [1, 2, 3];
    let second = [4, 5, 6];
    let third = [7, 8, 9];

    if (position[0] in first){
        combination[0] = first;
    } else if (position[0] in second){
        combination[0] = second;
    } else {
        combination[0] = third;
    }

    if (position[1] in first){
        combination[1] = first;
    } else if (position[1] in second){
        combination[1] = second;
    } else {
        combination[1] = third;
    }

    for (let i in combination[0]){
        for (let j in combination[1]){
            if (Matrix[position[0]+'_'+combination[1][j]][0] === number){
                return false;
            }
            if (Matrix[combination[0][i]+'_'+position[1]][0] === number){
                return false;
            }
        }
    }
    return true;
}

// function hardCheck(Matrix){
//
//     return check;
// }
//
function displayBoard(Matrix){
    for (const [key, value] of Object.entries(Matrix)) {
        const cell = document.getElementById('cell_'+key);
        cell.innerHTML = value[0];
    }

}


function createBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.id = "cell" + "_" + i + "_" + j;
            document.querySelector(".container_game").appendChild(cell);
        }
    }
}

function chooseFunc(event) {
    choose = event.target.id;
    console.log(choose);
}


function main() {
    createBoard();
    Matrix = createMatrix();
    Matrix = newGame(Matrix);
    displayBoard(Matrix);
    const cells = [...document.getElementsByClassName('cell')];
    for (let i in cells){
        cells[i].addEventListener('click', chooseFunc);
    }
}


main();
