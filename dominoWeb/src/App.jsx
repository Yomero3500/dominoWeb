import React, { useState } from "react";
import { shuffleDeck, drawInitialHand } from "./logic/deckUtils.js";
import Board from "./components/Board.jsx";
import PlayerHand from "./components/PlayerHand.jsx";
import MachineInfo from "./components/MachineInfo.jsx";
import { machineTurn } from "./logic/machineLogic.js";

const App = () => {
  const [board, setBoard] = useState([]);
  const [deck, setDeck] = useState(() => shuffleDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [machineHand, setMachineHand] = useState([]);
  const [turn, setTurn] = useState("player");

  // Inicializar el mazo y las manos al cargar el componente
  React.useEffect(() => {
    const { hand: playerHand, newDeck: deckAfterPlayer } = drawInitialHand(deck, 7);
    const { hand: machineHand, newDeck: finalDeck } = drawInitialHand(deckAfterPlayer, 7);
    setPlayerHand(playerHand);
    setMachineHand(machineHand);
    setDeck(finalDeck);

    console.log("Mano de player:", playerHand);
    console.log("Mano de máquina:", machineHand);
  }, []); // Este efecto se ejecuta solo una vez

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
      console.log("Movimiento inválido:", domino);
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
      setTimeout(machineMove, 1000, newBoard); // Pasa el nuevo tablero a la máquina
    } else {
      setTurn("player");
    }
  };
  
  const machineMove = (currentBoard) => {
    console.log("Turno de la máquina:");
    const { move, newHand, newDeck } = machineTurn(currentBoard, machineHand, deck);
  
    if (move) {
      console.log("Movimiento de la máquina:", move);
      handleMove(move, false);
    } else {
      console.log("La máquina no puede mover. Pasando turno...");
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

  const isMoveValid = (newBoard, domino) => {
    const [left, right] = newBoard.length > 0
      ? [newBoard[0].split("|")[0], newBoard[newBoard.length - 1].split("|")[1]]
      : ["", ""];

    const [dominoLeft, dominoRight] = domino.split("|");
    return (
      newBoard.length === 0 ||
      left === dominoRight ||
      left === dominoLeft ||
      right === dominoLeft ||
      right === dominoRight
    );
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

