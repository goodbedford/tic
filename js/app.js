

var Board = new Board(3,3);
var game = new Game();
var board = Board.getBoard();
var boardTarget = document.querySelector(".gameboard-target");
var boardBlocker = document.createElement("div")
boardBlocker.classList.add("board__blocker");


activate();

function activate() {
  game.moveHandler(Board.getSquares(), game.getTurn);
  board.appendChild(boardBlocker);
  boardTarget.appendChild(board);

}



var btn = document.querySelector(".btn-clear");
btn.addEventListener("click", function(e) {
  Board.clearBoard();
});

function Game() {
  var onePlayerGame = false;
  var twoPlayerGame = false;
  var players = {player1:"", player2:""};
  var numOfPlayers;
  var start;
  var gameTurn = "x";
  var startBtn = document.querySelector("#startGame")
  var onePlayerGameBtn = document.querySelector("#onePlayerGame");
  var twoPlayerGameBtn = document.querySelector("#twoPlayerGame");
  var gamePieceXBtn = document.querySelector("#gamePieceX");
  var gamePieceOBtn = document.querySelector("#gamePieceO");

  this.getStart = getStart;
  this.rounds = 5;
  this.winner;
  this.loser;
  // this.numOfPlayers;  // 1, 2
  this.gameTurn;
  // this.getPlayers = getPlayers; delete
  this.getNumOfPlayer = getNumOfPlayer;
  this.moveHandler = moveHandler;
  this.getTurn = getTurn;
  this.setTurn = setTurn;
  // this.checkForWinnerHandler = checkForWinnerHandler;
  step1Listener();
  step2NumOfPlayers1Listener();
  step2NumOfPlayers2Listener();
  step3GamePieceXListener();
  step3GamePieceOListener();
  // step1 start
  function step1Listener() {
      startBtn.addEventListener("click", function(event) {
        var parent = this.parentElement;
        parent.classList.remove("onboard-steps-intro-ani");
        parent.classList.add("onboard-steps-outro");
        setStart();
        var step2 = document.querySelector("#step2");
        setTimeout(function() {
          parent.classList.add("gameboard-instructions__card--hide");
          step2.classList.add("onboard-steps-intro-ani");
          step2.classList.add("gameboard-instructions__card--active");
        }, 1000);
      });
  }
  // step2 Number of players onePlayerGameBtn
  function step2NumOfPlayers1Listener() {
      onePlayerGameBtn.addEventListener("click", function(event) {
        var parent = this.parentElement;
        parent.classList.remove("onboard-steps-intro-ani");
        parent.classList.add("onboard-steps-outro");
        setPlayers(1);
        var step3 = document.querySelector("#step3");
        setTimeout(function() {
          parent.classList.add("gameboard-instructions__card--hide");
          step3.classList.add("onboard-steps-intro-ani");
          step3.classList.add("gameboard-instructions__card--active");
        }, 1000);
      });
  }
  // step2 Number of players twoPlayerGameBtn
  function step2NumOfPlayers2Listener() {
      twoPlayerGameBtn.addEventListener("click", function(event) {
        var parent = this.parentElement;
        parent.classList.remove("onboard-steps-intro-ani");
        parent.classList.add("onboard-steps-outro");
        setPlayers(2);
        var step3 = document.querySelector("#step3");
        setTimeout(function() {
          parent.classList.add("gameboard-instructions__card--hide");
          step3.classList.add("onboard-steps-intro-ani");
          step3.classList.add("gameboard-instructions__card--active");
        }, 1000);
      });
  }
  // step3 choose game piece
  function step3GamePieceXListener() {
      gamePieceXBtn.addEventListener("click", function(event) {
        var parent = this.parentElement;
        parent.classList.remove("onboard-steps-intro-ani");
        parent.classList.add("onboard-steps-outro");
        setGamePieceX();
        setTurn("x");
        // startGame(); delete
        var step4 = document.querySelector("#step4");
        setTimeout(function() {
          boardBlocker.parentElement.removeChild(boardBlocker);

          parent.classList.add("gameboard-instructions__card--hide");
          step4.classList.add("onboard-steps-intro-ani");
          step4.classList.add("gameboard-instructions__card--active");
        }, 1000);
      });
  }
  // step3 choose game piece
  function step3GamePieceOListener() {
      gamePieceOBtn.addEventListener("click", function(event) {
        var parent = this.parentElement;
        parent.classList.remove("onboard-steps-intro-ani");
        parent.classList.add("onboard-steps-outro");
        setGamePieceO();
        setTurn("o");
        // startGame(); delete
        var step4 = document.querySelector("#step4");
        setTimeout(function() {
          // var blocker = document.querySelector(".board__blocker");
          // console.log("blocelr", blocker);
          // debugger;
          boardBlocker.parentElement.removeChild(boardBlocker);

          parent.classList.add("gameboard-instructions__card--hide");
          step4.classList.add("onboard-steps-intro-ani");
          step4.classList.add("gameboard-instructions__card--active");
          // blocker.parentElement.removeChild(blocker);
        }, 1000);
      });
  }

  function setStart() {
    start = true;
  }
  function getStart() {
    return start;
  }
  function getNumOfPlayer() {
    return players;
  }
  function setPlayers(numOfPlayers) {
    numOfPlayers = numOfPlayers;
  }
  function setGamePieceX() {
    players.player1 = "x";
    players.player2 = "o";
  }
  function setGamePieceO(o) {
    players.player1 = "o";
    players.player2 = "x";
  }
  function setTurn(turn) {
    console.log("setturn", turn);
    var target = document.querySelector(".gameboard-instructions__game-state-container__state");
    gameTurn = turn;
    if(gameTurn == "x") {
      document.querySelector("#player1").classList.add("gameboard-instructions__img-container--active");
      document.querySelector("#player2").classList.remove("gameboard-instructions__img-container--active");
      target.innerHTML = "<";
    } else {
      document.querySelector("#player2").classList.add("gameboard-instructions__img-container--active");
      document.querySelector("#player1").classList.remove("gameboard-instructions__img-container--active");
      target.innerHTML = ">";
    }
  }
  function getTurn() {
    return gameTurn;
  }
  function getPlayers() {
      return players;
  }
  function startGame() {

  }
  function moveHandler(squares,currentTurn) {
    squares.forEach(function(square, indx,self) {
      square.addEventListener("click", function(event) {

        if(this.innerHTML === "") {
          if(currentTurn() == "x") {
            this.innerHTML = "x";
            checkForWinner(squares,currentTurn,players);

            // setTurn("o"); check for winner first
            // debugger;
          } else {
            this.innerHTML = "o";
            checkForWinner(squares,currentTurn,players);

            // setTurn("x"); // checkfor winner first
          }
        } else {
          alert("Try another square!");
        }
      });
    });
  }
  // function checkForWinnerHandler(squares, currentTurn, players) {
  //   squares = squares();
  //   squares.forEach(function(square,indx,self) {
  //     square.addEventListener("click", function(event) {
  //       checkForWinner(squares,currentTurn,players);
  //     });
  //   });
  // }
  function lockGame() {
    var board = document.querySelector(".board");
    var boardBlocker = document.createElement("div");
    boardBlocker.classList.add("board__blocker");
    board.appendChild(boardBlocker);
    board.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("do nothing.s");
    });
  }
  function checkForWinner(squares, currentTurn) {
    var winner;
    var turn = "";
    var squares = squares;
    console.log("checking", currentTurn());

    if (currentTurn() == "x") {
      turn = "x";
    } else {
      turn = "o";
    }
      console.log("checking", currentTurn(), turn);
    if (squares[0].innerHTML == turn &&
        squares[1].innerHTML == turn  &&
        squares[2].innerHTML == turn) {
          squares[0].classList.add("gameboard-winner-ani");
          squares[1].classList.add("gameboard-winner-ani");
          squares[2].classList.add("gameboard-winner-ani");

        lockGame();
        return winner = turn;

    } else {
      if(turn == "x") {
        setTurn("o");
      } else {
          setTurn("x");
      }
    }
  }
}
