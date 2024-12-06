import React from "react";
import "../styles/PlayerHand.css";

const PlayerHand = ({ hand, onPlay }) => {
  return (
    <div className="player-hand">
      <h2>Tu Mano</h2>
      <div className="dominoes">
        {hand.map((domino, index) => (
          <div
            key={index}
            className="domino"
            onClick={() => onPlay(domino)}
          >
            {domino}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
