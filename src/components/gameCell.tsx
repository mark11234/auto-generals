import { CellState } from "../models/cellState";

type cellProps = {
    cellState: CellState
};

let cellStyle: React.CSSProperties = {
    textAlign: "center",
    width: "5vw",
    aspectRatio: "1/1",
    display: "flex",
    margin: "auto",
    alignItems:"center",
    justifyContent:"center",
};

const GameCell = (props: cellProps)  => {
    switch (props.cellState.owner) {
        case 1:
            cellStyle = {...cellStyle, backgroundColor: "red"};
            break;
        case 2:
            cellStyle = {...cellStyle, backgroundColor: "blue"};
            break;
        default:
            cellStyle = {...cellStyle, backgroundColor: "green"};
    }

    return(
        <div style={cellStyle}> 
            {props.cellState.value}
        </div>
    );
}

export default GameCell;
