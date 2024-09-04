import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useNavigate , Outlet, useLocation } from "react-router-dom";
import SearchResults from './Components/SerchResults';


const GiftShopLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (location.pathname === '/shopcart') {
      setSearchTerm('');
      setShowSearchResults(false);
    }
  }, [location.pathname]);

  const handleNavigate = () => {
    navigate('/shopcart');
  };

  const handleSearch = () => {
    if(searchTerm !== ''){
    setShowSearchResults(true);

    }
    else{
      setShowSearchResults(false);
    }
  };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setShowSearchResults(false); 
    }
  };
  const isCartPage = location.pathname === '/shopcart';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="md:hidden" aria-label="תפריט">
              <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
            </button>
            <h1 className="text-4xl md:text-4xl font-extrabold text-purple-600"
              style={{ textShadow: '2px 2px 0 #e0e7ff, 4px 4px 0 #c7d2fe, 6px 6px 0 #a5b4fc' }}>
              מתנות מקוריות
            </h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <button className="text-gray-600 hover:text-purple-600">קטגוריות</button>
            <button className="text-gray-600 hover:text-purple-600">מבצעים</button>
            <button className="text-gray-600 hover:text-purple-600">צור קשר</button>
          </nav>
          <div className="flex items-center space-x-4">
          {!isCartPage && ( // הוסף תנאי כדי להסתיר את שדה החיפוש בדף העגלה
              <>
                <input
                  type="text"
                  placeholder="חפש מתנות..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className="border rounded-md px-2 py-1"
                />
                <button aria-label="חיפוש" onClick={handleSearch}>
                  <Search className="h-6 w-6 text-gray-600 cursor-pointer" />
                </button>
          
            <button aria-label="סל קניות" onClick={handleNavigate}>
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
            </button>
            </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showSearchResults ? (
          <SearchResults searchTerm={searchTerm} /> 
        ) : (
          <Outlet/>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">אודותינו</h3>
              <p>אנחנו מספקים מתנות מקוריות ויצירתיות לכל אירוע ולכל אדם.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">קישורים מהירים</h3>
              <ul className="space-y-2">
                <li><button className="hover:text-purple-400">תקנון</button></li>
                <li><button className="hover:text-purple-400">מדיניות פרטיות</button></li>
                <li><button className="hover:text-purple-400">שאלות נפוצות</button></li>
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
      </footer>
    </div>
  );
};

export default GiftShopLayout;