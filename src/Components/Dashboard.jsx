import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">דשבורד ניהול חנות</h1>
      <div className="space-y-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => navigate('/orders')}
        >
          ניהול הזמנות
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
          onClick={() => navigate('/products')}
        >
          ניהול מוצרים
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
