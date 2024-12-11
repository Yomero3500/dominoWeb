import React, { useState } from "react";
import { shuffleDeck, drawInitialHand } from "./logic/deckUtils.js";
import Board from "./components/Board.jsx";
import PlayerHand from "./components/PlayerHand.jsx";
import Swal from "sweetalert2"
import MachineInfo from "./components/MachineInfo.jsx";
import "./styles/App.css";
import { machineTurn } from "./logic/machineLogic.js";
import { isMoveValid } from "./logic/utils.js";


const App = () => {
  let tiros= 0;
  const [board, setBoard] = useState([]);
  const [deck, setDeck] = useState(() => shuffleDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [machineHand, setMachineHand] = useState([]);
  const [turn, setTurn] = useState("player");

  React.useEffect(() => {
    const { hand: playerHand, newDeck: deckAfterPlayer } = drawInitialHand(deck, 7);
    const { hand: machineHand, newDeck: finalDeck } = drawInitialHand(deckAfterPlayer, 7);
    setPlayerHand(playerHand);
    setMachineHand(machineHand);
    setDeck(finalDeck);

    console.log("Mano de player:", playerHand);
    console.log("Mano de máquina:", machineHand);
  }, []); 

  const handleMove = (domino, isPlayer) => {
    
    const [left, right] = board.length > 0
      ? [board[0].split("|")[0], board[board.length - 1].split("|")[1]]
      : ["", ""];
  
    const [dominoLeft, dominoRight] = domino.split("|");
  
    let newBoard = [...board];
  
    if (board.length === 0) {
      newBoard.push(domino);
    } else if (left === dominoRight) {
      newBoard.unshift(domino);
    } else if (left === dominoLeft) {
      newBoard.unshift(`${dominoRight}|${dominoLeft}`);
    } else if (right === dominoLeft) {
      newBoard.push(domino);
    } else if (right === dominoRight) {
      newBoard.push(`${dominoRight}|${dominoLeft}`);
    } else {
      tiros ++;
      console.log("Movimiento inválido:", domino, tiros);
      if (!isPlayer) {
        Swal.fire({
          title: 'Movimiento inválido',
          text: 'La maquina no puede tirar, pasando turno...',
        })
      }
      if (tiros >= 5) {
        if (playerHand.length<machineHand.length) {
          Swal.fire({
            title: 'Fin del juego',
            text: `El juego ha terminado. El jugador ha ganado`,
            confirmButtonText: 'Reiniciar'
          })
          .then((res) => {
            if (res.isConfirmed) {
              location.reload();
            }
          })
        } else  if(machineHand.length<playerHand.length){
          Swal.fire({
            title: 'Fin del juego',
            text: `El juego ha terminado. La maquina ha ganado`,
            confirmButtonText: 'Reiniciar'
          })
          .then((res) => {
            if (res.isConfirmed) {
              location.reload();
            }
          })
        }
        else {
          Swal.fire({
            title: 'Fin del juego, TABLAS',
            text: `El juego ha terminado. No se han podido realizar mas movimientos`,
            confirmButtonText: 'Reiniciar'
          })
          .then((res) => {
            if (res.isConfirmed) {
              location.reload();
            }
          })
        }
      }
      return;
    }
  
    setBoard(newBoard);
  
    if (isPlayer) {
      setPlayerHand(playerHand.filter((d) => d !== domino));
    } else {
      setMachineHand(machineHand.filter((d) => d !== domino));
    }
  
    if (checkGameOver(newBoard)) return;
  
    if (isPlayer) {
      setTurn("machine");
      setTimeout(machineMove, 1000, newBoard);
    } else {
      setTurn("player");
    }
  };
  
  const machineMove = (currentBoard) => {
    const { move, newHand, newDeck } = machineTurn(currentBoard, machineHand, deck);
  
    if (move) {
      console.log("Movimiento de la máquina:", move);
      handleMove(move, false);
    } else {
      console.log("La máquina no puede mover. Pasando turno...");
      Swal.fire({
        title: 'Movimiento inválido',
        text: 'La maquina no puede tirar, pasando turno...',
      })
      setTurn("player");
    }
  
    setMachineHand(newHand); 
    setDeck(newDeck);        
  };
  
  const checkGameOver = (newBoard) => {
    if (playerHand.length === 0) {
      alert("¡Ganaste!");
      return true;
    } else if (machineHand.length === 0) {
      alert("¡La máquina ganó!");
      return true;
    } else if (
      playerHand.every((d) => !isMoveValid(newBoard, d)) &&
      machineHand.every((d) => !isMoveValid(newBoard, d)) &&
      deck.length === 0
    ) {
      alert("¡Empate! No hay más movimientos.");
      return true;
    }
    return false;
  };


  

  return (
    <div className="app">
      <h1>Dominó: Jugador vs Máquina</h1>
      <MachineInfo hand={machineHand} />
      <Board board={board} />
      <PlayerHand
        hand={playerHand}
        onPlay={(domino) => handleMove(domino, true)}
      />
    </div>
  );
};

export default App;

