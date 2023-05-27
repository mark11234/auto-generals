import React, { useState } from 'react';
import './App.css';
import GameField from './components/gameField';
import { GameState } from './models/gameState';
import { initalState } from './data/initialState';

function App() {
  const [gameState, updateGameState] = useState<GameState>(initalState);
  return (
    <div className="Wrapper">
      <div className="Body">
        <GameField rowStates={gameState.rows}></GameField>
      </div>
    </div>
  );
}

export default App;
