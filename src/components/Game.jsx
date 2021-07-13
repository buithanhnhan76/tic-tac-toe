import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    constructor(props){
        // constructor of parent
        super(props);
        this.state = {
            // xIsNext:false <=> OisNext
            xIsNext: true,
            // step in tic-tac-toe game, default is 0
            stepNumber: 0,
            // history is an array of object, object include squares which is an array
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }

    // jump to a step in the screen (back to previous move)
    jumpTo(step){
        this.setState({
            // step number is this step
            stepNumber: step,
            // if step % 2 === 0, it means that X's turn (ex: 0, 2, 4, 6, ...)
            xIsNext: (step % 2 === 0)
        })
    }


    handleClick = (i) => {
        // make a copy of this.state.history (this.state.stepNumber + 1 is because the last one'll not be included)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // current is the last of this.state.history array, which means [history.length -1] 
        const current = this.state.history[history.length - 1];
        // make a copy of current squares by slice squares in the current
        const squares = current.squares.slice();
        // if squares[i] already exists or already have a winner then stop
        if(calculateWinner(squares)||squares[i]) return null;
        // i is the index in the board, assign X or O to squares[i] (1 of 9 squares) by check this.state.xIsNext
        squares[i] = this.state.xIsNext ? "X": "O";
        this.setState({
            // concat the history in state with squares, then set state new history
            history: history.concat({
                squares: squares
            }),
            // if true, then false
            xIsNext: !this.state.xIsNext,
            // new step number by determine history.length
            stepNumber: history.length
        })
    }


    render() { 
        // make a copy of history
        const history = this.state.history;
        // current is history[this.state.stepNumber] because we can jump to step
        const current = history[this.state.stepNumber];
        // caculate winner by passing the current.squares to calculateWinner which is check each case where
        // the user can win, if there's winner it will return x or o
        const winner = calculateWinner(current.squares);
        // moves is a li (Go to step1 , go to step 2,..)
        // step is object in history and move is index
        const moves = history.map((step,move)=>{
            // if move is true, then print go to ..., otherwise print start the game ( move : 0 )
            const desc = move ? 'Go to #' + move : 'Start the game';
            return (
                <li key={move}>
                    {/* when you click, then jump to step */}
                    <button onClick={() => {this.jumpTo(move)}}>
                    {/* desc */}
                    {desc}
                    </button>
                </li>
            )
        });

        // status likes winner is || next player is ... 
        let status;
        // if we have winner
        if(winner)
            status = 'Winner is ' + winner;
        else 
        // not have winner
        {
            status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');  
            if(this.state.stepNumber >= 9)
                status = 'No one win the game';
        }
            return ( 
            <div className="game">
                <div className="game-board">
                    {/* receive i by props from board */}
                    <Board onClick={(i) => this.handleClick(i)}
                    // passing squares to board
                    squares={current.squares}></Board>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>
                        {/* then we call moves */}
                        {moves}
                    </ul>
                </div>
            </div>
         );
    }
}

function calculateWinner(squares){
    // cases which user can win
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // loop through each case
    for(let i = 0; i <lines.length; i++){
        // pick a,b,c frome lines (like 0,1,2)
        const [a,b,c] = lines[i];
        //(like squares[0] exists and squares[0] = squares[1] and squares[0] = squares[2])
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Game;

