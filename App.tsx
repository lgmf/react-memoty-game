import * as React from 'react';
import './style.css';

import Board from './components/Board';

export default function App() {
  const [gridSize, setGridSize] = React.useState<number>(2);

  return (
    <div className="app">
      <div className="field">
        <label htmlFor="grid-size">Grid size:</label>
        <input
          id="grid-size"
          type="number"
          min="2"
          step="2"
          max="100"
          value={gridSize}
          onChange={(event) => {
            const value = Number(event.target.value);
            const isValid = value && !Number.isNaN(value) && value % 2 === 0;

            if (isValid) {
              setGridSize(value);
            }
          }}
        />
      </div>

      {gridSize ? <Board gridSize={Number(gridSize)} /> : null}
    </div>
  );
}
