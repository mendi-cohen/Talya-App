import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, Menu, Eye, EyeOff } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchResults from "./Components/SerchResults";
import ShopCart from "./Components/ShopCart";
import { useCart } from "./Contexts/CartContext";
import HeaderTitle from "./Components/HeaderTitle";

const GiftShopLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, updateItemsFromStorage } = useCart();
  const cartItemCount = items.length;
  const cartRef = useRef(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const correctPassword = `${process.env.REACT_APP_PASSWORD}`;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setErrorMessage("");
      setIsPasswordModalOpen(false);
      navigate("/dashboard");
    } else {
      setErrorMessage("סיסמא שגויה, נסה שוב.");
    }
  };

  useEffect(() => {
    updateItemsFromStorage();
  }, [location.pathname, cartOpen, updateItemsFromStorage]);

  useEffect(() => {
    window.addEventListener("storage", updateItemsFromStorage);
    return () => {
      window.removeEventListener("storage", updateItemsFromStorage);
    };
  }, [updateItemsFromStorage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setCartOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, isMenuOpen]);

  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  }, [searchTerm]);

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
      <header className="fixed top-0 w-full bg-white shadow-md z-10">
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

              {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">הכנס סיסמא</h2>
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="flex items-center mb-4">
                        <input
                          type={showPassword ? "text" : "password"} // להחליף בין טקסט לסיסמא
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border border-gray-300 px-4 py-2 rounded-md w-full"
                          placeholder="סיסמא"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)} // החלף את מצב הסיסמא
                          className="ml-2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-6 w-6 text-gray-500" />
                          ) : (
                            <Eye className="h-6 w-6 text-gray-500" />
                          )}
                        </button>
                      </div>
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                        >
                          אישור
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPasswordModalOpen(false)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          ביטול
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <button
                className="md:hidden text-gray-600 hover:text-[#3abcb1]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <li>
                  <button className="text-[#3abcb1] hover:text-[#a5b4fc] transition duration-300 text-lg font-medium flex items-center space-x-2"
                  onClick={() => navigate('/categorys')}>
                    <span>קטגוריות</span>
                  </button>
                </li>
                <li>
                  <button className="text-[#3abcb1] hover:text-[#a5b4fc] transition duration-300 text-lg font-medium flex items-center space-x-2">
                    <span>מבצעים</span>
                  </button>
                </li>
                <li>
                  <button className="text-[#3abcb1] hover:text-[#a5b4fc] transition duration-300 text-lg font-medium flex items-center space-x-2">
                    <span>צור קשר</span>
                  </button>
                </li>
              </ul>
            </nav>

            {/* Search and Cart */}
            {!isCartPage && (
              <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="חפש מתנות..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="border rounded-md px-4 py-2 w-full md:w-64 text-[#3abcb1] placeholder-[#a5b4fc] border-[#a5b4fc] focus:border-[#3abcb1] focus:ring-0"
                />
                <button
                  aria-label="חיפוש"
                  onClick={handleSearch}
                  className="text-[#3abcb1] hover:text-[#a5b4fc]"
                >
                  <Search className="h-6 w-6" />
                </button>

                <button
                  aria-label="סל קניות"
                  onClick={toggleCart}
                  className="relative text-[#3abcb1] hover:text-[#a5b4fc]"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <div
          dir="rtl"
          className={`fixed top-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${window.innerWidth > 768 ? "hidden" : ""}`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                className=" text-lg text-red-500 hover:text-red-800"
                onClick={() => setIsMenuOpen(false)}
              >
                סגור
              </button>
            </div>
            <ul className="space-y-4 flex flex-col items-center">
              <li>
                <button className="text-[#3abcb1] hover:text-[#a5b4fc]  transition duration-300 text-lg font-medium"
                 onClick={() => navigate('/categorys')}>
                  קטגוריות
                </button>
              </li>
              <li>
                <button className="text-[#3abcb1] hover:text-[#a5b4fc] transition duration-300 text-lg font-medium">
                  מבצעים
                </button>
              </li>
              <li>
                <button className= "text-[#3abcb1] hover:text-[#a5b4fc] transition duration-300 text-lg font-medium">
                  צור קשר
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 bg-blue-500  text-white rounded-md"
                >
                  כניסת מנהל
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {!showSearchResults &&location.pathname === "/" &&
        <HeaderTitle />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {showSearchResults ? (
          <SearchResults searchTerm={searchTerm} />
        ) : (
          <Outlet />
        )}
      </main>

      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
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
      <footer dir="rtl" className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-right">
            <div>
              <h3 className="text-xl font-semibold mb-4">אודותינו</h3>
              <p> אנחנו מספקים מתנות מקוריות ויצירתיות לכל אירוע ולכל אדם  </p>
              <p> אצלנו לא תשלם לפני שהמתנה אצלך ביד ותהיה מרוצה! </p>
            </div>
        
            <div>
              <h3 className="text-xl font-semibold mb-4">צור קשר</h3>
              <p>דוא"ל: info@originalgifts.co.il</p>
              <p>טלפון: 03-1234567</p>
              <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    כניסת מנהל
                  </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 טליה-דיזיין. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GiftShopLayout;
