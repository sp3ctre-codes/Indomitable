import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({
  onOpenAuth,
  onOpenCart,
  onCheckout,
  cartItemCount,
  cartItems = [],
  isAuthenticated,
  onOpenUnisex,
  onLogout,
  products = [],
  onAddToCart,
  onOpenMen,
  onOpenWomen,
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
      case "Checkout":
        return onCheckout?.();
      case "Men":
        return onOpenMen?.();
      case "Women":
        return onOpenWomen?.();
      case "UniSex":
        return onOpenUnisex?.();
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
    <div
      className={`fixed top-0 left-0 w-full z-30 bg-black/20 backdrop-blur-sm transition-transform duration-1000 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <header className="relative flex items-center justify-between shadow-md px-4 py-3 md:px-6">
        <div className="absolute left-[120px] lg:left-[350px] transform -translate-x-1/2">
          {/* <img src="/shopping-bag.png" alt="logo" className="w-10 h-10" /> */}
          <h1 className="text-gray-300 text-xl lg:text-2xl text-center font-bold text-foreground/90 text-md leading-relaxed mb-2">Indomitable Boutique</h1>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="relative p-2 rounded-md text-white hover:bg-teal-400 transition"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-md text-white hover:bg-teal-400 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {navLabels.map((label) => (
              <div
                key={label}
                className="relative group"
              >
                <button
                  onClick={() => handleLabelClick(label)}
                  className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold 
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full"
                >
                  {label}
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Search dropdown */}
      {showSearch && (
        <div className="flex justify-center bg-black/20 backdrop-blur-sm border-t shadow-md px-6 py-4 relative z-50">
          <div className="w-[75%] max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="lg:text-xl text-xl w-full border border-gray-300 rounded-md px-4 py-2 tracking-tight lg:my-5 my-2"
            />

            {filteredResults.length > 0 && (
              <div className="absolute w-full top-full left-0 bg-white shadow-lg border rounded mt-1 max-h-60 overflow-y-auto z-50">
                {filteredResults.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-semibold font-serif text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 font-serif">
                        KES {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1 text-sm bg-black text-white font-serif rounded hover:bg-gray-800"
                    >
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

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/20 backdrop-blur-sm shadow-md px-4 py-4 space-y-4">
          {navLabels.map((label) => (
            <div key={label}>
              <button
                onClick={() => handleLabelClick(label)}
                className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold 
                  after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full"
              >
                {label}
              </button>
            </div>
          ))}
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => {
                // onOpenNotifications?.();
                setMobileMenuOpen(false);
              }}
              className="p-2 text-white hover:bg-gray-200 rounded"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal/20 backdrop-blur-sm text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
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
