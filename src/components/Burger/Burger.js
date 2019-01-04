import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {

    let length = 0;
    let transformedIngredients = Object.keys(props.ingredients).map((currentIngredient, index) => {

        length += props.ingredients[currentIngredient];

        return [...Array(props.ingredients[currentIngredient])].map((emptySpot, index) => {
            return <BurgerIngredients type={currentIngredient} key={currentIngredient + index} />;
        });
    });

    if (length === 0) {
        transformedIngredients = <p>Please, add me some ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="burger-top" />
            {transformedIngredients}
            <BurgerIngredients type="burger-bottom" />
        </div>
    );
};

export default Burger;