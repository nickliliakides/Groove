import React, { useState, useEffect } from "react";
import UserLayout from "../../hoc/user";
import { connect } from "react-redux";
import { getBasketItems, removeFromBasket, onSuccessPurchase } from "../../store/actions/userActions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import CartBlock from "./cartBlock";
import Paypal from "../shared/paypal";

const UserCart = props => {
  const [state, setState] = useState({
    loading: true,
    total: 0,
    success: false,
    amount: false
  });

  const { user } = props;
  const { cart } = user.userData;

  useEffect(() => {
    let cartItems = [];

    if (cart && cart.length > 0) {
      cart.forEach(item => {
        cartItems.push(item.id);
      });
    
    props.dispatch(getBasketItems(cartItems, cart)).then(res => {
      if (res.payload.length > 0) {
        calculateTotal(res.payload);
      }
    });
  }
  }, []);

  const removeFromCart = id => {
    props.dispatch(removeFromBasket(id)).then(res => {
      if(res.payload.cartData.length === 0){
        setState({
          ...state,
          amount: false
        })
      } else {
        calculateTotal(res.payload.cartData)
      }
    });
  };

  const calculateTotal = data => {
    let total = 0;

    data.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setState({
      ...state,
      total,
      amount: true
    });
  };

  const handleTransactionError = data => {
    window.alert('Transaction error. Please try agin later.');
  }

  const handleTransactionCanceled = data => {
    window.alert('Transaction cancelled.')
  }

  const handleTransactionSuccess = data => {
    props.dispatch(onSuccessPurchase({
      cartData: props.user.cartData,
      paymentData: data
    })).then((res) => {
      if(res.payload.success){
        setState({
          ...state,
          amount: false,
          success: true
        })
      }
    })
  }

  return (
    <UserLayout>
      <div>
        <h1>My Basket</h1>
        <div className="user_cart">
          <CartBlock
            products={props.user}
            type="cart"
            removeItem={id => removeFromCart(id)}
          />
          { state.amount ?
            <div className="user_cart_sum">
              <div>Total Amount: £ {state.total}</div>
            </div> : state.success ?
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>Thank you for your order!<br/> You will shortly receive a confirmation email.</div>
              </div>
            :
            <div className="cart_no_items">
              <FontAwesomeIcon icon={faFrown} />
              <div>There are no items in your basket.</div>
            </div>
          }
        </div>
        {
          state.amount && 
          <div className="paypal_button_container">
            <Paypal
              toPay={state.total}
              transactionError={data => handleTransactionError(data)}
              transactionCanceled={data => handleTransactionCanceled(data)}
              onSuccess={data => handleTransactionSuccess(data)}
            />
          </div>
        }
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
