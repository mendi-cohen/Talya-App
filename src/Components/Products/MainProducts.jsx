import React, { useState } from "react";
import { useGifts } from "../../Contexts/GiftsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsForAdmin = () => {
  const { gifts, loading, error, retryFetch } = useGifts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "",
  });
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  const alert = (type) =>
    toast.success(` ${type} בהצלחה`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
      category: product.category,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: null,
      category: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, ProName) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את ${ProName}?`)) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HOST_API}/products/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("המוצר נמחק");
          retryFetch();
        } else {
          throw new Error("נכשל במחיקת המוצר");
        }
      } catch (error) {
        console.error("שגיאה במחיקת המוצר:", error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      selectedProducts.size === 0 ||
      !window.confirm("האם אתה בטוח שברצונך למחוק את המוצרים שנבחרו?")
    ) {
      return;
    }

    try {
      const deletePromises = Array.from(selectedProducts).map((id) =>
        fetch(`${process.env.REACT_APP_HOST_API}/products/${id}`, {
          method: "DELETE",
        })
      );

      const results = await Promise.all(deletePromises);
      const allDeleted = results.every((res) => res.ok);

      if (allDeleted) {
        retryFetch();
        alert("המוצרים נמחקו");
      } else {
        throw new Error("נכשל במחיקת המוצרים");
      }
    } catch (error) {
      console.error("שגיאה במחיקת המוצרים:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    formDataToSend.append("category", formData.category);

    const url = currentProduct
      ? `${process.env.REACT_APP_HOST_API}/products/${currentProduct.id}`
      : `${process.env.REACT_APP_HOST_API}/products/addOne`;

    const method = currentProduct ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      if (response.ok) {
        currentProduct ? alert(" המוצר עודכן ") : alert("המוצר נוסף");
        setIsModalOpen(false);
        retryFetch();
      } else {
        const errorResponse = await response.json();
        console.error("שגיאה בשמירת המוצר:", errorResponse);
        throw new Error("נכשל בשמירת המוצר: " + errorResponse.error);
      }
    } catch (error) {
      console.error("שגיאה בשמירת המוצר:", error);
    }
  };

  if (loading) return <div className="text-center mt-8">טוען...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">שגיאה: {error}</div>;

  return (
    <div className="mt-28 mb-5 container mx-auto px-4">
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        הוסף מוצר חדש
      </button>
      <button
        onClick={handleBulkDelete}
        className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        מחק מוצרים שנבחרו
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200 rounded-t-lg">
            <tr>
              <th className="py-4 px-6 border-b text-left">בחר</th>
              <th className="py-4 px-6 border-b text-left">שם</th>
              <th className="py-4 px-6 border-b text-left">מחיר</th>
              <th className="py-4 px-6 border-b text-left">תיאור</th>
              <th className="py-4 px-6 border-b text-left">קטגוריה</th>
              <th className="py-4 px-6 border-b text-left">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(gift.id)}
                    onChange={() => handleCheckboxChange(gift.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="py-3 px-6 border-b ">{gift.name}</td>
                <td className="py-3 px-6 border-b">{gift.price}</td>
                <td className="py-3 px-6 border-b">{gift.description}</td>
                <td className="py-3 px-6 border-b">{gift.category}</td>
                <td className="py-3 px-6 border-b ">
                  <button
                    onClick={() => handleEdit(gift)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                  >
                    ערוך
                  </button>
                  <button
                    onClick={() => handleDelete(gift.id, gift.name)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div dir ='rtl' className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentProduct ? "ערוך מוצר" : "הוסף מוצר חדש"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  שם המוצר
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  מחיר
                </label>
                <input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  תיאור
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  קטגוריה
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    בחר קטגוריה
                  </option>
                  <option value="לגבר"> לגבר </option>
                  <option value="לאישה"> לאישה </option>
                  <option value="לבית"> לבית </option>
                  <option value="לחצר"> לחצר </option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  תמונה
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  שמור
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsForAdmin;
