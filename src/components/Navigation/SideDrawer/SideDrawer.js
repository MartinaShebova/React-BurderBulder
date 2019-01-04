import React from 'react';
import Logo from './../../Logo/Logo';
import NavItems from './../NavigationItemsWrapper/NavigationItemsWrapper';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Auxiliary from './../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';
    
const sideDrawer = (props) => {
    
    let neededClasses = [classes.SideDrawer, classes.Close];
    
    if(props.open){
        neededClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} hideBackdrop={props.closed}/>
            <div className={neededClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Auxiliary>
    );
};
    
export default sideDrawer;