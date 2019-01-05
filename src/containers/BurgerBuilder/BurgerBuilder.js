import React, { Component } from 'react';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_BASE_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.8,
    meat: 1.2
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        isOrderNowButtonClicked: false,
        loading: false,
        error: false,
        renderModal: null
    }

    componentDidMount(){
        axios.get( 'https://burger-builder-react-699d5.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            })
            .catch( error => {
                this.setState( { error: true } );
            } );
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
        this.setState({
            loading: true
        })

        const ordersData = {
            ingredients: this.state.ingredients,
            customer: {
                name: "Martina",
                age: 27
            },
            priceToPay: this.state.totalPrice
        }
        axios.post("/orders.json", ordersData)
            .then(response => {
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderOrLoader = null;
        let burger = this.state.error ? <p>Ingredients, can not be loaded!</p> : <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredient}
                    ingredientRemoved = {this.removeIngredient} 
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    disableOrderButton={this.state.purchasable}
                    ordered={this.handleOrderNowBtnClicking}/>
                </Auxiliary>
            )
            orderOrLoader = <OrderSummary 
                ingredients={this.state.ingredients}
                cancel={this.removeBackdropHandler} 
                continue={this.handleContinueButton}
                totalPrice={this.state.totalPrice.toFixed(2)}
            />;
        }

        if(this.state.loading){
            orderOrLoader = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.isOrderNowButtonClicked} removeBackdrop={this.removeBackdropHandler}>
                    {orderOrLoader}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
