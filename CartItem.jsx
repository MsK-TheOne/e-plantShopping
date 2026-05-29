import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const priceNumeric = parseFloat(item.cost.replace('$', ''));
      return total + (priceNumeric * item.quantity);
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const calculateTotalCost = (item) => {
    const priceNumeric = parseFloat(item.cost.replace('$', ''));
    return priceNumeric * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div className="cart-item-card" key={index}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-buttons">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;