// Navbar.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Menu, X, Search, ShoppingBagIcon, HeartIcon, SearchCheckIcon, SearchCode, SearchSlash, FileSearchIcon, ShoppingBasketIcon, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Favorite from "./Favorite";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { TbShoppingBagX } from "react-icons/tb";

function Navbar({
  onOpenAuth,
  onOpenCart,
  onCheckout,
  cartItemCount,
  favoriteItemCount,
  favoriteItems = [],
  onAddToCart,
  onBuyNow,
  onRemoveFavorite,
  isAuthenticated,
  onLogout,
  products = [],
}) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesModalOpen, setFavoritesOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const navigate = useNavigate();

  // Handle Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Search results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const handleLabelClick = (label) => {
    setMobileMenuOpen(false);
    switch (label) {
      case "Men":
        navigate("/men");
        break;
      case "Women":
        navigate("/women");
        break;
      case "UniSex":
        navigate("/unisex");
        break;
      case "Checkout":
        onCheckout?.();
        break;
      case "Cart":
        onOpenCart?.();
        break;
      case "Favorites":
        setFavoritesOpen(true);
        break;
      case "Sign In":
        onOpenAuth?.();
        break;
      case "Sign Out":
        onLogout?.();
        navigate("/");
        break;
      default:
        break;
    }
  };

  const navLabels = useMemo(
    () => [
      "Men",
      "Women",
      "UniSex",
      "Checkout",
      isAuthenticated ? "Sign Out" : "Sign In",
    ],
    [isAuthenticated]
  );

  const megaDropdowns = {
     Men: {
      Tops: ["T-Shirts", "Hoodies", "Jackets", "Vests"],
      Bottoms: ["Jeans", "Shorts", "Sweatpants"],
      Accessories: ["Bags", "Hats", "Socks"],
      Footwear: ["Sneakers", "Slides", "Boots", "socks", "Sandals"],
      Shoes: ["Beanies", "Baseball Caps", "Bucket Hats"],
      Gpparel: ["Hoodies", "T-Shirts", "Joggers"],
      Jccessories: ["Caps", "Bags", "Socks"],
      Pats: ["Beanies", "Baseball Caps", "Bucket Hats"],
    },
    Women: {
      Tops: ["Tops", "Blouses", "Sweaters"],
      Bottoms: ["Jeans", "Skirts", "Leggings"],
      Accessories: ["Bags", "Hats", "Scarves"],
      Footwear: ["Sneakers", "Slides", "Boots", "Heels", "Flats", "Socks", "Sandals"],
      Shoes: ["Beanies", "Baseball Caps", "Bucket Hats"],
      Gpparel: ["Hoodies", "T-Shirts", "Joggers"],
      Jccessories: ["Caps", "Bags", "Socks"],
      Pats: ["Beanies", "Baseball Caps", "Bucket Hats"],
    },
    UniSex: {
      Footwear: ["Sneakers", "Slides", "Boots", "socks"],
      Apparel: ["Hoodies", "T-Shirts", "Joggers"],
      Accessories: ["Caps", "Bags", "Socks"],
      Shoes: ["Beanies", "Baseball Caps", "Bucket Hats"],
      Gpparel: ["Hoodies", "T-Shirts", "Joggers"],
      Jccessories: ["Caps", "Bags", "Socks"],
      Pats: ["Beanies", "Baseball Caps", "Bucket Hats"],
    },
  };

  const getQty = (productId) => quantities[productId] || 1;
  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, getQty(productId) + delta),
    }));
  };
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <header className="w-full flex items-center justify-between px-4 py-3 shadow-md">
          <div className="flex items-center gap-2">
            <img
              src="/shopping-bag.png"
              alt="logo"
              className="w-10 h-10 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1
              className="hidden md:block font-bold text-2xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              Indomitable Boutique
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-2 relative">
            {navLabels.map((label) => (
              <div key={label} className="relative" onMouseEnter={() => setHoveredDropdown(label)} onMouseLeave={() => setHoveredDropdown(null)}>
                <button
                  onClick={() => handleLabelClick(label)}
                  className="font-medium text-[15px] px-4 py-2 cursor-pointer hover:border-b-2 border-black transition-all duration-100"
                >
                  {label}
                </button>

                <AnimatePresence>
                  {["Men", "Women", "UniSex"].includes(label) && hoveredDropdown === label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="fixed top-[var(--nav-height)] left-0 w-full bg-white border-t border-gray-100 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] z-50"
                    >
                      <div className="max-w-screen-xl mx-auto grid grid-cols-7 gap-12 px-12 py-10">
                        {Object.entries(megaDropdowns[label]).map(([category, items]) => (
                          <div key={category} className="flex flex-col">
                            <h3 className="font-semibold text-gray-900 mb-4 text-base tracking-tight">{category}</h3>
                            <ul className="flex flex-col space-y-2">
                              {items.map((item) => (
                                <li
                                  key={`${category}-${item}`}
                                  className="text-gray-500 hover:text-black text-md transition-colors duration-200 cursor-pointer"
                                  onClick={() => {
                                    const section = label.toLowerCase();
                                    const categorySlug = item.toLowerCase().replace(/\s+/g, "-");
                                    navigate(`/${section}/${categorySlug}`);
                                    setHoveredDropdown(null);
                                  }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="flex md:hidden items-center gap-2 p-2 bg-black-10 rounded-full cursor-pointer" onClick={() => setShowSearch(true)}>
              <Search className="text-black" size={20} />
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full w-56 cursor-text hover:bg-gray-300" onClick={() => setShowSearch(true)}>
              <BiSearch className="text-gray-500" size={22} />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black placeholder-gray-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => setFavoritesOpen(true)} className="relative p-2 rounded-full hover:bg-gray-200">
              <HeartIcon className="text-black hover:text-black" size={22} />
              {favoriteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{favoriteItemCount}</span>
              )}
            </button>

            <button onClick={onOpenCart} className="relative p-2 rounded-full hover:bg-gray-200">
              <ShoppingBag className="text-black hover:text-black" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>
              )}
            </button>
            
            <div className="flex md:hidden items-center gap-2">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">{mobileMenuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow px-4 py-4 space-y-3">
            {navLabels.map((label) => (
              <button
                key={label}
                onClick={() => handleLabelClick(label)}
                className="block w-full text-left font-semibold px-3 py-2 hover:bg-gray-100"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setFavoritesOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-200"
            >
              <HeartIcon className="text-black hover:text-black" size={24} />
              {favoriteItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favoriteItemCount}
                </span>
              )}
            </button>
            <button onClick={onOpenCart} className="relative p-2 rounded-full hover:bg-gray-200">
              <ShoppingBagIcon className="text-black hover:text-black" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex max-w-md mx-auto w-full mb-4">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 border rounded-l-full outline-none"
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-black text-white rounded-r-full"
                >
                  Cancel
                </button>
              </div>

              <div className="max-w-md mx-auto space-y-4 overflow-y-auto max-h-[70vh]">
                {filteredResults.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">KES {item.price}</p>
                      </div>
                    </div>

                    {item.sizes?.length > 0 && (
                      <select
                        value={selectedSizes[item.id] || ""}
                        onChange={(e) => handleSizeSelect(item.id, e.target.value)}
                        className="px-3 py-1 border rounded-lg w-full"
                      >
                        <option value="" disabled>Select Size</option>
                        {item.sizes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}

                    <div className="flex items-center border border-black rounded-lg overflow-hidden w-32">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >−</button>
                      <span className="px-4">{getQty(item.id)}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >+</button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onAddToCart({
                            ...item,
                            size: selectedSizes[item.id] || null,
                            quantity: getQty(item.id),
                          })
                        }
                        className="flex-1 py-1 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() =>
                          onBuyNow({
                            ...item,
                            size: selectedSizes[item.id] || null,
                            quantity: getQty(item.id),
                          })
                        }
                        className="flex-1 py-1 border border-black rounded-xl hover:bg-black hover:text-white transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Favorites Modal */}
      <Favorite
        open={favoritesModalOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onRemoveFavorite={onRemoveFavorite}
      />
    </>
  );
}

export default Navbar;
