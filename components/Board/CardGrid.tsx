import * as React from 'react';
import { clsx } from 'clsx';

import { Cell, Grid } from './Grid';

interface CardGridProps {
  grid: Grid;
  foundCellIds: string[];
  opened: Cell[];
  isFinished: boolean;
  isMaxOpenedCards: boolean;
  onClick: (cell: Cell) => void;
}

function CardGrid({
  grid,
  foundCellIds,
  opened,
  isFinished,
  isMaxOpenedCards,
  onClick,
}: CardGridProps) {
  const foundMap = foundCellIds.reduce(
    (acc, cellId) => ({ ...acc, [cellId]: true }),
    {} as Record<string, boolean>
  );

  const openedMap = opened.reduce(
    (acc, cell) => ({ ...acc, [cell.id]: true }),
    {} as Record<string, true>
  );

  return (
    <div className="card-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell) => {
            const isOpened = openedMap[cell.id];
            const isFound = foundMap[cell.id];

            const canShow = isFinished || isOpened || isFound;

            const isDisabled =
              isFinished || isMaxOpenedCards || isOpened || isFound;

            const className = clsx({
              cell: true,
              '-opened': isOpened,
              '-found': isFound,
            });

            return (
              <button
                key={cell.id}
                disabled={isDisabled}
                className={className}
                onClick={() => onClick(cell)}
              >
                {canShow ? cell.label : ''}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
