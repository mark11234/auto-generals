import { CellState } from "./cellState";

export type GameState = {
    turn: number,
    rows: CellState[][],
};
