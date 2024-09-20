import React from 'react';
import GiftItem from './GiftItem';
import { useGifts } from './GiftsContext'; // ייבוא הפונקציה שמחברת לקונטקסט

const GiftArray = () => {
  const { gifts } = useGifts(); // קבלת המתנות מתוך הקונטקסט

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {gifts.map((gift) => (
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
  );
}

export default GiftArray;
