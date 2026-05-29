import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total items dynamically for the header icon badge
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600", cost: "$15", description: "Produces oxygen at night and cleans the air." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=600", cost: "$12", description: "Incredibly resilient and filters indoor toxins." }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=600", cost: "$18", description: "Calming scent that helps reduce stress." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1603507403362-e1cbfa13bcbb?q=80&w=600", cost: "$10", description: "Fresh aromatic leaves, perfect for home teas." }
      ]
    },
    {
      category: "Medicinal",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=600", cost: "$14", description: "Soothes burns and skin irritations naturally." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=600", cost: "$22", description: "Helps clear respiratory pathways with fresh scents." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => window.location.reload()}>Paradise Nursery</div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)}>Plants</span>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-badge">{totalCartQuantity}</span>
          </div>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((cat, index) => (
            <div key={index} className="category-section">
              <h2>{cat.category}</h2>
              <div className="products-list">
                {cat.plants.map((plant, pIndex) => {
                  const isInCart = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={pIndex} className="product-card">
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="price">{plant.cost}</p>
                      <button 
                        disabled={isInCart} 
                        onClick={() => handleAddToCart(plant)}
                        className="add-to-cart-btn"
                      >
                        {isInCart ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;