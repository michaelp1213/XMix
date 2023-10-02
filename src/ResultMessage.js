import React from 'react'

function ResultMessage({ startNewGame, playerWon }) {
    return (
        <div className='showresult'>
            <h2 className='redmsg'>
                {
                    playerWon === "no" || playerWon === ""
                        ? 'Draw'
                        : '' 
                }
            </h2>
            {
                    playerWon === "no" || playerWon === ""
                        ?   <h3 className='drawmsg'>Nobody Won</h3> :
                        <h3 className='winmsg'> <font color="red">{playerWon}</font> Won the Game!</h3>  
            }
            <button onClick={startNewGame}>
                New Game
            </button>
        </div>
    )
}

export default ResultMessage
