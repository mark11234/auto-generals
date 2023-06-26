import React, { useState } from "react";
import "./App.css";
import GameField from "./components/gameField";
import { GameState } from "./models/gameState";
import { initalState } from "./data/initialState";
import { getNextGameState } from "./helpers/getNextGameState";

function App() {
  const [gameState, updateGameState] = useState<GameState>(initalState);
  return (
    <div className="Wrapper">
      <div className="Body">
        <p>Turn: {gameState.turn}</p>
        <GameField rowStates={gameState.rows}></GameField>
        <p>{gameState.winner && `Bot ${gameState.winner} wins!`}</p>
        {!gameState.winner && (
          <button onClick={() => updateGameState(getNextGameState(gameState))}>
            Next Turn
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
