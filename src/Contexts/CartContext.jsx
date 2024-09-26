import React, { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const updateItemsFromStorage = useCallback(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const clearCart = () => {
    setItems([]); 
    localStorage.setItem('items', JSON.stringify([])); 
  };

  const addToCart = (item) => {
    const currentItems = [...items];
    const itemIndex = currentItems.findIndex(i => i.name === item.name);

    if (itemIndex > -1) {
      toast.warning(`!המוצר נמצא כבר בעגלה כנס ובחר כמות`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    } else {
      const newItems = [...currentItems, item];
      localStorage.setItem('items', JSON.stringify(newItems));
      setItems(newItems);
      toast.success(`! המוצר נוסף לעגלה`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const removeFromCart = (itemName) => {
    const updatedItems = items.filter(item => item.name !== itemName);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateItemsFromStorage ,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
