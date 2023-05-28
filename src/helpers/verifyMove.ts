import { GameState } from "../models/gameState";
import { PlayerOutput } from "../models/playerOutput";

export const verifyMove = (attemptedMove: PlayerOutput, gameState: GameState, player: number): PlayerOutput => {    
    if (!attemptedMove) {
        return null;
    }

    const cellsGivenInRange = gameState.rows.length > attemptedMove.from.row
        && 0 <= attemptedMove.from.row
        && gameState.rows[0].length > attemptedMove.from.column
        && 0 <= attemptedMove.from.column
        && gameState.rows.length > attemptedMove.to.row
        && 0 <= attemptedMove.to.row
        && gameState.rows[0].length > attemptedMove.to.column
        && 0 <= attemptedMove.to.column;

    if (!cellsGivenInRange) {
        return null;
    }

    const doesNotOwnCell = gameState.rows[attemptedMove.from.row][attemptedMove?.from.column].owner !== player;
    const cellsNotAdjacent = Math.abs(attemptedMove.from.row - attemptedMove.to.row) > 1 
        && Math.abs(attemptedMove.from.column - attemptedMove.to.column) > 1
    
    if (doesNotOwnCell || cellsNotAdjacent) {
        return null;
    }

    // Rescale so quantity is in range
    return {...attemptedMove,
        quantity: attemptedMove.quantity <= gameState.rows[attemptedMove.from.row][attemptedMove.from.column].value 
        ? attemptedMove.quantity
        : gameState.rows[attemptedMove.from.row][attemptedMove.from.column].value - 1
    }
}