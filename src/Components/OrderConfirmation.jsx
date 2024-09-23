import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderConfirmation = ({ totalPrice, items, onClose ,clearCart}) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  onClose();
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST_API}/orders/addNewOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customerDetails.name,
        email: customerDetails.email,
        address: customerDetails.address,
        phone: customerDetails.phone,
        items: items,
        totalPrice: totalPrice,
      }),
    });

    if (!response.ok) {
       toast.error(` אופס! אירעה תקלה נסה שוב`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
      throw new Error('Network response was not ok');
      
    }

    const data = await response.json();
    console.log('Response from server:', data);
    onClose();
    toast.info(` ההזמנה נשלחה בהצלחה ניצור איתך קשר בהקדם למשלוח `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    clearCart();
  } catch (error) {
    console.error('Error sending order:', error);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };



  return (

<motion.div
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  initial={{ opacity: 0, x: "100%" }}
  animate={{ opacity: 1, x: "0%" }}
  exit={{ opacity: 0, x: "100%" }}
>
  <div dir='rtl' className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
    <button 
      onClick={onClose} 
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
      aria-label="סגור טופס"
    >
      <X size={28} />
    </button>
    <h2 className="text-2xl font-bold mb-6 text-center mt-4">אישור הזמנה</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">פרטי לקוח</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute top-3 right-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleChange}
                  required
                  placeholder="שם מלא"
                  className="border rounded-lg w-full px-4 py-2 pr-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute top-3 right-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleChange}
                  required
                  placeholder="אימייל"
                  className="border rounded-lg w-full px-4 py-2 pr-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute top-3 right-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="address"
                  value={customerDetails.address}
                  onChange={handleChange}
                  required
                  placeholder="כתובת"
                  className="border rounded-lg w-full px-4 py-2 pr-10"
                />
              </div>
              <div className="relative">
                <Phone className="absolute top-3 right-3 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={customerDetails.phone}
                  onChange={handleChange}
                  required
                  placeholder="טלפון"
                  className="border rounded-lg w-full px-4 py-2 pr-10"
                />
              </div>
              <button
                type="submit"
                className="bg-[#3abcb1] text-white px-6 py-3 rounded-lg hover:bg-[#2e9d94] transition w-full"
              >
                אישור הזמנה
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">פרטי ההזמנה</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>₪{item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200 font-semibold flex justify-between">
                <span>סה"כ לתשלום:</span>
                <span>₪{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;