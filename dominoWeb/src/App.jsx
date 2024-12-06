import React, { useState, useEffect } from "react";
import { shuffleDeck, drawInitialHand } from "./logic/deckUtils.js"; // Importa las funciones auxiliares
import Board from "./components/Board.jsx";
import PlayerHand from "./components/PlayerHand.jsx";
import MachineInfo from "./components/MachineInfo.jsx";
import { machineTurn } from "./logic/machineLogic.js";

const App = () => {
  const [deck, setDeck] = useState(() => shuffleDeck()); // Baraja inicial
  const [playerHand, setPlayerHand] = useState([]);
  const [machineHand, setMachineHand] = useState([]);
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState("player"); // Controla de quién es el turno

  // Reparte las manos iniciales
  useEffect(() => {
    const { hand: playerInitialHand, newDeck: deckAfterPlayer } = drawInitialHand(deck, 7);
    const { hand: machineInitialHand, newDeck: deckAfterMachine } = drawInitialHand(
      deckAfterPlayer,
      7
    );

    setPlayerHand(playerInitialHand);
    setMachineHand(machineInitialHand);
    setDeck(deckAfterMachine);
  }, []); // Solo ejecuta al iniciar el componente

  const handleMove = (domino, isPlayer) => {
    console.log(domino);
    
    if ((isPlayer && turn !== "player") || (!isPlayer && turn !== "machine")) {
      console.warn("Movimiento fuera de turno.");
      return;
    }

    const [left, right] = board.length > 0 ? board[0].split("|") : ["", ""];
    const ends = [left, right];
    const [dominoLeft, dominoRight] = domino ? domino.split("|") : ["", ""];
    const isValid =
      board.length === 0 ||
      ends.includes(dominoLeft) ||
      ends.includes(dominoRight);

    if (domino && isValid) {
      const newBoard = [...board];
      if (board.length === 0 || ends[0] === dominoLeft || ends[1] === dominoRight) {
        newBoard.push(domino);
      } else {
        newBoard.unshift(domino);
      }
      setBoard(newBoard);

      if (isPlayer) {
        setPlayerHand(playerHand.filter((d) => d !== domino));
        setTurn("machine"); // Cambia al turno de la máquina
      } else {
        setMachineHand(machineHand.filter((d) => d !== domino));
        setTurn("player"); // Cambia al turno del jugador
      }
    }

    checkGameOver();
  };

  const checkGameOver = () => {
    if (playerHand.length === 0) {
      alert("¡Ganaste!");
    } else if (machineHand.length === 0) {
      alert("¡La máquina ganó!");
    } else if (
      playerHand.every((d) => !machineTurn(board, [d], deck).move) &&
      machineHand.every((d) => !machineTurn(board, [d], deck).move) &&
      deck.length === 0
    ) {
      alert("¡Empate! No hay más movimientos.");
    }
  };

  useEffect(() => {
    if (turn === "machine") {
      const { move, newHand, newDeck } = machineTurn(board, machineHand, deck);
      setMachineHand(newHand);
      setDeck(newDeck);
      console.log("Machine hand", machineHand);
      
      if (move) {
        console.log(move);
        setTimeout(() => handleMove(move, false), 1000);
      } else {
        setTurn("player");
      }
    }
  }, [turn]);

  return (
    <div className="app">
      <h1>Dominó: Jugador vs Máquina</h1>
      <MachineInfo hand={machineHand} />
      <Board board={board} />
      <PlayerHand
        hand={playerHand}
        onPlay={(domino) => {
          handleMove(domino, true); // Llama al movimiento del jugador
        }}
      />
    </div>
  );
};

export default App;
