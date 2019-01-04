import React from 'react';
import classes from './SingleNavItem.css';
    
const singleNavItem = (props) => (
    <li className={classes.SingleNavItem}>
        <a href={props.link} className={props.isActive ? classes.active : null}>
            {props.children}
        </a>
    </li>
);
    
export default singleNavItem;