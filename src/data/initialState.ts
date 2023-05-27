import { CellState } from "../models/cellState";
import { GameState } from "../models/gameState";

const player1Crown: CellState = { owner: 1, value: 10, type: "Crown" };
const player2Crown: CellState = { ...player1Crown, owner: 2 };
const wall: CellState = { type: "Wall", owner: null, value: 0 };
const neutralCastle: CellState = { owner: null, value: 10, type: "Castle" };
const neutralSquare: CellState ={owner: null, value: 1, type: null}

export const initalState: GameState ={
    turn: 0,
    rows: [
        [player1Crown, neutralSquare, neutralSquare, wall, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralCastle],
        [neutralSquare, neutralSquare, neutralSquare, wall, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare],
        [neutralSquare, neutralSquare, neutralCastle, neutralSquare, neutralSquare, neutralSquare, neutralCastle, neutralSquare, neutralSquare],
        [wall, wall, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare],
        [neutralSquare, neutralSquare, neutralSquare, neutralSquare, wall, neutralSquare, neutralSquare, neutralSquare, neutralSquare],
        [neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, wall, wall],
        [neutralSquare, neutralSquare, neutralCastle, neutralSquare, neutralSquare, neutralSquare, neutralCastle, neutralSquare, neutralSquare],
        [neutralSquare, neutralSquare, neutralSquare, neutralSquare, neutralSquare, wall, neutralSquare, neutralSquare, neutralSquare],
        [neutralCastle, neutralSquare, neutralSquare, neutralSquare, neutralSquare, wall, neutralSquare, neutralSquare, player2Crown],
    ]
}
