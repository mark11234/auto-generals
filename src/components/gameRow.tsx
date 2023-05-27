import { CellState } from "../models/cellState";
import GameCell from "./gameCell";

const rowStyle: React.CSSProperties = {
    display: 'flex',
};

type rowProps = {
    cellStates: CellState[]
};

const GameRow = (props: rowProps)  => {
    return(
        <div style={rowStyle}>
            {props.cellStates.map((cellState) => <GameCell cellState={cellState}></GameCell>)}
        </div>
    );
}

export default GameRow;