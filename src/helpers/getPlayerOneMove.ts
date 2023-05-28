import { GameState } from "../models/gameState";
import { PlayerOutput } from "../models/playerOutput";

// Deterministic Win on turn 101
export const getPlayerOneMove = (gameState: GameState): PlayerOutput => {
    switch (gameState.turn) {
        case 98:
            return {
                from: {column: 6, row: 6},
                to: {column: 6, row: 7},
                quantity: 1000,
            }
        case 99:
            return {
                from: {column: 6, row: 7},
                to: {column: 7, row: 7},
                quantity: 1000,
            }
        case 100:
            return {
                from: {column: 7, row: 7},
                to: {column: 7, row: 8},
                quantity: 1000,
            }
        case 101:
            return {
                from: {column: 7, row: 8},
                to: {column: 8, row: 8},
                quantity: 1000,
            }
    }
    if (gameState.turn%50 < 40){
        switch (gameState.turn % 5) {
            case 1:
                return {
                    from: {column: 0, row: 0},
                    to: {column: 0, row: 1},
                    quantity: 11,
                } 
            case 2:
                return {
                    from: {column: 0, row: 1},
                    to: {column: 0, row: 2},
                    quantity: 11,
                } 
            case 3:
                return {
                    from: {column: 0, row: 2},
                    to: {column: 1, row: 2},
                    quantity: 11,
                } 
            case 4:
                return {
                    from: {column: 1, row: 2},
                    to: {column: 2, row: 2},
                    quantity: 11,
                }  
            case 0:
                return {
                    from: {column: 2, row: 2},
                    to: {column: 2, row: 2},
                    quantity: 11,
                }  
            default:
                return null
        };
    } else {

    }
    switch (gameState.turn %50) {
            case 40:
                return {
                    from: {column: 2, row: 2},
                    to: {column: 2, row: 3},
                    quantity: 1000,
                } 
            case 41:
                return {
                    from: {column: 2, row: 3},
                    to: {column: 2, row: 4},
                    quantity: 1000,
                }  
            case 42:
                return {
                    from: {column: 2, row: 4},
                    to: {column: 2, row: 5},
                    quantity: 1000,
                } 
            case 43:
                return {
                    from: {column: 2, row: 5},
                    to: {column: 2, row: 6},
                    quantity: 1000,
                } 
            case 44:
                return {
                    from: {column: 2, row: 6},
                    to: {column: 3, row: 6},
                    quantity: 1000,
                }
            case 45:
                return {
                    from: {column: 3, row: 6},
                    to: {column: 4, row: 6},
                    quantity: 1000,
                }  
            case 46:
                return {
                    from: {column: 4, row: 6},
                    to: {column: 5, row: 6},
                    quantity: 1000,
                }
            case 47:
                return {
                    from: {column: 5, row: 6},
                    to: {column: 6, row: 6},
                    quantity: 1000,
                }
            default:
                return null
        }
}
