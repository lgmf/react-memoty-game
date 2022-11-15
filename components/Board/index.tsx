import * as React from 'react';
import { clsx } from 'clsx';

import { Grid, createGrid, Cell, calculateTotalPairs } from './Grid';

interface BoardProps {
  gridSize: number;
}

function Board({ gridSize: size }: BoardProps) {
  const [selected, setSelected] = React.useState<Cell[]>([]);
  const [grid, setGrid] = React.useState<Grid>(createGrid(size));

  const answeredCount = React.useMemo(() => {
    return grid
      .reduce((acc, curr) => [...acc, ...curr], [])
      .reduce((acc, curr) => (curr.matched ? acc + 1 : acc), 0);
  }, [grid]);

  const selectedMap = selected.reduce(
    (acc, cell) => ({ ...acc, [cell.id]: cell }),
    {} as Record<string, Cell>
  );

  const foundPairs = answeredCount / 2;

  const totalPairs = calculateTotalPairs(size);

  const isFinished = foundPairs === totalPairs;

  const isFull = selected.length === 2;

  function selectCell(cell: Cell) {
    if (isFull) {
      return;
    }

    setSelected([...selected, cell]);
  }

  function resetGame() {
    setGrid(createGrid(size));
  }

  React.useEffect(() => {
    let timeoutId: number | undefined;

    if (isFull) {
      const [first, second] = selected;

      if (first.value === second.value) {
        setGrid((prevGrid) =>
          prevGrid.map((row) =>
            row.map((col) => {
              if (col.id === first.id || col.id === second.id) {
                return { ...col, matched: true };
              }

              return col;
            })
          )
        );
        setSelected([]);
      } else {
        timeoutId = setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFull]);

  React.useEffect(() => {
    setGrid(createGrid(size));
    setSelected([]);
  }, [size]);

  return (
    <div className="board">
      <p>
        Score: {foundPairs} / {totalPairs}
      </p>

      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell) => {
            const isSelected = Boolean(selectedMap[cell.id]);

            const canShowValue = isFinished || isSelected || cell.matched;

            const isDisabled =
              isFinished || isFull || isSelected || cell.matched;

            const className = clsx({
              cell: true,
              '-seleced': isSelected,
              '-matched': cell.matched,
            });

            return (
              <button
                key={cell.id}
                disabled={isDisabled}
                className={className}
                onClick={() => selectCell(cell)}
              >
                {canShowValue ? cell.value : ''}
              </button>
            );
          })}
        </div>
      ))}

      <div className="actions">
        <button className="btn" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Board;
