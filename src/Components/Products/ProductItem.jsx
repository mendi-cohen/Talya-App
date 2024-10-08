import React, { useState } from "react";
import { Gift, Eye, EyeOff, Delete } from "lucide-react";
import { useCart } from "../../Contexts/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GiftItem = ({
  name,
  description,
  price,
  image,
  quantity,
  buttonText,
  removeItem,
  caegory,
}) => {
  const { addToCart, removeFromCart } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity || 1);
  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    if (buttonText === "הוסף לעגלה") {
      if (localQuantity > 0) {
        addToCart({ name, description, price, image, quantity: localQuantity });
      } else {
        toast.error("! כמות לא חוקית", {
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
      {image ? (
        <img
          src={`${process.env.REACT_APP_HOST_API}${image}`}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
          <span className="text-gray-600">תמונה לא זמינה</span>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 dir="rtl" className="text-xl font-semibold mb-2">
          {name}
        </h3>

        {showDescription && (
          <div dir="rtl" className="bg-gray-100 border rounded-lg p-4 mt-2">
            <h4 className="font-semibold">תיאור:</h4>
            <p dir="rtl" className="text-gray-600">
              {description}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {buttonText !== "הוסף לעגלה" ? (
            <span className="text-lg font-bold text-[#3abcb1] mb-2 sm:mb-0">
              ₪{price.toFixed(2)} * {localQuantity}
            </span>
          ) : (
            <span className="text-lg font-bold text-[#3abcb1] mb-2 sm:mb-0">
              ₪{price.toFixed(2)}
            </span>
          )}
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            {buttonText === "הוסף לעגלה" && (
              <>
                <span className="mx-4 text-gray-700 flex items-center justify-center">
                  כמות
                </span>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setLocalQuantity(Math.max(1, localQuantity - 1))
                    }
                    className="bg-gray-300 border border-gray-400 rounded-l-full px-3 py-2 text-gray-700 hover:bg-gray-400 transition duration-300 flex items-center justify-center"
                  >
                    -
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
                    +
                  </button>
                </div>

                <button
                  className="bg-[#e0d7b5] text-black px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? (
                    <EyeOff className="h-10 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  ) : (
                    <Eye className="h-10 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  )}
                  {showDescription ? "הסתר פרטים" : "פרטים"}
                </button>

                <button
                  onClick={handleClick}
                  className="h-10 bg-[#3abcb1] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  <Gift className="h-10 w-4 sm:h-10 sm:w-5 mr-1 sm:mr-2" />
                  {buttonText}
                </button>
              </>
            )}
            {buttonText === "הסר מהעגלה" && (
              <div className="mt-2 w-full">
                <button
                  onClick={removeItem}
                  className="bg-[#3abcb1] text-white w-full px-2 py-1 px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  <Delete className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-3" />
                  {buttonText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;
