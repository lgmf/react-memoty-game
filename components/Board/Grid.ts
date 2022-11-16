import { createUUID, getRandomNumber } from '../../utils';

type Coordinates = Array<[number, number]>;

export interface Cell {
  id: string;
  value: number;
  label: string;
}

export type Grid = Array<Array<Cell>>;

function createCell(value: number, label: string): Cell {
  return {
    id: createUUID(),
    value,
    label,
  };
}

function generateCoordinates(size: number): Coordinates {
  const coordinates = [] as Coordinates;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      coordinates.push([i, j]);
    }
  }

  return coordinates;
}

function createEmptyGrid(size: number): Grid {
  const grid = [] as Grid;

  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = createCell(-1, '-1');
    }
  }

  return grid;
}

export function calculateTotalPairs(size: number) {
  const gridSize = size * size;
  return gridSize / 2;
}

export function createGrid(size: number): Grid {
  if (size % 2 !== 0) {
    throw new Error('must inform even size');
  }

  const uniqCellValues = new Set<number>();

  const totalPairs = calculateTotalPairs(size);

  while (uniqCellValues.size < totalPairs) {
    uniqCellValues.add(getRandomNumber(totalPairs));
  }

  const randomCellValues = Array.from(uniqCellValues);
  const grid = createEmptyGrid(size);
  const coordinates = generateCoordinates(size);

  for (const cellValue of randomCellValues) {
    let count = 0;
    while (count < 2) {
      const randomCoordinateIndex = getRandomNumber(coordinates.length);
      const coordinate = coordinates[randomCoordinateIndex];

      if (coordinate) {
        const [rowIndex, cellIndex] = coordinate;
        const cell = grid[rowIndex][cellIndex];

        cell.value = cellValue;
        cell.label = cellValue.toString();
        coordinates.splice(randomCoordinateIndex, 1);
        count += 1;
      }
    }
  }

  return grid;
}
