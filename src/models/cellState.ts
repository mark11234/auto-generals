export type CellState = {
    owner: null | 1 | 2,
    value: number,
    type: null | "castle" | "wall"
};