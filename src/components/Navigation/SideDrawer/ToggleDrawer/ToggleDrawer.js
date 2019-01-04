import React from 'react';
import classes from './ToggleDrawer.css';
    
const toggleDrawer = (props) => (
    <div className={classes.DrawerToggle} onClick={props.openDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
    
export default toggleDrawer;