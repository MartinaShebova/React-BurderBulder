import React from 'react';
import SingleNavItem from './../SingleNavItem/SingleNavItem';
import classes from './NavigationItemsWrapper.css';
    
const navigationItemsWrapper = (props) => (
    <ul className={classes.NavigationItemsWrapper}>
        <SingleNavItem link="/" isActive>Burger Builder</SingleNavItem>
        <SingleNavItem link="/">Checkout</SingleNavItem>
    </ul>
);
    
export default navigationItemsWrapper;