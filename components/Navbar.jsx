import React, { useState, useEffect } from "react";
import {
  BellIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({
  onOpenAuth,
  onOpenNotifications,
  onOpenCart,
  onOpenUnisex,
  onOpenMen,
  onOpenWomen,
  onCheckout,
  cartItemCount,
  cartItems = [],
  isAuthenticated,
  onLogout,
  products = [],
  onAddToCart,
}) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const results = products.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
      setFilteredResults(results);
    }
  }, [searchQuery, products]);

  const handleLabelClick = (label) => {
    setMobileMenuOpen(false);
    switch (label) {
      case "Sign In":
        return onOpenAuth?.();
      case "Sign Out":
        onLogout?.();
        navigate("/"); 
        return;
      case "Cart":
        return onOpenCart?.();
      case "UniSex":
        return onOpenUnisex?.();
      case "Men":
        return onOpenMen?.();
      case "Women":
        return onOpenWomen?.();
      case "Checkout":
        return onCheckout?.(); 
      default:
        return;
    }
  };

  const navLabels = [
    "Men",
    "Women",
    "UniSex",
    "Checkout",
    isAuthenticated ? "Sign Out" : "Sign In",
  ];

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${ showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <header className="relative flex items-center justify-between bg-white shadow-md px-4 py-3 md:px-6">
        <div className="absolute left-1/3 transform -translate-x-1/2">
          <div className="flex items-center gap-6 text-[#800000] font-bold text-3xl font-serif tracking-wide">
            <img src="/logo.webp" alt="logo" className="w-8 h-8" />
            Mkurugenzi
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <nav className="hidden md:flex items-center gap-4">
            <button onClick={() => setShowSearch(!showSearch)} className="relative p-2 rounded-md text-[#800000] hover:bg-[#660000] hover:text-white transition">
              <SearchIcon className="w-6 h-6" />
            </button>

            <button onClick={onOpenNotifications} className="relative p-2 rounded-md text-[#800000] hover:bg-[#660000] hover:text-white transition">
              <BellIcon className="w-6 h-6" />
            </button>

            <button onClick={onOpenCart} className="relative p-2 rounded-md text-[#800000] hover:bg-[#660000] hover:text-white transition">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a80000] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {navLabels.map((label) => (
              <button key={label} onClick={() => handleLabelClick(label)}
                className="relative text-[#800000] font-serif px-3 py-2 rounded-md transition duration-300 font-semibold after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-[#800000] after:transition-all after:duration-500 hover:after:w-full">
                {label}
              </button>
            ))}
          </nav>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#800000]">
          {mobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </header>

      {showSearch && (
        <div className="flex justify-center bg-white border-t shadow-md px-6 py-4 relative z-50">
          <div className="w-[75%] max-w-md relative">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full font-serif border border-gray-300 rounded px-4 py-2"/>

            {filteredResults.length > 0 && (
              <div className="absolute w-full top-full left-0 bg-white shadow-lg border rounded mt-1 max-h-60 overflow-y-auto z-50">
                {filteredResults.map((item, index) => (
                  <div key={index} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    <div>
                      <p className="font-semibold font-serif text-[#800000]">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 font-serif">
                        KES {item.price}
                      </p>
                    </div>
                    <button onClick={() => onAddToCart(item)} className="px-3 py-1 text-sm bg-[#800000] text-white font-serif rounded hover:bg-[#660000]">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && filteredResults.length === 0 && (
              <div className="text-gray-500 font-serif text-sm mt-2">
                No products found.
              </div>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navLabels.map((label) => (
            <button key={label} onClick={() => handleLabelClick(label)} className="block w-full text-left text-[#800000] font-semibold py-2 border-b border-gray-200">
              {label}
            </button>
          ))}
          <div className="flex gap-4 mt-2">
            <button onClick={() => { onOpenNotifications?.(); setMobileMenuOpen(false);}} className="p-2 text-[#800000] hover:bg-[#660000] hover:text-white rounded">
              <BellIcon className="w-5 h-5" />
            </button>
            <button onClick={() => { onOpenCart?.(); setMobileMenuOpen(false);}} className="relative p-2 text-[#800000] hover:bg-[#660000] hover:text-white rounded">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#800000] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
