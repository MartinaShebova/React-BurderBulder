import React from 'react';
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary';
import Button from './../../UI/Button/Button';
    
const orderSummary = (props) => {

    const chosenIngredients = props.ingredients;
    let ingredients = "";

    for (const currentIngredient in chosenIngredients) {
        ingredients += `<li><span style="text-transform: capitalize;">${currentIngredient}</span> : ${chosenIngredients[currentIngredient]}</li>`;
    }

    return (
        <Auxiliary>
            <h3>Dear, client your order is:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul dangerouslySetInnerHTML={{ __html: ingredients }}></ul>
            <p><strong>Total price: {props.totalPrice}</strong></p>
            <Button btnType="Danger" btnClicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" btnClicked={props.continue}>CONTINUE</Button>
        </Auxiliary>
    )
};
    
export default orderSummary;