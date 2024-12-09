import "../styles/PlayerHand.css";
const PlayerHand = ({ hand = [], onPlay, board = [] }) => {
  const isMoveValid = (domino) => {
    if (!board || board.length === 0) return true;

    const [left, right] = [
      board[0]?.split("|")[0],
      board[board.length - 1]?.split("|")[1],
    ];
    const [dominoLeft, dominoRight] = domino.split("|");

    return (
      left === dominoLeft ||
      left === dominoRight ||
      right === dominoLeft ||
      right === dominoRight
    );
  };

  return (
    <div className="player-hand">
      <h2>Tu Mano</h2>
      <div className="hand">
        {Array.isArray(hand) && hand.length > 0 ? (
          hand.map((domino, index) => (
            <button
              key={index}
              className={`domino ${isMoveValid(domino) ? "valid" : "invalid"}`}
              onClick={() => isMoveValid(domino) && onPlay(domino)}
              disabled={!isMoveValid(domino)}
            >
              {domino}
            </button>
          ))
        ) : (
          <p>No tienes fichas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerHand;
