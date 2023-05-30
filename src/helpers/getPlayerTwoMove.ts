import { GameState } from "../models/gameState";
import { PlayerOutput } from "../models/playerOutput";

// Random Choice of square and move N or W
export const getPlayerTwoMove = (gameState: GameState): PlayerOutput => {
    const direction: [number,number] = Math.floor(Math.random()*2) === 0 ? [-1,0] : [0,-1];
    while (true) {
        const column = Math.floor(Math.random()*9);
        const row = Math.floor(Math.random()*9);
        if (gameState.rows[row][column].owner === 2 
            && 0 <= row + direction[1] 
            && row + direction[1] <= 8
            && 0 <= column + direction[0] 
            && column + direction[0] <= 8
            && gameState.rows[row + direction[1]][column + direction[0]].type !== "Wall"
            && gameState.rows[row][column].value > 1
            && (
                ( row + direction[1] <= 2 && column + direction[0] <= 2) 
                || ( row + direction[1] >= 2 && column + direction[0] >= 2)
            )
            ) {
            return {
                from: {column: column, row: row},
                to: {column: column + direction[0] , row: row + direction[1]},
                quantity: 1000,
            }
        }
    }
}
