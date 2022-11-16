import { v4 as uuidv4 } from 'uuid';

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function createUUID() {
  return uuidv4();
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, curr) => [...acc, ...curr], [] as T[]);
}
