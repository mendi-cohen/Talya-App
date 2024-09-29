import React, { createContext, useContext, useEffect, useState } from 'react';

// צור קונטקסט להזמנות
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderCount, setOrderCount] = useState(0); // ספירת הזמנות
  const [selectedOrder, setSelectedOrder] = useState(null); // הזמנה נבחרת
  const [searchTerm, setSearchTerm] = useState(''); // טקסט חיפוש

  // פונקציה לטעינת ההזמנות
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST_API}/orders/getAllNewOrders`);
      const data = await response.json();
      setOrders(data.Orders);
      setOrderCount(data.Orders.length); // עדכון ספירת ההזמנות
    } catch (err) {
      setError("שגיאה בטעינת ההזמנות");
    } finally {
      setLoading(false);
    }
  };
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setOrderCount((prevCount) => prevCount + 1); // עדכון ספירת ההזמנות
  };

  useEffect(() => {
    fetchOrders(); // טען את ההזמנות כשחלה עלייה בקומפוננטה
  }, []);

  const updateOrderStatus = async () => {
    if (!selectedOrder) return; // ודא שיש הזמנה נבחרת
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST_API}/orders/updateOrderStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedOrder.id,
            completed: true,
          }),
        }
      );

      if (response.ok) {
        fetchOrders(); // עדכן את הרשימה לאחר עדכון הסטטוס
      } else {
        console.error("שגיאה בעדכון הסטטוס");
      }
    } catch (error) {
      console.error("שגיאה בביצוע הבקשה:", error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.name.includes(searchTerm) || order.id.toString().includes(searchTerm)
  );

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      error,
      orderCount,
      selectedOrder,
      setSelectedOrder,
      searchTerm,
      setSearchTerm,
      fetchOrders,
      updateOrderStatus,
      addOrder,
      filteredOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
