import { CellState } from "../models/cellState";
import { GameState } from "../models/gameState"
import { BotOutput } from "../models/botOutput";
import { verifyMove } from "./verifyMove";

// Change these to change the bots
import bot1 from '../bots/nullBot';
import bot2 from '../bots/nullBot';

export const  getNextGameState =  (gameState: GameState): GameState => {
    const nextGameState:GameState={...gameState, turn: gameState.turn + 1};

    for (let i = 0; i<2; i++) {
        const bot1Move = verifyMove(bot1.makeMove(gameState, 1), gameState, 1);
        doMove(nextGameState, bot1Move, 1);
        const bot2Move = verifyMove(bot2.makeMove(gameState, 2), gameState, 2);
        doMove(nextGameState, bot2Move, 2);
    }

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

const doMove = (nextGameState: GameState, move: BotOutput, bot: 1 | 2): void => {
    if (!move) return;
    if (nextGameState.rows[move.to.row][move.to.column].type === "Wall") return;

    nextGameState.rows[move.from.row][move.from.column].value -= move.quantity;
    if (nextGameState.rows[move.to.row][move.to.column].owner === bot) {
        // Moving to friendly teritory
        nextGameState.rows[move.to.row][move.to.column].value += move.quantity;
    } else if (nextGameState.rows[move.to.row][move.to.column].value >= move.quantity) {
        // Bot loses to owner
        nextGameState.rows[move.to.row][move.to.column].value -= move.quantity;
    } else {
        // Bot beats owner
        nextGameState.rows[move.to.row][move.to.column].value =
            move.quantity - nextGameState.rows[move.to.row][move.to.column].value;
        nextGameState.rows[move.to.row][move.to.column].owner = bot;
        if (nextGameState.rows[move.to.row][move.to.column].type === "Crown") nextGameState.winner = bot;
    }
}
