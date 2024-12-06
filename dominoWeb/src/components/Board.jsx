import React from "react";
import "../styles/Board.css";

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((domino, index) => (
        <div key={index} className="domino">
          {domino}
        </div>
      ))}
    </div>
  );
};

export default Board;
