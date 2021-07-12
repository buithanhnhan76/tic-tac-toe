// React for React.createElement()
import React from 'react';
// ReactDom for render
import ReactDOM from 'react-dom';
// reset css
import './reset.css';
// index.css for styles
import './index.css';


// represent each square on the screen, 9 square
function Square (props){
      return (
        <button className="square" 
        onClick={props.onClick}>
          {props.value}
          {/* X,O or null */}
        </button>
      );
}

  
  class Board extends React.Component {

    renderSquare(i) {
      return <Square value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />;
    }
  
    render() {
      return (
        // three rows of square, each row has three squares
          <div className="container mt-5">
            <h1>This Is A Caro Game !</h1>
            <div className="row">
              <div className="col">{this.renderSquare(0)}</div>
              <div className="col">{this.renderSquare(1)}</div>
              <div className="col">{this.renderSquare(2)}</div>
            </div>
            <div className="row">
              <div className="col">{this.renderSquare(3)}</div>
              <div className="col">{this.renderSquare(4)}</div>
              <div className="col">{this.renderSquare(5)}</div>
            </div>
            <div className="row">
              <div className="col">{this.renderSquare(6)}</div>
              <div className="col">{this.renderSquare(7)}</div>
              <div className="col">{this.renderSquare(8)}</div>
            </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        // first, history: [{squares:[null*9]}]
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length - 1 ];
      const squares = current.squares.slice();
      if(calculateWinner(squares) || squares[i]){
          return;
      };
      squares[i] = this.state.xIsNext ? 'X':'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,});
  };

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  };
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        console.log(move);
        const desc = move ? 
          'Go to move #' + move :
          'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          )
      });
      let status;
      if(winner){
        status = 'Winner; ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} 
            />
          </div>
          <div className="game-info">
            <div className="container">{status}
            <ol>{moves}</ol>
            </div>
          </div>
        </div>
      );
    }
  }

  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

  // Caculate winner: return x, y or null
  function calculateWinner (squares) {

    // win's case
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];


    for(let i = 1; i < lines.length;i++){
        // pick index a,b,c from each case
        const [a,b,c] = lines[i];

        // check if win
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        } 
    }
        return null;
};
  