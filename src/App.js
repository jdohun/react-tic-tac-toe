import {useState} from "react";
import "./styles.css"

const Game = () => {
    const [xIsNext, setXisNext] = useState(true); // 현재 표시 마크가 X 이면 true
    const [history, setHistory] = useState([Array(9).fill(null)]); // 게임 히스토리 정보 초기화
    const currentSquares = history[history.length - 1];

    const handlePlay = (nextSquares) => {
        setHistory([...history, nextSquares]); // history 에 nextSquares 추가하여 업데이트
        setXisNext(!xIsNext);   // xIsNext 업데이트
    }

    const jumpTo = (nextMove) => {
        // TODO
    }

    // 저장중인 history 를 각각 하나의 버튼으로 반환
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

const Board = ({xIsNext, squares, onPlay}) => {
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
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
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

export default Game;
