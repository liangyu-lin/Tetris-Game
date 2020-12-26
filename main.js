



//creates 200 divs using forloop
for (let i = 0; i < 200; i++) {
    let div = document.createElement("div");
    div.className = "divs";
    div.innerHTML = i
    document.querySelector(".grid").appendChild(div);

}
document.addEventListener('DOMContentLoaded', ()=>{
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#startBtn');
const width = 10;

//push all divs into an array
let gridSquares = [];
let squares = document.getElementsByClassName('divs');
gridSquares.push(squares);
// console.log(squares)


//Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1,width*2+2]
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
let current = tetrominoes[0][0];
// console.log(tetrominoes)

//draw the first rotation in the first tetromino
function draw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.add('tetromino')
    })
}


draw()

 
})


