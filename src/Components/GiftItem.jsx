// GiftItem.js
import React, { useState } from "react";
import { Gift, Eye, Delete } from "lucide-react";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GiftItem = ({
  name,
  description,
  price,
  image,
  quantity,
  buttonText,
  Details,
  removeItem,
}) => {
  const { addToCart, removeFromCart } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity || 1);
  
  const handleClick = () => {
    if (buttonText === "הוסף לעגלה") {
      if (localQuantity > 0) {
        addToCart({ name, description, price, image, quantity: localQuantity });
      } else {
        toast.error(`! כמות לא חוקית`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } else {
      removeFromCart(name);
    }

  
    
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 flex flex-col h-full">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {buttonText !== "הוסף לעגלה" ? <span className="text-lg font-bold text-[#3abcb1] mb-2 sm:mb-0">
            ₪{price.toFixed(2)} * {localQuantity}
          </span> : <span className="text-lg font-bold text-[#3abcb1] mb-2 sm:mb-0">
            ₪{price.toFixed(2)} 
          </span>}
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
         
            {buttonText === "הוסף לעגלה" && (
              <>
                    <span className="mx-4 text-gray-700 flex items-center justify-center"> כמות</span>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setLocalQuantity(Math.max(1, localQuantity - 1))
                    }
                    className="bg-gray-300 border border-gray-400 rounded-l-full px-3 py-2 text-gray-700 hover:bg-gray-400 transition duration-300 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={localQuantity}
                    onChange={(e) => setLocalQuantity(Number(e.target.value))}
                    className="border border-gray-400 rounded-none px-4 py-2 text-center w-16 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    style={{ fontSize: "1rem", color: "black" }}
                  />

                  <button
                    type="button"
                    onClick={() => setLocalQuantity(localQuantity + 1)}
                    className="bg-gray-300 border border-gray-400 rounded-r-full px-3 py-2 text-gray-700 hover:bg-gray-400 transition duration-300 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
                {buttonText !== "הסר מהעגלה" && (
              <button
                className="bg-[#e0d7b5] text-black px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                onClick={Details}
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                לפרטים
              </button>
            )}
                <button
                  onClick={handleClick}
                  className="bg-[#3abcb1] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  {buttonText}
                </button>
              </>
            )}
            {buttonText === "הסר מהעגלה" && (
              <button
                onClick={removeItem}
                className="bg-[#3abcb1] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                <Delete className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;
