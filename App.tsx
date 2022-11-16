import * as React from 'react';
import './style.css';

import Board from './components/Board';

export default function App() {
  const [inputValue, setInputValue] = React.useState('2');

  const gridSize = Number(inputValue);

  return (
    <div className="app">
      <div className="field">
        <label htmlFor="grid-size">Grid Size (even)</label>
        <input
          id="grid-size"
          type="number"
          min="2"
          step="2"
          max="100"
          value={inputValue}
          onChange={(event) => {
            const value = Number(event.target.value);
            const isValid = !Number.isNaN(value) && value % 2 === 0;

            if (isValid) {
              setInputValue(event.target.value);
            }
          }}
        />
      </div>

      {gridSize ? <Board gridSize={gridSize} /> : null}
    </div>
  );
}
