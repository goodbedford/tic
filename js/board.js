

function Board(numOfRows, squaresPerRow) {
  var makeBoard = makeBoard();
  var rows;
  var rowsLen;
  var squares;
  this.board = makeBoard;
  this.getBoard = getBoard;
  this.clearBoard = clearBoard;
  this.addClassToSquares = addClassToSquares;
  this.getRows = getRows;
  this.getSquares = getSquares;
  rows = this.getRows();
  rowsLen = rows.length;
  squares = this.getSquares();

  activateListeners();

  function activateListeners() {
    handleHover();
  }
  function getRows() {
    var rows = this.board.querySelectorAll(".board__row");
    rows = Array.prototype.slice.call(rows);
    return rows;
  }
  function getSquares() {
    var squares = [];
    var temp;
    rows.forEach(function(row){
      temp = row.querySelectorAll(".board__row__square");
      temp = Array.prototype.slice.call(temp);
      squares = squares.concat(temp);
    });
    return squares;
  }

  function handleHover() {
    squares.forEach(function(square) {
      square.addEventListener("mouseenter", function(event) {
        square.classList.add("gameboard-hover-ani");
      });
      square.addEventListener("mouseleave", function(event) {
        square.classList.remove("gameboard-hover-ani");
      });
    });
  }
  // function handleMoves() {
  //   squares.forEach(function(square) {
  //     square.addEventListener("click", function(event) {
  //       if(this.innerHTML) {
  //         this.innerHTML = move;
  //       }
  //     })(move);
  //     square.addEventListener("mouseleave", function(event) {
  //       square.classList.remove("gameboard-hover-ani");
  //     });
  //   });
  // }
  function addClassToSquares(className) {
    var rows = this.board.querySelectorAll(".board__row");
    var rowsLen = rows.length;
    var squares;

    for(i = 0; i < rowsLen; i++) {
      squares =  rows[i].querySelectorAll(".board__row__square");
      squares.forEach(function(square) {
        square.classList.add(className);
      });
    }
  }
  function makeBoard() {
    var board = document.createElement("div");
    var i = 0;
    board.classList.add("board");

    for(i = 0; i < numOfRows; i++) {
      board.appendChild(makeRow(squaresPerRow));
    }
    return board;
  }
  function getBoard() {
    return this.board;
  }
  function clearBoard() {
    var rows = this.board.querySelectorAll(".board__row");
    var rowsLen = rows.length;;
    var squaresToClear;
    var blocker = document.querySelector(".board__blocker");

    board.className = "board";
    if(blocker) {
      blocker.parentElement.removeChild(blocker);
    }

    for(i = 0; i < rowsLen; i++) {
      squaresToClear =  rows[i].querySelectorAll(".board__row__square");
      squaresToClear.forEach(function(square) {
        square.innerHTML = "";
        square.className = "board__row__square"
      });
    }
  }
}

function makeRow(squares) {
  var row = document.createElement("div");
  var square;
  row.classList.add("board__row");

  for (var i = 0; i < squares; i++) {
    square = document.createElement("div");
    square.classList.add("board__row__square");
    row.appendChild(square);
  }
  return row;
}
