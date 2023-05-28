import { CellState } from "../models/cellState";
import { GameState } from "../models/gameState"
import { PlayerOutput } from "../models/playerOutput";
import { getPlayerOneMove } from "./getPlayerOneMove";
import { getPlayerTwoMove } from "./getPlayerTwoMove";
import { verifyMove } from "./verifyMove";

export const getNextGameState = (gameState: GameState): GameState => {
    const playerOneMove = verifyMove(getPlayerOneMove(gameState), gameState, 1);
    const playerTwoMove = verifyMove(getPlayerTwoMove(gameState), gameState, 2);
    
    const nextGameState:GameState={...gameState, turn: gameState.turn + 1};
    doMove(nextGameState, playerOneMove, 1);
    doMove(nextGameState, playerTwoMove, 2);

    //check win conditions!

    if (nextGameState.turn % 25 === 0) {
        return {
            ...nextGameState,
            rows: nextGameState.rows.map(
                (row) => row.map(
                    (cell: CellState):CellState => (
                        {
                            ...cell,
                            value: cell.owner ? cell.value + 1 : cell.value
                        }
                    )
                )
            ),
        }
    } else {
            return {
            ...nextGameState,
            rows: nextGameState.rows.map(
                (row) => row.map(
                    (cell: CellState):CellState => (
                        {
                            ...cell,
                            value: (cell.type === "Castle" || cell.type === "Crown") && cell.owner ? cell.value + 1 : cell.value
                        }
                    )
                )
            ),}
    }
}

const doMove = (nextGamestate: GameState, move: PlayerOutput, player: 1 | 2): void => {
    if (!move) return;
    if (nextGamestate.rows[move.to.row][move.to.column].type === "Wall") return;

    nextGamestate.rows[move.from.row][move.from.column].value -= move.quantity;
    if (nextGamestate.rows[move.to.row][move.to.column].owner === player) {
        // Moving to friendly teritory
        nextGamestate.rows[move.to.row][move.to.column].value += move.quantity;
    } else if (nextGamestate.rows[move.to.row][move.to.column].value >= move.quantity) {
        // Player loses to owner
        nextGamestate.rows[move.to.row][move.to.column].value -= move.quantity;
    } else {
        // Player beats owner
        nextGamestate.rows[move.to.row][move.to.column].value =
            move.quantity - nextGamestate.rows[move.to.row][move.to.column].value;
        nextGamestate.rows[move.to.row][move.to.column].owner = player;
        if (nextGamestate.rows[move.to.row][move.to.column].type === "Crown") nextGamestate.winner = player;
        
    }
}
