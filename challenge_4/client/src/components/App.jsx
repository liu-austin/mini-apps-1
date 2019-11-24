// jshint esversion:6
import React from 'react';
import GameBoard from './gameboard.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: 
            [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]],
            player: 1,
            win: false
        };
        this.addPiece = this.addPiece.bind(this);
        this.checkRow = this.checkRow.bind(this);
    }

    checkRow() {
        let streak;
        let color = -1 * this.state.player;
        let done = false;
        for (let i = 5; i > - 1; i--) {
            streak = 0;
            if (done) {
                return;
            }
            for (let j = 0; j < this.state.rows[i].length; j++) {
                if (this.state.rows[i][j] === color) {
                    streak += 1;
                    if (streak === 4) {
                        this.setState({win: true});
                        done = true;
                        break;
                    }
                } else {
                    streak = 0;
                }
            }
        }
        this.checkColumn();
    }

    checkColumn() {
        let streak;
        let color = -1 * this.state.player;
        let done = false;
        for (let i = 6; i > - 1; i--) {
            streak = 0;
            if (done) {
                return;
            }
            for (let j = 0; j < this.state.rows.length; j++) {
                if (this.state.rows[j][i] === color) {
                    streak += 1;
                    if (streak === 4) {
                        this.setState({win: true});
                        done = true;
                        break;
                    }
                } else {
                    streak = 0;
                }
            }
        }
        this.checkDiagonal();
    }

    checkDiagonal() {
        let streak;
        let color = -this.state.player;
        let done = false;
        for (let i = -5; i < 7; i++) {
            streak = 0;
            if (done) {
                return;
            }
            for (let j = 0; j < 6; j++) {
                if (this.state.rows[j][j + i] !== undefined) {
                    if (this.state.rows[j][j + i] === color) {
                        streak += 1;
                        if (streak === 4) {
                            this.setState({win: true});
                            done = true;
                            break;
                        }
                    } else {
                        streak = 0;
                    }
                }
            }
        }
        for (let i = -6; i < 5; i++) {
            streak = 0;
            if (done) {
                return;
            }
            for (let j = 0; j < 7; j++) {
                if (this.state.rows[i + j] !== undefined) {
                    if (this.state.rows[i + j][6 - j] !== undefined) {
                        if (this.state.rows[i + j][6 - j] === color) {
                            streak += 1;
                            if (streak === 4) {
                                this.setState({win: true});
                                done = true;
                                break;
                            }
                        } else {
                            streak = 0;
                        }
                    }
                }
            }
        }
    }

    addPiece(col, player) {
        if (this.state.win) {
            this.setState({win: false}, () => this.setState({rows: [[0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0]]}));
        }

        let boardState = this.state.rows;
        
        for (let i = 5; i > -1; i--) {
            if (!boardState[i][col -1]) {
                boardState[i][col -1] = player;
                break;
            }
        }
        this.setState({row: boardState, player: -1 * this.state.player}, () => this.checkRow());
    }

    componentDidMount() {

    }

    render() {
        let winner = this.state.player === -1 ? 'RED' : 'BLACK';
        let currentPlayer = this.state.player ===  1 ? 'RED' : 'BLACK';
        return (
            <div className='app'>
                <h1 className='title'>CONNECT FOUR</h1>
                <h1>{`CURRENT PLAYER: ${currentPlayer}`}</h1>
                <GameBoard player={this.state.player} addPiece={this.addPiece} rows={this.state.rows}/>
                {
                    this.state.win ? 
                    (
                        <h1>{`${winner} WINS !`}</h1>
                    ) 
                    : 
                    (
                        null
                    )
                }
            </div>
        );
    }
}

export default App;
