import { CellState } from "../models/cellState";
import { GameState } from "../models/gameState"
import { PlayerOutput } from "../models/playerOutput";
import { getPlayerOneMove } from "./getPlayerOneMove";
import { getPlayerTwoMove } from "./getPlayerTwoMove";
import { verifyMove } from "./verifyMove";

export const  getNextGameState =  (gameState: GameState): GameState => {
    const nextGameState:GameState={...gameState, turn: gameState.turn + 1};

    // Todo: Change players into classes with function getMove()
    const playerOneMove = verifyMove(getPlayerOneMove(gameState), gameState, 1);
    doMove(nextGameState, playerOneMove, 1);
    const playerTwoMove = verifyMove(getPlayerTwoMove(nextGameState), nextGameState, 2);
    doMove(nextGameState, playerTwoMove, 2);

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

const doMove = (nextGameState: GameState, move: PlayerOutput, player: 1 | 2): void => {
    if (!move) return;
    if (nextGameState.rows[move.to.row][move.to.column].type === "Wall") return;

    nextGameState.rows[move.from.row][move.from.column].value -= move.quantity;
    if (nextGameState.rows[move.to.row][move.to.column].owner === player) {
        // Moving to friendly teritory
        nextGameState.rows[move.to.row][move.to.column].value += move.quantity;
    } else if (nextGameState.rows[move.to.row][move.to.column].value >= move.quantity) {
        // Player loses to owner
        nextGameState.rows[move.to.row][move.to.column].value -= move.quantity;
    } else {
        // Player beats owner
        nextGameState.rows[move.to.row][move.to.column].value =
            move.quantity - nextGameState.rows[move.to.row][move.to.column].value;
        nextGameState.rows[move.to.row][move.to.column].owner = player;
        if (nextGameState.rows[move.to.row][move.to.column].type === "Crown") nextGameState.winner = player;
    }

    if ( nextGameState.rows[move.to.row][move.to.column].value < 0) { console.log(`Player ${player} did an oopsie on target`)}
}
