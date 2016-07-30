var Board = new Board(3, 3);
var game = new Game();
var board = Board.getBoard();
var boardTarget = document.querySelector(".gameboard-target");
var boardBlocker = document.createElement("div");
var btn = document.querySelector(".btn-clear");
boardBlocker.classList.add("board__blocker");

//activate event listeners
activate();

function activate() {
    game.moveHandler(Board.getSquares(), game.getTurn);
    board.appendChild(boardBlocker);
    boardTarget.appendChild(board);
    btn.addEventListener("click", function(e) {
        Board.clearBoard();
    });
}

function Game() {
    var onePlayerGame = false;
    var twoPlayerGame = false;
    var players1 = "";
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
    this.gameTurn;
    this.getNumOfPlayer = getNumOfPlayer;
    this.moveHandler = moveHandler;
    this.getTurn = getTurn;
    this.setTurn = setTurn;
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
            setTurn("x");
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
            setTurn("o");
            var step4 = document.querySelector("#step4");
            setTimeout(function() {
                boardBlocker.parentElement.removeChild(boardBlocker);
                parent.classList.add("gameboard-instructions__card--hide");
                step4.classList.add("onboard-steps-intro-ani");
                step4.classList.add("gameboard-instructions__card--active");
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

    function setTurn(turn) {
        console.log("set turn", turn);
        var target = document.querySelector(".gameboard-instructions__game-state-container__state");
        if(start) {
          player1 = turn;
          start = false;
        }
        gameTurn = turn;

        if (gameTurn == "x") {
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

    function moveHandler(squares, currentTurn) {
        squares.forEach(function(square, indx, self) {
            square.addEventListener("click", function(event) {
                if(start == true) {

                }
                if (this.innerHTML === "") {
                    if (currentTurn() == "x") {
                        this.innerHTML = "x";
                        checkForWinner(squares, currentTurn);
                    } else {
                        this.innerHTML = "o";
                        checkForWinner(squares, currentTurn);
                    }
                } else {
                    alert("Try another square!");
                }
            });
        });
    }

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
        var search = true;
        console.log("checking", currentTurn());

        if (currentTurn() == "x") {
            turn = "x";
        } else {
            turn = "o";
        }
        console.log("checking", currentTurn(), turn);
        //row 1
        if (squares[0].innerHTML == turn &&
            squares[1].innerHTML == turn &&
            squares[2].innerHTML == turn) {
            squares[0].classList.add("gameboard-winner-ani");
            squares[1].classList.add("gameboard-winner-ani");
            squares[2].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;
            //row 2
        } else if (squares[3].innerHTML == turn &&
            squares[4].innerHTML == turn &&
            squares[5].innerHTML == turn) {
            squares[3].classList.add("gameboard-winner-ani");
            squares[4].classList.add("gameboard-winner-ani");
            squares[5].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;
            //row 3
        } else if (squares[6].innerHTML == turn &&
            squares[7].innerHTML == turn &&
            squares[8].innerHTML == turn) {
            squares[6].classList.add("gameboard-winner-ani");
            squares[7].classList.add("gameboard-winner-ani");
            squares[8].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;

            // column 1
        } else if (squares[0].innerHTML == turn &&
            squares[3].innerHTML == turn &&
            squares[6].innerHTML == turn) {
            squares[0].classList.add("gameboard-winner-ani");
            squares[3].classList.add("gameboard-winner-ani");
            squares[6].classList.add("gameboard-winner-ani");
            //column 2
        } else if (squares[1].innerHTML == turn &&
            squares[4].innerHTML == turn &&
            squares[7].innerHTML == turn) {
            squares[1].classList.add("gameboard-winner-ani");
            squares[4].classList.add("gameboard-winner-ani");
            squares[7].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;
            // column 3
        } else if (squares[2].innerHTML == turn &&
            squares[5].innerHTML == turn &&
            squares[8].innerHTML == turn) {
            squares[2].classList.add("gameboard-winner-ani");
            squares[5].classList.add("gameboard-winner-ani");
            squares[8].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;

            //diagnol left -right
        } else if (squares[0].innerHTML == turn &&
            squares[4].innerHTML == turn &&
            squares[8].innerHTML == turn) {
            squares[0].classList.add("gameboard-winner-ani");
            squares[4].classList.add("gameboard-winner-ani");
            squares[8].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;

        } else if (squares[2].innerHTML == turn &&
            squares[4].innerHTML == turn &&
            squares[6].innerHTML == turn) {
            squares[2].classList.add("gameboard-winner-ani");
            squares[4].classList.add("gameboard-winner-ani");
            squares[6].classList.add("gameboard-winner-ani");
            lockGame();
            return winner = turn;

        } else if (squares[0].innerHTML !== "" &&
            squares[1].innerHTML !== "" &&
            squares[2].innerHTML !== "" &&
            squares[3].innerHTML !== "" &&
            squares[4].innerHTML !== "" &&
            squares[5].innerHTML !== "" &&
            squares[6].innerHTML !== "" &&
            squares[7].innerHTML !== "" &&
            squares[8].innerHTML !== "") {
            lockGame();
            return winner = turn;
        } else {
            if (turn == "x") {
              if(player1 == "x") {
                setTurn("o");
                setTimeout(function(){
                  while(search) {
                    rand = Math.floor(Math.random() * 8);
                    console.log("rand", rand);
                    if(squares[rand].innerHTML == "") {

                      search = false;
                      squares[rand].click();
                      setTurn("x");
                    }
                  }
                }, 1500);
              }
            } else {
              if(player1 == "o") {
                setTurn("x");
                setTimeout(function(){
                  while(search) {
                    rand = Math.floor(Math.random() * 8);
                    console.log("rand", rand);
                    if(squares[rand].innerHTML == "") {
                      search = false;
                      squares[rand].click();
                      setTurn("o");
                    }
                  }
                }, 1500);
              }
            }
        }
    }
}
