import React, { Component } from 'react';
import Auxiliary from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {

    state = {
        sideDrawserVisibility: false
    }

    closeSideDrawer = () => {
        this.setState({
            sideDrawserVisibility: false
        });
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                sideDrawserVisibility: !prevState.sideDrawserVisibility
            }
        })
    }

    render(){
        return (
            <Auxiliary>
                <Toolbar openSideDrawer={this.openSideDrawerHandler}/>
                <SideDrawer closed={this.closeSideDrawer} open={this.state.sideDrawserVisibility} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
};

export default Layout;