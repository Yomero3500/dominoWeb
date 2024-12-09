export const handleMove = (domino, isPlayer, board, setBoard, setPlayerHand, setMachineHand, checkGameOver, setTurn, machineMove) => {
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
      setPlayerHand((prevHand) => prevHand.filter((d) => d !== domino));
    } else {
      setMachineHand((prevHand) => prevHand.filter((d) => d !== domino));
    }
  
    if (checkGameOver(newBoard)) return;
  
    setTurn(isPlayer ? "machine" : "player");
  
    if (!isPlayer) {
      setTimeout(() => machineMove(newBoard), 1000);
    }
  };
  
  export const machineMove = (currentBoard, machineHand, deck, handleMove, setMachineHand, setDeck, setTurn, setPlayerHand, checkGameOver) => {
    console.log("Turno de la máquina:");
    const { move, newHand, newDeck } = machineTurn(currentBoard, machineHand, deck);
    if (move) {
      console.log("Movimiento de la máquina:", move);
      handleMove(move, false, currentBoard, setBoard, setPlayerHand, setMachineHand, checkGameOver, setTurn, machineMove);
    } else {
      console.log("La máquina no puede mover. Pasando turno...");
      setTurn("player");
    }
    setMachineHand(newHand);
    setDeck(newDeck);
  };

export const machineTurn = (currentBoard, machineHand, deck) => {
  for (let i = 0; i < machineHand.length; i++) {
    const domino = machineHand[i];
    const [dominoLeft, dominoRight] = domino.split("|");
    const [left, right] = currentBoard.length > 0
      ? [currentBoard[0].split("|")[0], currentBoard[currentBoard.length - 1].split("|")[1]]
      : ["", ""];

    if (left === dominoRight || right === dominoLeft || left === dominoLeft || right === dominoRight) {
      const newBoard = [...currentBoard];
      if (left === dominoRight) {
        newBoard.unshift(domino);
      } else if (right === dominoLeft) {
        newBoard.push(domino);
      }
      const newHand = [...machineHand];
      newHand.splice(i, 1); 
      const newDeck = deck;  
      return { move: domino, newBoard, newHand, newDeck };
    }
  }
  return { move: null, newBoard: currentBoard, newHand: machineHand, newDeck: deck };
};


  