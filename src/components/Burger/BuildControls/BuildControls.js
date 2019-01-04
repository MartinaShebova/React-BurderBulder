import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './../BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'}
];
    
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((currentControl, index) => {
            return <BuildControl 
                        key={currentControl + index} 
                        label={currentControl.label}
                        added={() => props.ingredientAdded(currentControl.type)}
                        removed={() => props.ingredientRemoved(currentControl.type)} 
                        disabled={props.disabled[currentControl.type]} />
        })}
        <button className={classes.OrderButton} 
                disabled={!props.disableOrderButton}
                onClick={props.ordered}>ORDER NOW</button>
    </div>
);
    
export default buildControls;