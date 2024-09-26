import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../Contexts/OrderContext';

const MainOrders = () => {
  const navigate = useNavigate();
  const { orderCount } = useOrderContext(); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8"> ניהול ההזמנות </h1>
      <div className="space-y-4 w-full max-w-xs"> {/* גבול לרוחב הכפתורים */}
        <button 
          className="relative w-full h-12 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          onClick={() => navigate('/new_orders')}
        >
          {orderCount > 0 && (
            <span className="bg-red-500 text-white text-lg rounded-full px-3 py-1 mr-3"> {/* השתנה מ-ml ל-mr */}
              {orderCount}
            </span>
          )}
          הזמנות חדשות
        </button>
        <button
          className="relative w-full h-12 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          onClick={() => navigate('/comleted_orders')}
        >
          הסטוריית הזמנות 
        </button>
      </div>
    </div>
  );
};

export default MainOrders;
