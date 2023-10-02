import { useState, useEffect } from "react";
import './App.css';
import { WinPatterns } from './WinPatterns'
import ResultMessage from "./ResultMessage";
import Square from './Component/Square';


//sound
const clickX = new Audio('./click1.wav')
const clickO = new Audio('./click.mp3')
const clickErr = new Audio('./clickerr.wav')
const gameWinnerSound = new Audio('./Applause.wav')
const restartSound = new Audio ('./NEWGAME.wav') // ('./NEWGAME1.mp3') // ('./NEWGAME.wav')

const clickPlay = (player1) => {
  if(player1==='O')
    clickO.play();
  else   if(player1==='E')
    clickErr.play();
  else 
    clickX.play();

}
const gameWinner = () => {
  gameWinnerSound.play()
}
const gameRestart = () => {
  restartSound.play()
}



function App() {

  //board
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  //player 
  const [player, setPlayer] = useState("O"); 
  //winner
  const [result, setResult] = useState({ winner: "", state: "" });
  const [windraw, setWindraw] = useState(0); // 1=win 2=draw

  useEffect(() => {

    checkWin()
    checkIfDraw()

    if (player === "X") { 
      //alert('set');
      setPlayer("O"); 
    } else {
      setPlayer("X");  
    }
  }, [board]);

  //render winner
  useEffect(() => {
    if(result.state === "Draw") {
      setWindraw(2);
      setResult({ winner: "no" , state: "no"  });
    }
    else if (result.state !== "no" && result.state !== "" && result.state !== "Draw") {
      setWindraw(1);
      gameWinner();
      
    }
  }, [result]);


  // click on box
  const handleClick = (square) => {
   
    // check if square already filled !
    if(board[square]!=="") {
      clickPlay('E');
      alert('You can not play on square with '+board[square]);
      return;
    }
    clickPlay(player);
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
       
        return val;
      })
  
    );
  }

  const checkWin = () => {
    WinPatterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  //restart
  const  startNewGame= () => {
    gameRestart()
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setWindraw(0)
  };

  //checking for draw
  const checkIfDraw = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
       
      setResult({ winner: "no", state: "Draw" });
    }
  };


  return (
    <div className="App">
      <div className="boardwrapper">
      <div className='board'>
        <h1 className='header'>X Mix Drix</h1>
        <div className='row'>
          <Square
            chooseSquare={() => { handleClick(0) }}
            val={board[0]}
          />
          <Square
            chooseSquare={() => { handleClick(1) }}
            val={board[1]}
          />
          <Square
            chooseSquare={() => { handleClick(2) }}
            val={board[2]}
          />
        </div>
        <div className='row'>
          <Square
            chooseSquare={() => { handleClick(3) }}
            val={board[3]}
          />
          <Square
            chooseSquare={() => { handleClick(4) }}
            val={board[4]}
          />
          <Square
            chooseSquare={() => { handleClick(5) }}
            val={board[5]}
          />
        </div>
        <div className='row'>
          <Square
            chooseSquare={() => { handleClick(6) }}
            val={board[6]}
          />
          <Square
            chooseSquare={() => { handleClick(7) }}
            val={board[7]}
          />
          <Square
            chooseSquare={() => { handleClick(8) }}
            val={board[8]}
          />
        </div>
      </div>
      {windraw>0 ? <ResultMessage startNewGame={startNewGame} playerWon={result.winner} /> : null}
      </div>
      <div className="downwrapper">
       <div> Player turn:</div>&nbsp;&nbsp;<div>{player}</div>
      </div>
    </div>
  );
}

export default App;
