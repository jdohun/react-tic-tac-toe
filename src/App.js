import {useState} from "react";
import "./styles.css"

const Game = () => {
    const [xIsNext, setXIsNext] = useState(true); // true 이면 다음 표시 마크는 X
    const [history, setHistory] = useState([Array(9).fill(null)]); // 게임 히스토리 정보 초기화
    const [currentMove, setCurrentMove] = useState(0); // 현재 게임 진행 시점 초기화
    const currentSquares = history[currentMove]; // 현재 게임 진행 시점을 통해 현재 게임 진행 상황을 초기화

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // 현재 시점까지의 기록에 새로운 기록을 추가
        setHistory(nextHistory); // history 재정의
        setCurrentMove(nextHistory.length - 1); // 재정의된 history 의 최근 기록으로 현재 시점 변경
        setXIsNext(!xIsNext);   // xIsNext 업데이트
    }

    // 입력 받은 시점으로 이동
    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove); // 입력 받은 시점으로 currentMove 변경
        setXIsNext(nextMove % 2 === 0); // 입력 받은 시점을 통해 xIsNext 변경
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
            // 키는 전역적으로 고유할 필요 없이, 구성 요소와 해당 형제 사이에서만 고유하면 된다.
            <li key={move}>
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
        if (squares[i] || calculateWinner(squares)) { // 이미 클릭한 square 또는 승리자가 나온 경우 반응하지 않음
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
        [0, 4, 8],  // cross1
        [2, 4, 6]   // cross2
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
