export const machineTurn = (board, hand, deck) => {
  const [left, right] = board.length > 0 ? board[0].split("|") : ["", ""];
  const ends = [left, right];

  for (let domino of hand) {
    const [dominoLeft, dominoRight] = domino.split("|");
    if (board.length === 0 || ends.includes(dominoLeft) || ends.includes(dominoRight)) {
      return {
        move: domino,
        newHand: hand.filter((d) => d !== domino),
        newDeck: deck,
      };
    }
  }

  console.log(hand);

  if (deck.length > 0) {
    const newDomino = deck[0];
    return {
      move: null,
      newHand: [...hand, newDomino],
      newDeck: deck.slice(1),
    };
  }
  return {
    move: null,
    newHand: hand,
    newDeck: deck,
  };
};
