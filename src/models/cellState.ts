export type CellState = NormalState | WallState;

type NormalState = {
    owner: null | 1 | 2,
    value: number,
    type: null | "Castle" | "Crown",
};

type WallState = {
    owner: null,
    value: number,
    type: "Wall",
};
