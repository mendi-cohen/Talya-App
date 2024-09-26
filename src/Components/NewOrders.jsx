import React, { useState } from "react";
import Modal from "react-modal";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOrderContext } from '../Contexts/OrderContext'; 

const OrdersForAdmin = () => {
  const {
    loading,
    error,
    selectedOrder,
    setSelectedOrder,
    searchTerm,
    setSearchTerm,
    updateOrderStatus,
    filteredOrders
  } = useOrderContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderConfirmed = () => {
    updateOrderStatus();
    handleCloseModal();
  };

  const handleOrderCancelled = () => {
    handleCloseModal();
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>טוען הזמנות...</p>;
  }

  const totalEarnings = filteredOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  return (
    <div dir="rtl" className="container mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">רשימת הזמנות</h2>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="חפש לפי שם או מספר הזמנה"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order,orderIndex) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleOpenModal(order )}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                הזמנה מספר: {order.id}
              </h3>
              <div className="text-gray-700">
                <p className="mb-2">
                  <span className="font-bold">שם:</span> {order.name}
                </p>
                <p className="mb-2">
                  <span className="font-bold">אימייל:</span> {order.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">כתובת:</span> {order.address}
                </p>
                <p className="mb-2">
                  <span className="font-bold">טלפון:</span> {order.phone}
                </p>
                <p className="mb-2">
                  <span className="font-bold">סכום כולל:</span> ₪{order.totalPrice}
                </p>
                <p className="mb-2">
                  <span className="font-bold">תאריך יצירת הזמנה:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 max-h-60 overflow-y-auto">
                    <h3 className="font-semibold text-xl mb-2 text-blue-500">פרטי ההזמנה:</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
                        <p className="text-blue-500 text-lg">שם הפריט: {item.name}</p>
                        <p className="text-blue-500 text-lg">מחיר: ₪{item.price}</p>
                        <p className="text-blue-500 text-lg">כמות: {item.quantity}</p>
                        <img src={`${process.env.REACT_APP_HOST_API}${item.image}`} alt={item.name} className="w-full h-auto mt-2 rounded-md" />
                      
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-semibold">אין הזמנות להצגה</p>
        )}
      </div>

      {/* דיאלוג */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">בחר פעולה</h2>
          <p>מה תרצה לעשות עם ההזמנה מספר {selectedOrder?.id}?</p>
          <div className="mt-4">
            <button
              onClick={handleOrderConfirmed}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              הזמנה בוצעה
            </button>
            <button
              onClick={handleOrderCancelled}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              בטל
            </button>
          </div>
        </div>
      </Modal>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-center">
          שווי כל ההזמנות כרגע הוא: ₪{totalEarnings}
        </h3>
      </div>
    </div>
  );
};

export default OrdersForAdmin;
