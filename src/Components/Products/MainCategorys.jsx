import React from 'react';
import { useNavigate } from 'react-router-dom';
import RingImage from '../../Images/Ring.jpeg';
import garden from '../../Images/garden.jpeg';
import WachImage from '../../Images/Wach.jpeg';
import House from '../../Images/House.jpeg';

// קומפוננטת כפתור לקטגוריה
const CategoryButton = ({ title, imageSrc, route ,size}) => {
  const navigate = useNavigate();

  return (
    <button
      className="relative w-full h-72 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out mb-4 hover:scale-105"
      onClick={() => navigate(route)}
      style={{ backgroundColor: '#f0f0f0' }} 
    >
      <img 
        src={imageSrc} 
        alt={title} 
        className={`w-full h-full object-${size} opacity-80 hover:opacity-100 transition-opacity duration-600 ease-in-out`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
        <span className="text-white text-xl font-bold">{title}</span>
      </div>
    </button>
  );
};

// קומפוננטת הדף הראשי
const MainCategorys = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4 mt-28 md:mt-0">
      <h1 className="text-3xl font-bold mb-8">בחר קטגוריה</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <CategoryButton 
          title="לאישה" 
          imageSrc={RingImage}
          route="/categorys/waman"
          size='top'

        />
        <CategoryButton 
          title="לגבר" 
          imageSrc={WachImage} 
          route="/categorys/man"
          size='top' 
        />
        <CategoryButton 
          title="לבית" 
          imageSrc={House} 
          route="/categorys/house"
          size='top' 
        />
        <CategoryButton 
          title="לחצר" 
          imageSrc={garden} 
          route="/categorys/garden"
          size='cover' 
        />
      </div>
    </div>
  );
};

export default MainCategorys;
