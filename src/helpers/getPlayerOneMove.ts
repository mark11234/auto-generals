import { CellState } from "../models/cellState";
import { GameState } from "../models/gameState";
import { PlayerOutput } from "../models/playerOutput";

type cellAndStep = {
    cell: [number, number],
    step: [number, number]
    distance: number,
}

// Target based algorithm
export const getPlayerOneMove = (gameState: GameState): PlayerOutput => {
    // TODO: Ideas: U
    // Use units on old castles (e.g. 2,2)
    // Dont spend all units at once. 
    // Check battle will be won?
    const TARGETS: [number, number][] = [[0,0],[2,2], [2,6], [6,6], [9,9]];
    const ownedCell: [number, number][] = gameState.rows.map(
        (row) => (row.reduce(getOwnedCellsIndices, []))
        ).flatMap(
            (rowOfIndices, rowIndex) => rowOfIndices.map(
               ( columnIndex): [number, number]  => [rowIndex, columnIndex]
                )
        );
    const ownedCellsWithUnits: [number, number][] = gameState.rows.map(
        (row) => (row.reduce(getOwnedCellsWithUnitsIndices, []))
        ).flatMap(
            (rowOfIndices, rowIndex) => rowOfIndices.map(
               ( columnIndex): [number, number]  => [rowIndex, columnIndex]
                )
        );
    const nextTarget = findNextTarget(TARGETS, ownedCell);

    const nearestOwnedCellWithUnitsAndStep = ownedCellsWithUnits.reduce(
        (nearestCellAndStep: cellAndStep,currentCell,currentIndex): cellAndStep => {
            const stepToTarget: [number, number] = [nextTarget[0] - currentCell[0], nextTarget[1] - currentCell[1]];
            const distanceToTarget: number = 
                (stepToTarget.map(Math.abs))
                    .reduce((partialSum, stepSize) => partialSum + stepSize, 0);
            return distanceToTarget <= nearestCellAndStep.distance
            ? {
                cell: currentCell,
                step: stepToTarget,
                distance: distanceToTarget,
            }
            : nearestCellAndStep
        }, {
            cell: [0,0],
            step: [8,8],
            distance: 16,
        })
    return {
        from: {
            row: nearestOwnedCellWithUnitsAndStep.cell[0],
            column: nearestOwnedCellWithUnitsAndStep.cell[1],
        },
        to: {
            row: nearestOwnedCellWithUnitsAndStep.cell[0] + makeStepUnitLength(nearestOwnedCellWithUnitsAndStep.step)[0],
            column: nearestOwnedCellWithUnitsAndStep.cell[1] + makeStepUnitLength(nearestOwnedCellWithUnitsAndStep.step)[1],
        },
        quantity: 1000
    };
}

const getOwnedCellsIndices = (
    ownedCellIndices: number[],
    currentCell: CellState,
    currentCellIndex: number,
    ) => currentCell.owner === 1 ? ownedCellIndices.concat(currentCellIndex): ownedCellIndices;

const getOwnedCellsWithUnitsIndices = (
    ownedCellIndices: number[],
    currentCell: CellState,
    currentCellIndex: number,
    ) => (currentCell.owner === 1 && (currentCell.value > 1)) ? ownedCellIndices.concat(currentCellIndex): ownedCellIndices;

const findNextTarget = (
    targets: [number, number][],
    ownedCells: [number, number][]
    ):[number, number] => {
        const nextTarget = targets.find(
            (target: [number, number]) => {
                let targetBelongsToPlayer = false
                ownedCells.forEach((ownedCell) => targetBelongsToPlayer = targetBelongsToPlayer || (ownedCell[0] === target[0] && ownedCell[1] === target[1]))
                return !targetBelongsToPlayer
            }
        )
        return nextTarget ? nextTarget : [8,8];
};

const makeStepUnitLength = (step: [number, number]): [number, number] => {
    return Math.abs(step[0]) >= Math.abs(step[1]) 
    ? [step[0]/ Math.abs(step[0]) ,0] 
    : [0,step[1]/ Math.abs(step[1])] ;
}