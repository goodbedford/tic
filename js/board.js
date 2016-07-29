

function Board(rows, squares) {
  var makeBoard = function() {
    var board = document.createElement("div");
    var i = 0;
    board.classList.add("board");

    for(i = 0; i < rows; i++) {
      board.appendChild(makeRow(squares));
    }
    return board;
  }
  this.board = makeBoard();
  this.getBoard = function() {
    return this.board;
  }
  this.clearBoard = function() {
    var rowsToClear;
    var rowsLen = 0;
    var squaresToClear;
    rowsToClear = this.board.querySelectorAll(".board__row");
    rowsLen = rowsToClear.length;
    for(i = 0; i < rowsLen; i++) {
      squaresToClear =  rowsToClear[i].querySelectorAll(".board__row__square");
      squaresToClear.forEach(function(square) {
        square.innerHTML = "";
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
    square.innerHTML = "X";
    row.appendChild(square);
  }
  return row;
}
