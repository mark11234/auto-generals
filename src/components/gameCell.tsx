import { CellState } from "../models/cellState";
import "./gameCell.css";

type cellProps = {
  cellState: CellState;
};

const ownerColors = ["grey", "red", "blue"];

const GameCell = (props: cellProps) => {
  const className = props.cellState.type
    ? `${props.cellState.type}Cell`
    : "EmptyCell";
  return (
    <>
      {props.cellState.owner && (
        <div
          className={className}
          style={{ backgroundColor: ownerColors[props.cellState.owner] }}
        >
          {props.cellState.value}
        </div>
      )}
      {!props.cellState.owner && (
        <div className={className}> {props.cellState.value}</div>
      )}
    </>
  );
};

export default GameCell;
