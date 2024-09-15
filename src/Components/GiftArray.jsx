import React, { useState, useEffect } from 'react';
import GiftItem from './GiftItem';




let ExportGifts = [];

const GiftArray = () => {

  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
   
        const response = await fetch(`${process.env.REACT_APP_HOST_API}products/get_products`); 
        const data = await response.json();
        const giftsWithCorrectPrice = data.map(item => ({
          ...item,
          price: item.price ? parseFloat(item.price) : 0 ,
              }));
      
        
        setGifts(giftsWithCorrectPrice);
        console.log(giftsWithCorrectPrice);
        ExportGifts = giftsWithCorrectPrice
        setGifts(data);
      } catch (error) {
        console.error('Error fetching gifts:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchGifts();
  }, []); 

  if (loading) {
    return <div>טוען מתנות...</div>; 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((item) => (
            <GiftItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image_url={item.image_url}
              buttonText={"הוסף לעגלה"}
              
              
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export { ExportGifts }; 
export default GiftArray;