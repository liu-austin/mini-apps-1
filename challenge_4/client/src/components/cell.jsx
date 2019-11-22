// jshint esversion:6
import React from 'react';
import RedPiece from './redpiece.jsx';
import BlackPiece from './blackpiece.jsx';
import NullPiece from './nullpiece.jsx';

const Cell = (props) => {
    const placePiece = () => {
        props.addPiece(props.column, props.player);
    };

    let piece;
    if (props.piece === 1) {
        piece = <RedPiece />;
    } else if (props.piece === -1) {
        piece = <BlackPiece />;
    } else {
        piece = <NullPiece />;
    }
    return (
        <div onClick={placePiece} className='cell'>
        {
            piece
        }
        </div>
    );
};

export default Cell;