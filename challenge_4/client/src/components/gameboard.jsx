// jshint esversion:6
import React from 'react';
import GameRow from './gamerow.jsx';

const GameBoard = (props) => {
    return (
        <div className='gameboard-container'>
            {
                props.rows.length ? 
                (
                    props.rows.map((row, i) => {
                        return (
                            <GameRow player={props.player} addPiece={props.addPiece} row={row} key={i} rowIndex={i + 1}/>
                        );
                    })
                ) 
                : 
                (
                    null
                )
            }
        </div>
    );
};

export default GameBoard;