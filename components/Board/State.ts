import { Dispatch, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import { Grid, createGrid, Cell } from './Grid';

interface BoardState {
  opened: Cell[];
  foundCellIds: string[];
  grid: Grid;
}

interface Action {
  type: string;
}

interface OpenCellAction extends Action {
  type: 'OPEN_CELL';
  payload: Cell;
}

interface FoundPairAction extends Action {
  type: 'FOUND_PAIR';
  payload: [string, string];
}

interface ClearOpenedCellsAction extends Action {
  type: 'CLEAR_OPENED_CELLS';
}

interface ResetBoardAction extends Action {
  type: 'RESET_BOARD';
  payload: {
    newGridSize: number;
  };
}

type BoardAction =
  | OpenCellAction
  | FoundPairAction
  | ClearOpenedCellsAction
  | ResetBoardAction;

function createInitialState(size: number): BoardState {
  return {
    opened: [],
    foundCellIds: [],
    grid: createGrid(size)
  };
}

function reducer(draftState: BoardState, action: BoardAction) {
  switch (action.type) {
    case 'OPEN_CELL':
      draftState.opened.push(action.payload);
      break;
    case 'FOUND_PAIR':
      draftState.opened = [];
      draftState.foundCellIds.push(...action.payload);
      break;
    case 'CLEAR_OPENED_CELLS':
      draftState.opened = [];
      break;
    case 'RESET_BOARD':
      draftState.opened = [];
      draftState.foundCellIds = [];
      draftState.grid = createGrid(action.payload.newGridSize);
      break;
    default:
      return draftState;
  }
}

export function useBoard(size: number): [BoardState, Dispatch<BoardAction>] {
  const [state, dispatch] = useImmerReducer(reducer, createInitialState(size));

  useEffect(() => {
    dispatch({ type: 'RESET_BOARD', payload: { newGridSize: size } });
  }, [size]);

  return [state, dispatch];
}
