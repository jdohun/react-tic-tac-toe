import {useState} from "react";
import "./styles.css"

const Board = () => {
    const [xIsNext, setXisNext] = useState(true); // 현재 표시 마크가 X 이면 true
    const [squares, setSquares] = useState(Array(9).fill(null)); // 각각의 버튼 상태 초기 정보

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) { // 이미 클릭한 square 또는 승리자가 나온 경우 종료
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares); // squares 의 정보 업데이트
        setXisNext(!xIsNext);   // xIsNext 업데이트
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

const Square = ({value, onSquareClick}) => {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

const calculateWinner = (squares) => {
    const winningLines = [
        [0, 1, 2],  // row0
        [3, 4, 5],  // row1
        [6, 7, 8],  // row2
        [0, 3, 6],  // col0
        [1, 4, 7],  // col1
        [2, 5, 8],  // col2
        [0, 4, 8],  // 대각1
        [2, 4, 6]   // 대각2
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;
