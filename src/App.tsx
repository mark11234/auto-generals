import React from 'react';
import './App.css';
import GameField from './components/gameField';
import { GameState } from './models/gameState';

function App() {
  const gameState: GameState = {
    turn: 0,
    rows: [
      [
        {
          owner: 1,
          value: 4,
          type: null
        },
        {
          owner: 1,
          value: 4,
          type: null
        }
      ],
      [
        {
          owner: null,
          value: 4,
          type: null
        },
        {
          owner: 2,
          value: 4,
          type: null
        }
      ]
    ]
  }
  return (
    <div className="Wrapper">
      <div className="Body">
        <GameField rowStates={gameState.rows}></GameField>

      </div>
    </div>
  );
}

export default App;
