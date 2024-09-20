// ShopCart.js
import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import GiftItem from './GiftItem';

const ShopCart = () => {
  const { items, updateItemsFromStorage, removeFromCart } = useCart();

  useEffect(() => {
    updateItemsFromStorage();
  }, [updateItemsFromStorage]);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      {items.length === 0 ? (
        <p className="text-center text-gray-600">העגלה ריקה</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {items.map((item, index) => (
            <GiftItem
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              buttonText="הסר מהעגלה"
              removeItem={() => removeFromCart(item.name)}
            />
          ))}
        </div>
      )}
      <p className="text-center mt-4 text-lg font-bold">
        סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default ShopCart;
