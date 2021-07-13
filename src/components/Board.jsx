import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
    // like renderSquare(1)
    renderSquare(i){
        // received squares by props
        // raise an event with i when click
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}></Square>
    }
    render() { 
        return ( 
            <div>
                <div className="border-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="border-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="border-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
         );
    }
}
 
export default Board;