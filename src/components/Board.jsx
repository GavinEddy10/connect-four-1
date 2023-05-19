import React, { useState, useEffect } from "react";
import { Slot } from "./Slot";


export const Board = () => {
    // 6 rows, 7 columns
    // Could have done with a nested for loop but this way is more visual
    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]);
    const COLUMNS = 7;
    const ROWS = 6;
    const [currPlayer, setCurrPlayer] = useState('X');
    const [oppPlayer, setOppPlayer] = useState('O');
    const [gameOver, setGameOver] = useState(false);


    
    const validCol = (col) => {
        return col >= 0 && col < COLUMNS;
    }
    const validRow = (row) => {
        return row >= 0 && row < ROWS;
    }

    const checkWinVert = (row,column,ch) => {
        if (validRow(row+1) && board[row + 1][column] === ch) {
            if (validRow(row+2) && board[row + 2][column] === ch) {
                if (validRow(row+3) && board[row + 3][column] === ch) {
                    return true;
                }
            }
        }
    }

    const checkWinDLtR = (row, column, ch) => {
        //all diagonal solutions upper left to bot right
       
        if (validRow(row+1) && validCol(column+1) && board[row + 1][column + 1] === ch) {
            if (validRow(row+2) && validCol(column+2) && board[row + 2][column + 2] === ch) {
                if (validRow(row+3) && validCol(column+3) && board[row + 3][column + 3] === ch) {
                    return true;
                }
            }
        }
    
        if (validRow(row-1) && validCol(column-1) && board[row - 1][column - 1] === ch) {
            if (validRow(row+1) && validCol(column+1) && board[row + 1][column + 1] === ch) {
                if (validRow(row+2) && validCol(column+2) && board[row + 2][column + 2] === ch) {
                    return true;
                }
            }
        }
    
        if (validRow(row-2) && validCol(column-2) && board[row - 2][column - 2] === ch) {
            if (validRow(row-1) && validCol(column-1) && board[row - 1][column - 1] === ch) {
                if (validRow(row+1) && validCol(column+1) && board[row + 1][column + 1] === ch) {
                    return true;
                }
            }
        }
    
        if (validRow(row-2) && validCol(column-2) && board[row - 2][column - 2] === ch) {
            if (validRow(row-1) && validCol(column-1) && board[row - 1][column - 1] === ch) {
                if (validRow(row-3) && validCol(column-3) && board[row - 3][column - 3] === ch) {
                    return true;
                }
            }
        }
    }

    const checkWinDBLtR = (row, column, ch) => {
        //all diagonal from bot let to upper right
        
        if (validRow(row+1) && validCol(column-1) && board[row + 1][column - 1] === ch) {
            if (validRow(row+2) && validCol(column-2) && board[row + 2][column - 2] === ch) {
                if (validRow(row+3) && validCol(column-3) && board[row + 3][column - 3] === ch) {
                    return true;
                }
            }
        }
   
        if (validRow(row-1) && validCol(column+1) && board[row - 1][column + 1] === ch) {
            if (validRow(row+1) && validCol(column-1) && board[row + 1][column - 1] === ch) {
                if (validRow(row+2) && validCol(column-2) && board[row + 2][column - 2] === ch) {
                    return true;
                }
            }
        }
  
    
        if (validRow(row+1) && validCol(column-1) && board[row + 1][column - 1] === ch) {
            if (validRow(row-1) && validCol(column+1) && board[row - 1][column + 1] === ch) {
                if (validRow(row-2) && validCol(column+2) && board[row - 2][column + 2] === ch) {
                    return true;
                }
            }
        }
    
    
        if (validRow(row-1) && validCol(column+1) && board[row - 1][column + 1] === ch) {
            if (validRow(row-2) && validCol(column+2) && board[row - 2][column + 2] === ch) {
                if (validRow(row-3) && validCol(column+3) && board[row - 3][column + 3] === ch) {
                    return true;
                }
            }
        }
    
    }

    const checkWinHorizontal = (row, column, ch) => {//finds left most point, then checks all four
        //all horizontal possibilities
        board[row][column] = ch;//important
        for (var i = 0; i < 4; i++) {//gets farthest left spot
            if (validCol(column-1) &&  board[row][column-1] === ch)
                column -= 1;
            else 
                break;
        }
        if (currentSpot === board[row][column+1] && board[row][column+1] === board[row][column+2] && board[row][column+2] === board[row][column+3])
            return true;
        return false;
       
    }


    const checkWin = (row, column, ch) => {
        return (
            checkWinDBLtR(row, column, ch) ||
            checkWinDLtR(row, column, ch) ||
            checkWinHorizontal(row, column, ch) ||
            checkWinVert(row, column, ch)
        )
    };

    const updateBoard = (row, column, ch) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        return checkWin(row, column, ch);
    };



    const handleClick = (e) => {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            // Find the first row that is occupied or at the bottom of the board
            return (rowArr[column] !== '' || (index === board.length - 1));
        });
        // Only go up one row if the slot is NOT at the bottom
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '') row -= 1;




        setGameOver(updateBoard(row, column, currPlayer));


        if (!gameOver) {
            // Swap players
            const currPlayerCopy = currPlayer;
            setCurrPlayer(oppPlayer);
            setOppPlayer(currPlayerCopy);
        }

    };



    //<button id='newGame' onClick={gameOver ? makeNewGame(): null}> New Game </button>
    return (
        <>
            {gameOver && (
                <h1>Game Over! {oppPlayer === 'X' ? 'Red' : 'Black'} Wins!</h1>
            )}
            <h2 id='playerDisplay'>{currPlayer === 'X' ? 'Red' : 'Black'} Move</h2>
            
            <div id='board'
                onClick={gameOver ? null : handleClick}
            >
                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} />);
                })}
            </div>
        </>
    );
};