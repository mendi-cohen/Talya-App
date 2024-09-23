import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GiftsContext = createContext();

export const useGifts = () => useContext(GiftsContext);

export const GiftsProvider = ({ children }) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchGifts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST_API}/products/getAll`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      const giftsWithCorrectData = data.map(item => ({
        ...item,
        price: item.price ? parseFloat(item.price) : 0,
      }));
      
      setGifts(giftsWithCorrectData);
    } catch (error) {
      console.error('Error fetching gifts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);
  

  const retryFetch = () => {
    fetchGifts();
  };

  return (
    <GiftsContext.Provider value={{ gifts, loading, error, retryFetch }}>
      {console.log('Gifts context value:', { gifts, loading, error })}
      {children}
    </GiftsContext.Provider>
  );
};