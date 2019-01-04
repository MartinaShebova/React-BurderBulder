import React from 'react';
import Logo from './../../Logo/Logo';
import NavigationItemsWrapper from './../NavigationItemsWrapper/NavigationItemsWrapper';
import ToggleDrawer from './../SideDrawer/ToggleDrawer/ToggleDrawer';
import classes from './Toolbar.css';
    
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleDrawer openDrawer={props.openSideDrawer}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItemsWrapper />
        </nav>
    </header>
);
    
export default toolbar;