export const isMoveValid = (board, domino) => {
    const [left, right] = board.length > 0
      ? [board[0].split("|")[0], board[board.length - 1].split("|")[1]]
      : ["", ""];
  
    const [dominoLeft, dominoRight] = domino.split("|");
  
    return (
      board.length === 0 ||
      left === dominoRight || 
      left === dominoLeft || 
      right === dominoLeft || 
      right === dominoRight
    );
  };
  