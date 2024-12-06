export const generateDeck = () => {
  const deck = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      deck.push(`${i}|${j}`);
    }
  }
  return deck;
};

export const shuffleDeck = () => {
  const deck = generateDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const drawInitialHand = (deck, count = 7) => {
  const hand = deck.slice(0, count);
  return { hand, newDeck: deck.slice(count) };
};
