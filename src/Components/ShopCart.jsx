import React from 'react';
import PropTypes from 'prop-types';
import GiftItem from './GiftItm';

const ShopCart = ({ items ,onRemoveFromCart  }) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  
  return (
    <>
      <h1 className="bg-purple-400 text-white text-center flex justify-center items-center ">
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
              buttonText={"הסר מהסל"}
              AddToCartOrRemove={() => onRemoveFromCart(item)}
            />
          ))}
        </div>
             
        )}
        <p className="text-center">   סה"כ לתשלום :   {totalPrice}  </p>
      </div>
    </>
  );
};


ShopCart.propTypes = {
  items: PropTypes.array
};

export default ShopCart;
