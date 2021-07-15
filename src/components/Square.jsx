import React from 'react';

// square received value and onCLick from props.
const Square = (props) => {
    return ( 
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
     );
}
 
export default Square;