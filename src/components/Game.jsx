import React, { useState } from 'react';
import '../Game.css'

const imgXUrl = './public/exercise-4/x.png';
const imgChestUrl = './public/exercise-4/chest.png';
const imgSkullUrl = './public/exercise-4/skull.png';

function Game() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [treasureRow, setTreasureRow] = useState(0);
  const [treasureColumn, setTreasureColumn] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState([]);

  const handleStartGame = () => {
    const rowsInput = parseInt(prompt('Enter number of rows you want to play with:'));
    const columnsInput = parseInt(prompt('Enter number of columns you want to play with:'));

    if (rowsInput && columnsInput) {
      setRows(rowsInput);
      setColumns(columnsInput);

      const treasureRowPosition = Math.floor(Math.random() * rowsInput);
      const treasureColumnPosition = Math.floor(Math.random() * columnsInput);

      setTreasureRow(treasureRowPosition);
      setTreasureColumn(treasureColumnPosition);
      setAttempts(0);
      setGameOver(false);

      const newBoard = [];
      for (let i = 0; i < rowsInput; i++) {
        const row = [];
        for (let j = 0; j < columnsInput; j++) {
          row.push(imgXUrl);
        }
        newBoard.push(row);
      }
      setBoard(newBoard);
    }
  };

  const handleCellClick = (rowIndex, columnIndex) => {
    if (!gameOver) {
      setAttempts(prevAttempts => prevAttempts + 1);
      if (rowIndex === treasureRow && columnIndex === treasureColumn) {
        setGameOver(true);
        const updatedBoard = [...board];
        updatedBoard[rowIndex][columnIndex] = imgChestUrl;
        setBoard(updatedBoard);
      } else {
        const updatedBoard = [...board];
        updatedBoard[rowIndex][columnIndex] = imgSkullUrl;
        setBoard(updatedBoard);
      }
    }
  };

  return (
    <div className="Game">
      <h1>Attempts: <span>{attempts}</span></h1>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex} onClick={() => handleCellClick(rowIndex, columnIndex)}>
                  <img src={cell} alt="Cell" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default Game;
