import React, { useRef, useState } from 'react';
import "./tictactoe.css";

const Del1 = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [val, setVal] = useState(true);
    const scoreRef = useRef(null)

    const renderSquare = (index) => {
        return (
            <button className='box' onClick={() => handleClick(index)}>{board[index]}</button>
        )
    }
    const handleClick = (index) => {
        if (board[index] != null) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = val ? "X" : "O";
        setBoard(newBoard);
        setVal(!val);
    }
    const checkWinner = () => {
        const combination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < combination.length; i++) {
            const [a, b, c] = combination[i];
            console.log(board[a], board[b], board[c])
            if (board[a] !== null && board[a] === board[b] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return false;
    }
    const handleReset = () => {
        setBoard(Array(9).fill(null))
        if (scoreRef.current !== null) {
            scoreRef.current.style.display = "none"
        }
    }


    return (
        <div className="container">
            <h1 className="heading">Welcome to the Tictac Toe</h1>
            <div className="mainBox">
                <div className="row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            {checkWinner() ? (<button className="btn" ref={scoreRef}>{checkWinner()} is winner of this Game</button>) : (<></>)}
            <button className="btn" onClick={handleReset}>Reset Board</button>
        </div>
    )
}

export default Del1