import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Logs from "./components/Logs"
import { WINNING_COMBINATIONS } from "./winningcombinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function deriveActivePlayer(gameTurns){
  let currentPlayer ='X';
  if(gameTurns.length>0 && gameTurns[0].player==="X"){
      currentPlayer='O'
  }
  return currentPlayer;
}

function App() {
  const[players,setPlayer]=useState({"X":"Player 1", "O":"Player 2"})
  const [gameTurns, setGameTurns] = useState([])
  // const[hasWinner, setWinner]=useState(false)
  // const [activePlayer, setActivePlayer] = useState("X")
  const activePlayer= deriveActivePlayer(gameTurns)
  let gameboard= [...initialGameBoard.map(array=>[...array])];
  let winner;
  for (const turn of gameTurns){
      const {square, player}=turn;
      const {row, col}=square;
      gameboard [row] [col] = player;
  }

for (const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol=gameboard[combination[0].row][combination[0].column];
  const secondSquareSymbol=gameboard[combination[1].row][combination[1].column];
  const thirdSquareSymbol= gameboard[combination[2].row][combination[2].column];
  if (firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol===thirdSquareSymbol){
    winner = players[firstSquareSymbol];
  }
}
const hasDraw = gameTurns.length===9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")
    
    setGameTurns(prevTurns => {
      const currentPlayer =deriveActivePlayer(prevTurns);
     
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player:currentPlayer }, ...prevTurns]
      return updatedTurns;
    })
    
  }
function handleRematch(){
  setGameTurns([])
}
function handlePlayerNameChange(symbol, newName){
setPlayer(prevPlayers=>
  {return{
    ...prevPlayers, 
    [symbol]:newName
  }
  })
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}></Player>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}></Player>
        </ol>
        {(winner||hasDraw) &&<GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  )

}

export default App
