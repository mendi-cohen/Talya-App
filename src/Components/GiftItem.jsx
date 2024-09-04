import React from 'react';
import { Gift, Eye } from 'lucide-react';

const GiftItem = ({ name, description, price, image, buttonText, Details,removeItem }) => {
  function AddToCart() {
    const currentItems = JSON.parse(localStorage.getItem('items')) || [];
    const itemIndex = currentItems.findIndex(item => item.name === name);
    
    if (itemIndex > -1) {
      return;
    } else {

      const newItem = { name, description, price, image };
      currentItems.push(newItem);
      localStorage.setItem('items', JSON.stringify(currentItems));
    }
  }



  const handleClick = () => {
    if (buttonText === "הוסף לסל") {
      AddToCart();
    } else {
      removeItem();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-600">₪{price.toFixed(2)}</span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center" onClick={Details}>
            <Eye className="h-5 w-5 mr-2" />
            לפרטים על המוצר
          </button>
          <button onClick= {handleClick} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;