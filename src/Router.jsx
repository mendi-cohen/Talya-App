import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import GiftShopLayout from './Layout';
import ShopCart from './Components/ShopCart';
import ProductArray from './Components/Products/ProductsArray';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products/MainProducts';
import NewOrders from './Components/Orders/NewOrders';
import ComletedOrders from './Components/Orders/CompletedOrders';
import MainOrders from './Components/Orders/MainOrders';
import MainCategorys from './Components/Products/MainCategorys';
import ScrollToTop from './Components/Products/ScrollToTop';


const MyRouter = () => {
  return (
   
      <Router>
         
      <ScrollToTop />
    
        <Routes>
          <Route path="/" element={<GiftShopLayout />}>
            <Route index element={<ProductArray />} /> 
            <Route path="/shopcart" element={<ShopCart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/orders" element={<MainOrders />} />
            <Route path="/dashboard/orders/new_orders" element={<NewOrders />} />
            <Route path="/dashboard/orders/comleted_orders" element={<ComletedOrders />} />
            <Route path="/categorys" element={<MainCategorys />} />
            <Route path="/categorys/man" element={<ProductArray category={"לגבר"} />} />
            <Route path="/categorys/waman" element={<ProductArray  category={"לאישה"} />} />
            <Route path="/categorys/house" element={<ProductArray  category={"לבית"} />} />
            <Route path="/categorys/garden" element={<ProductArray  category={"לגינה"} />} />
          </Route>
        </Routes>
      </Router>

  );
}

export default MyRouter;
