

var Board = new Board(3,3);
var board = Board.getBoard();
var boardTarget = document.querySelector(".gameboard-target");
boardTarget.appendChild(board);
var btn = document.querySelector(".btn-clear");

btn.addEventListener("click", function(e) {
  Board.clearBoard();
});
