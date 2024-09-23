import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';
import { useGifts } from './GiftsContext';
import { ClipLoader } from 'react-spinners'; 

const GiftArray = () => {
  const { gifts } = useGifts();
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedGifts = [...gifts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="border rounded p-2"
        >
          <option value="default">סנן לפי:</option>
          <option value="price-asc">מחיר - נמוך לגבוה</option>
          <option value="price-desc">מחיר - גבוה לנמוך</option>
          <option value="latest"> המוצרים החדשים ביותר </option>
          <option value="alphabetical">סדר אלפביתי</option>
        </select>
      </div>

     
      {loading ? (
     <div className="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md p-4">
     <ClipLoader size={50} color="#000" />
     <p className="mt-4 text-lg text-gray-700 font-semibold">
        ...תיכף יטענו המתנות
     </p>
   </div>
      ) : (
        
        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedGifts.map((gift) => (
            <GiftItem
              key={gift.id}
              name={gift.name}
              description={gift.description}
              price={gift.price}
              image={gift.image}
              buttonText="הוסף לעגלה"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftArray;
