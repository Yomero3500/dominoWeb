import React from "react";
import "../styles/MachineInfo.css";

const MachineInfo = ({ hand }) => {
  return (
    <div className="machine-info">
      <h2>Máquina</h2>
      <p>Fichas restantes: {hand.length}</p>
      <p>Pensando...</p>
    </div>
  );
};

export default MachineInfo;
