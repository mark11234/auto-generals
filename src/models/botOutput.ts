export type BotOutput = {
    from: { column: number, row: number},
    to: { column: number, row: number}
    quantity: number,
} | null;
