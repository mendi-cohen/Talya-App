import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';
import { useGifts } from './GiftsContext';
import { ClipLoader } from 'react-spinners'; // או כל גלגל אחר שתבחר

const GiftArray = () => {
  const { gifts } = useGifts();
  const [sortOption, setSortOption] = useState('default'); // default sorting
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    // סימולציה של טעינה (אם יש צורך בטעינה ממשית)
    const timer = setTimeout(() => setLoading(false), 1000); // 1000ms = 1s
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
