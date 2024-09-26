import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import GiftShopLayout from './Layout';
import ShopCart from './Components/ShopCart';
import GiftArray from './Components/GiftsArray';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products';


const MyRouter = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<GiftShopLayout />}>
            <Route index element={<GiftArray />} /> 
            <Route path="/shopcart" element={<ShopCart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </Router>

  );
}

export default MyRouter;
