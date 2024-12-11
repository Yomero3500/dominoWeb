import React from "react";

const Board = ({ board }) => {
  const renderDomino = (domino, index, isLeft) => {
    const [left, right] = domino.split("|");

    const orientation = isLeft ? "vertical" : "horizontal";
    const rotation = isLeft ? "rotate(-90deg)" : "rotate(0deg)";

    return (
      <div
        key={index}
        className={`domino ${orientation}`}
        style={{
          transform: rotation,
          display: "inline-block",
          margin: "5px",
          textAlign: "center",
          border: "1px solid black",
          width: "20px",
          height: "50px",
        }}
      >
        <div>{left}</div>
        <div>{right}</div>
      </div>
    );
  };

  return (
    <div className="board">
      {board.map((domino, index) => renderDomino(domino, index, index % 2 === 0))}
    </div>
  );
};

export default Board;
