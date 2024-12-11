import { isMoveValid } from "./utils.js";

export const machineTurn = (currentBoard, machineHand, currentDeck) => {
  let move = null;
  let newHand = [...machineHand];
  let newDeck = [...currentDeck];
  
  const [left, right] = currentBoard.length > 0
    ? [currentBoard[0].split("|")[0], currentBoard[currentBoard.length - 1].split("|")[1]]
    : ["", ""];
  
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

  if (!move && newDeck.length > 0) {
    const drawnDomino = newDeck.pop();
    newHand.push(drawnDomino);
    return { move: null, newHand, newDeck };
  }
  
  if (move) {
    newHand = newHand.filter((d) => d !== move);
  }

  return { move, newHand, newDeck };
};
