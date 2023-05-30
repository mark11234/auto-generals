import { CellState } from "../models/cellState";
import GameRow from "./gameRow";

const fieldStyle: React.CSSProperties ={
}

type gameFieldProps = {
    rowStates: CellState[][]
};

const GameField = (props: gameFieldProps)  => {
    
    return(
        <div style={fieldStyle}>{
            props.rowStates.map((rowState, index) => 
                <GameRow key={`row${index}`} cellStates={rowState}></GameRow>)}
        </div>
    );
}

export default GameField;