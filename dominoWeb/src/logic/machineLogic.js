import { isMoveValid } from "./utils.js";

export const machineTurn = (currentBoard, machineHand, currentDeck) => {
  let move = null;
  let newHand = [...machineHand];
  let newDeck = [...currentDeck];
  
  // Identificar los extremos del tablero
  const [left, right] = currentBoard.length > 0
    ? [currentBoard[0].split("|")[0], currentBoard[currentBoard.length - 1].split("|")[1]]
    : ["", ""];
  
  // Buscar un movimiento válido en la mano de la máquina
  for (const domino of machineHand) {
    const [dominoLeft, dominoRight] = domino.split("|");
    if (
      (dominoLeft === left || dominoRight === left) ||
      (dominoLeft === right || dominoRight === right)
    ) {
      move = domino;
      break;
    }
  }
  
  // Si no hay movimientos válidos, intentar robar del mazo
  if (!move && newDeck.length > 0) {
    const drawnDomino = newDeck.pop();
    newHand.push(drawnDomino);
    return { move: null, newHand, newDeck };
  }
  
  // Si hay un movimiento válido, removerlo de la mano
  if (move) {
    newHand = newHand.filter((d) => d !== move);
  }

  return { move, newHand, newDeck };
};
