// jshint esversion:6
import React from 'react';
import Cell from './cell.jsx';

const GameRow = (props) => {
    return (
        <div className='row-container'>
        {
            props.row.length ? 
            (
                props.row.map((cell, i) => {
                    return (
                        <Cell player={props.player} addPiece={props.addPiece} piece={cell} column={i + 1} row={props.rowIndex} key={i}/>
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

export default GameRow;