import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import GiftShopLayout from './Layout';
import GiftArray from './Components/GiftArray';
import ShopCart from './Components/ShopCart';

const MyRouter = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    if (!cartItems.some(cartItem => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };
  const handleRemoveFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
    
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiftShopLayout />}>
        <Route index element={<GiftArray onAddToCart={handleAddToCart} />} />
        <Route path="/shopcart" element={<ShopCart items={cartItems}  onRemoveFromCart={handleRemoveFromCart} />}></Route>
        </Route>
     
      </Routes>
    </Router>
  );
}

export default MyRouter;
