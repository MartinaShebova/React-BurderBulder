import React, { Component } from 'react';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_BASE_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.8,
    meat: 1.2
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 3,
        purchasable: false,
        isOrderNowButtonClicked: false
    }

    updatePurchaseState = (currentIgredientsState) => {

        let count = 0;

        for (const currentIngredient in currentIgredientsState) {
            count += currentIgredientsState[currentIngredient];
        }

        this.setState({
            purchasable: count > 0
        });
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const shadowCopyIngredientsState = {
            ...this.state.ingredients
        }

        shadowCopyIngredientsState[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_BASE_PRICE[type];

        this.setState({
            ingredients: shadowCopyIngredientsState,
            totalPrice: newPrice
        });
        this.updatePurchaseState(shadowCopyIngredientsState);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const deductedCount = oldCount - 1;

        const shadowCopyIngredientsState = {
            ...this.state.ingredients
        }

        shadowCopyIngredientsState[type] = deductedCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_BASE_PRICE[type];

        this.setState({
            ingredients: shadowCopyIngredientsState,
            totalPrice: newPrice
        });

        this.updatePurchaseState(shadowCopyIngredientsState);
    }

    handleOrderNowBtnClicking = () => {
        this.setState({
            isOrderNowButtonClicked : true
        });
    }

    removeBackdropHandler = () => {
        this.setState({
            isOrderNowButtonClicked : false
        });
    }

    handleContinueButton = () => {
        alert("You have continued!");
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.isOrderNowButtonClicked} removeBackdrop={this.removeBackdropHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancel={this.removeBackdropHandler} 
                        continue={this.handleContinueButton}
                        totalPrice={this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredient}
                    ingredientRemoved = {this.removeIngredient} 
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    disableOrderButton={this.state.purchasable}
                    ordered={this.handleOrderNowBtnClicking}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
