import React, { useRef, useState } from 'react';
import "./tictactoe.css";

const Tictac = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [val, setVal] = useState(true);
    const [winner, setWinner] = useState(null);
    const scoreRef = useRef(null);

    const renderSquare = (index) => {
        return (
            <button className='box' onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const handleClick = (index) => {
        if (board[index] !== null || winner) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = val ? "X" : "O";
        setBoard(newBoard);
        setVal(!val);

        // Check winner after move
        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (newBoard.every(cell => cell !== null)) {
            setWinner("Draw");
        }
    };

    const checkWinner = (currBoard) => {
        const combination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < combination.length; i++) {
            const [a, b, c] = combination[i];
            if (currBoard[a] !== null && currBoard[a] === currBoard[b] && currBoard[a] === currBoard[c]) {
                return currBoard[a];
            }
        }
        return null;
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setVal(true);
        setWinner(null);
        if (scoreRef.current !== null) {
            scoreRef.current.style.display = "block";
        }
    };

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
            {winner && (
                <button className="btn" ref={scoreRef}>
                    {winner === "Draw" ? "It's a Draw!" : `${winner} is the winner of this Game`}
                </button>
            )}
            <button className="btn" onClick={handleReset}>Reset Board</button>
        </div>
    );
};

export default Tictac;
