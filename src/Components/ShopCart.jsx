import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';

const ShopCart = () => {
  const [items, setItems] = useState([]);

  const updateItemsFromStorage = () => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  };

  useEffect(() => {
    updateItemsFromStorage();
  }, []);

  const removeFromCart = (itemName) => {
    const currentItems = JSON.parse(localStorage.getItem('items')) || [];
    const updatedItems = currentItems.filter(item => item.name !== itemName);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    // עדכון ה-state
    updateItemsFromStorage();
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <h1 className="bg-purple-400 text-white text-center flex justify-center items-center">
        עגלת הקניות שלך פה!
      </h1>
      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-600">העגלה ריקה</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <GiftItem
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                buttonText= "הסר מהעגלה" 
                removeItem={() => removeFromCart(item.name)}
              />
            ))}
          </div>
        )}
        <p className="text-center mt-4 text-lg font-bold">
          סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default ShopCart;