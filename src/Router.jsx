import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import GiftShopLayout from './Layout';
import GiftArray from './Components/GiftArray';
import ShopCart from './Components/ShopCart';






const MyRouter = () => {
  



  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiftShopLayout />}>
        <Route index element={<GiftArray  />} />
        <Route path="/shopcart" element={<ShopCart />}></Route>
        </Route>
     
      </Routes>

    </Router>
  );
}

export default MyRouter;
