import { GameState } from "../models/gameState";
import { PlayerOutput } from "../models/playerOutput";

export const getPlayerTwoMove = (gameState: GameState): PlayerOutput => {
    return {
        from: {column: 8, row: 8},
        to: {column: 8, row: 7},
        quantity: 2,
    }
}