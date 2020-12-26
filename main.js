//applied concept from freeCodeCamp https://youtu.be/rAUn1Lom6dw and used my own logic to build a tetris game.



//creates 200 divs using forloop
for (let i = 0; i < 200; i++) {
    let div = document.createElement("div");
    div.className = "divs";
    // div.innerHTML = i
    document.querySelector(".grid").appendChild(div);
}

//creates 10 extra divs using forloop
for (let i = 0; i < 10; i++) {
    let taken = document.createElement("div");
    taken.className = "taken";
    //  taken.innerHTML = i
    document.querySelector(".grid").appendChild(taken);
}


//creates 16 divs inside mini-grid using forloop
for (let i = 0; i < 16; i++) {
    let mini = document.createElement("div");
    mini.className = "mini";
    //  mini.innerHTML = i
    document.querySelector(".mini-grid").appendChild(mini);
}


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startBtn');
    const width = 10;
    let nextRandom = 0

    //push all divs into an array
    let gridSquares = [];
    let squares = document.querySelectorAll('.grid div')


    gridSquares.push(squares);

    // console.log(squares)


    //Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]
    const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;


    //randomly select a tetromino and a random rotation
    let random = Math.floor(Math.random() * tetrominoes.length);

    let current = tetrominoes[random][0];


    //draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }


    //Drop tetromino down every second
    timerId = setInterval(dropDown, 1000);

    //assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 65 || e.keyCode === 37) { //A left
            moveLeft()
        } else if (e.keyCode === 68 || e.keyCode === 39) { // D right
            moveRight()
        } else if (e.keyCode === 83 || e.keyCode === 40) { // S down
            speedDown()
        } else if (e.keyCode === 87 || e.keyCode === 38) { // W up to rotate
            rotate()
        }
    }
    document.addEventListener('keydown', control)

    //drop down fuction
    function dropDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //a new tetromino starts falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * tetrominoes.length);
            current = tetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
        }
    }





    // move the tetromino left, unless there is a blockage or is at the edge of the board.
    function moveLeft() {
        undraw()
        const leftEdgeTrue = current.some(index => (currentPosition + index) % width === 0)


        if (!leftEdgeTrue) {
            currentPosition -= 1
        }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        draw()
    }



    // move the tetromino Right, unless there is a blockage or is at the edge of the board.
    function moveRight() {
        undraw()
        const rightEdgeTrue = current.some(index => (currentPosition + index) % width === width - 1)


        if (!rightEdgeTrue) {
            currentPosition += 1
        }

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
    }


    //rotate tetromino
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) { // if rotation = 4 , go back to 0
            currentRotation = 0
        }
        current = tetrominoes[random][currentRotation]
        draw()
    }


    //speed down tetromino
    function speedDown() {
        undraw()
        currentPosition += width;
        draw()
        freeze()
    }


    // show the next tetromino in mini grid
    const displayNext = document.querySelectorAll(".mini")
    const displayWidth = 4
    let displayIndex = 0


    //tetrominoes without rotation
    const nextTetromino = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
    ]


    // display the shape in minigrid
    function displayShape() {
        //remove tetromino from grid
        displayNext.forEach(square => {
            square.classList.remove('tetromino')
        })
        nextTetromino[nextRandom].forEach(index => {
            displayNext[displayIndex + index].classList.add('tetromino')
        })
    }












})