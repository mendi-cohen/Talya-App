import React from 'react';
import { Gift, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GiftItem = ({ name, description, price, image, buttonText, Details, removeItem }) => {
  function AddToCart() {
    const currentItems = JSON.parse(localStorage.getItem('items')) || [];
    const itemIndex = currentItems.findIndex(item => item.name === name);

    if (itemIndex > -1) {
      return;
    } else {
      toast.success(`! המוצר נוסף לעגלה`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const newItem = { name, description, price, image };
      currentItems.push(newItem);
      localStorage.setItem('items', JSON.stringify(currentItems));
    }
  }

  const handleClick = () => {
    if (buttonText === "הוסף לעגלה") {
      AddToCart();
    } else {
      removeItem();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 flex flex-col h-full">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-lg font-bold text-purple-600 mb-2 sm:mb-0">₪{price.toFixed(2)}</span>
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            <button className="bg-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base" onClick={Details}>
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              לפרטים
            </button>
            <button onClick={handleClick} className="bg-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;