import { useState } from "react"


const TURNS = {
    X: 'x',
    O: 'o'
}



const Square = ({ children, isSelected, updateBoard, index }) => {
    const className= `square ${isSelected ? 'is-selected':''}`
    const handleClick = ()=>{
        updateBoard(index)
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS=[
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

const App = () => {

    
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkWiner = (boardToCheck)=>{
        // Revisamos todas las combinaciones ganadoras
        // Para ver si X u O ganó
        for (const combo of WINNER_COMBOS){
            const [a,b,c]= combo
            if (
                boardToCheck[a]&& // 0 -> x u o
                boardToCheck[a]=== boardToCheck[b]&& 
                boardToCheck[a]=== boardToCheck[c]
            ) {
                return boardToCheck[a]
            }
        }
        return null
    }

    const resetGame =()=>{
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    const checkEndGame =(newBoard)=>{
        // revisamos si hay un empate
        // Si no hay más espacios vacíos (null)
        // en el tablero
        return newBoard.every((square)=> square !== null)
    }

    const updateBoard = (index)=>{
        // No actualizamos esta posicion
        // Si ya tiene algo
        if (board[index] || winner) return
        // Actualizar tablero
        const newBoard =[...board]
        newBoard[index]= turn
        setBoard(newBoard)
        // Cambiar el turno
        const newTurn = turn===TURNS.X?TURNS.O:TURNS.X;
        setTurn(newTurn)
        // Revisar si hay un ganador
        const newWinner = checkWiner(newBoard)
        if (newWinner) {
            setWinner(newWinner)
            //? Esto imprime en console log el ganador y el previo (null)
            // setWinner((prevWinner)=>{
            //     console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
            //     return newWinner
            // })
        } else if(checkEndGame(newBoard)) {
            setWinner(false) // Empate
        }
    }


    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reset del juego</button>
            <section className="game">
                {
                    board.map((square, index) => {
                        return (
                            < Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                                {/* Es lo mismo que arriba */}
                                {/* {square} */}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn=== TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn=== TURNS.O }>{TURNS.O}</Square>
            </section>
            
                {
                    winner!== null && (
                        <section className="winner">
                            <div className="text">
                                <h2>
                                    {
                                        winner === false ? 'Empate' : 'Ganó: '
                                    }
                                </h2>
                                <header className="win">
                                    {winner && <Square>{winner} </Square>}
                                </header>
                                <footer>
                                    <button onClick={resetGame}>
                                        Empezar de nuevo
                                    </button>
                                </footer>
                            </div>
                        </section>
                    )
                }
        </main>
    )
}

export default App