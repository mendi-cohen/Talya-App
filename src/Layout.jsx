import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import SearchResults from "./Components/SerchResults";
import ShopCart from './Components/ShopCart';
import { useCart } from './Components/CartContext';

const GiftShopLayout = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, updateItemsFromStorage } = useCart(); 
  const cartItemCount = items.length;

  useEffect(() => {
    updateItemsFromStorage(); 
  }, [location.pathname, cartOpen, updateItemsFromStorage]);

  useEffect(() => {
    window.addEventListener("storage", updateItemsFromStorage);
    return () => {
      window.removeEventListener("storage", updateItemsFromStorage);
    };
  }, [updateItemsFromStorage]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setShowSearchResults(false);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const isCartPage = location.pathname === "/shopcart";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo and Menu Button */}
            <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-[#3abcb1]"
                style={{
                  textShadow:
                    "1px 1px 0 #e0e7ff, 2px 2px 0 #c7d2fe, 3px 3px 0 #a5b4fc",
                }}
              >
                טליה -דיזיין
              </h1>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="תפריט"
              >
                <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
              </button>
            </div>

              {/* Navigation */}
              <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <li>
                  <button className="text-gray-600 hover:text-purple-600">
                    קטגוריות
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-purple-600">
                    מבצעים
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-purple-600">
                    צור קשר
                  </button>
                </li>
              </ul>
            </nav>

            {/* Search and Cart */}
            {!isCartPage && (
              <div className="flex items-center space-x-2 w-full md:w-auto mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="חפש מתנות..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="border rounded-md px-2 py-1 w-full"
                />
                <button aria-label="חיפוש" onClick={handleSearch}>
                  <Search className="h-6 w-6 text-gray-600 cursor-pointer" />
                </button>

                <button
                  aria-label="סל קניות"
                  onClick={toggleCart}
                  className="relative"
                >
                  <ShoppingCart 
                  className="h-6 w-6 text-gray-600 cursor-pointer" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs 
                    rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            )}

          
          </div>
        </div>
      </header>

      <div className="w-full h-[800px] bg-cover bg-center mb-8" 
     style={{ backgroundImage: `url('../Images/i1.jpeg')` }}>
</div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {showSearchResults ? (
          <SearchResults searchTerm={searchTerm} />
        ) : (
          <Outlet />
        )}
      </main>

      <div
  className={`fixed top-0 right-0 h-full w-85 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
    cartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-4 overflow-y-auto h-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">סל הקניות שלך</h2>
      <button
        className="text-gray-500 hover:font-bold text-red-500 text-xl"
        onClick={toggleCart}
      >
        סגור
      </button>
    </div>
    <ShopCart />
  </div>
</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-right">
            <div>
              <h3 className="text-xl font-semibold mb-4">אודותינו</h3>
              <p>אנחנו מספקים מתנות מקוריות ויצירתיות לכל אירוע ולכל אדם.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">קישורים מהירים</h3>
              <ul className="space-y-2">
                <li>
                  <button className="hover:text-purple-400">תקנון</button>
                </li>
                <li>
                  <button className="hover:text-purple-400">מדיניות פרטיות</button>
                </li>
                <li>
                  <button className="hover:text-purple-400">שאלות נפוצות</button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">צור קשר</h3>
              <p>דוא"ל: info@originalgifts.co.il</p>
              <p>טלפון: 03-1234567</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 מתנות מקוריות. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GiftShopLayout;
