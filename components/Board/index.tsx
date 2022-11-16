import * as React from 'react';

import { Cell, calculateTotalPairs } from './Grid';
import CardGrid from './CardGrid';
import { useBoard } from './State';

interface BoardProps {
  gridSize: number;
}

function Board({ gridSize: size }: BoardProps) {
  const [state, dispatch] = useBoard(size);

  const { grid, opened, foundCellIds, attempts } = state;

  const totalFoundPairs = foundCellIds.length / 2;
  const totalPairs = calculateTotalPairs(size);
  const isFinished = totalFoundPairs === totalPairs;
  const isMaxOpenedCards = opened.length === 2;

  function resetGame() {
    dispatch({ type: 'RESET_BOARD', payload: { newGridSize: size } });
  }

  function openCell(cell: Cell) {
    dispatch({ type: 'OPEN_CELL', payload: cell });
  }

  React.useEffect(() => {
    if (isMaxOpenedCards) {
      const [first, second] = opened;

      if (first.value === second.value) {
        dispatch({ type: 'FOUND_PAIR', payload: [first.id, second.id] });
      } else {
        setTimeout(() => {
          dispatch({ type: 'CLEAR_OPENED_CELLS' });
        }, 1000);
      }
    }
  }, [isMaxOpenedCards]);

  return (
    <div className="board">
      <p>
        Score: {totalFoundPairs} / {totalPairs}
      </p>

      <p>Attempts: {attempts}</p>

      <CardGrid
        grid={grid}
        foundCellIds={foundCellIds}
        opened={opened}
        isFinished={isFinished}
        isMaxOpenedCards={isMaxOpenedCards}
        onClick={openCell}
      />

      <div className="actions">
        <button className="btn" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Board;
