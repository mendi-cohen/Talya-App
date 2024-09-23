// ShopCart.js
import React, { useEffect ,useState } from 'react';
import { useCart } from './CartContext';
import GiftItem from './GiftItem';
import OrderConfirmation from './OrderConfirmation';

const ShopCart = () => {
  const { items, updateItemsFromStorage, removeFromCart } = useCart();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  useEffect(() => {
    updateItemsFromStorage();
  }, [updateItemsFromStorage]);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      {items.length === 0 ? (
        <p className=" text-lg text-center text-gray-600">העגלה ריקה</p>
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
      {items.length> 0 && (
        <>
      <p className="text-center mt-8 text-lg font-bold">
        סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
      </p>

        <button
        onClick={() => setShowOrderConfirmation(true)}
        className="bg-[#e0d7b5] block mx-auto mt-16 bg-[#3abcb1] text-black px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        אישור הזמנה
      </button>
      </>
    )}
      
      {showOrderConfirmation && (
        <OrderConfirmation
          totalPrice={totalPrice}
          items={items}
          onClose={() => setShowOrderConfirmation(false)}
          clearCart={()=>items.forEach(item => removeFromCart(item.name))}
        />
      )}
    </div>
  );
};

export default ShopCart;
