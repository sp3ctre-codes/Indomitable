import React, { useState, useMemo } from "react";
import { ShareIcon, ShoppingBag, X, ChevronDown } from "lucide-react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Define your category groups outside the component to prevent re-renders
const CATEGORY_GROUPS = {
  Top: ["vest", "waistcoat", "sleeveless", "crop top", "tank", "hoodie", "sweatshirt", "jacket", "coat", "flannel", "shirt", "t-shirt"],
  footwear: ["airforce", "sneakers", "boots", "sandals", "trainers", "officials"],
  pants: ["boxers", "Khaki", "jeans", "shorts"],
  others: ["accessories", "hats", "socks"],
};

export default function CategoryPage({ title, products = [], onAddToFavorites, favorites = [] }) {
  const navigate = useNavigate();
  const [sortCategory, setSortCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(true);

  // FIX: This now correctly filters the products and IS READ by the JSX below
  const sortedProducts = useMemo(() => {
    if (sortCategory === "all") return products;
    const categoriesToMatch = CATEGORY_GROUPS[sortCategory] || [];
    return products.filter((product) =>
      product.category && categoriesToMatch.includes(product.category.toLowerCase())
    );
  }, [products, sortCategory]);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-16">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* --- NIKE STYLE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sticky top-20 bg-white z-20 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
              {title} 
              <span className="text-gray-400 font-normal not-italic ml-2">
                ({sortedProducts.length})
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex items-center gap-2 font-medium hover:text-gray-500 transition text-[15px]"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

            <div className="relative group">
              <select
                value={sortCategory}
                onChange={(e) => setSortCategory(e.target.value)}
                className="appearance-none bg-transparent pr-8 outline-none font-bold uppercase tracking-tight text-sm cursor-pointer hover:text-gray-500"
              >
                <option value="all">Sort By: All</option>
                <option value="Top">Top</option>
                <option value="footwear">Footwear</option>
                <option value="pants">Pants</option>
                <option value="others">Others</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* --- SIDEBAR FILTERS (NIKE LOOK) --- */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden lg:block overflow-hidden sticky top-48 h-fit"
              >
                <div className="space-y-8 pr-10">
                  <div className="border-b pb-6">
                    <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Shop By Category</h4>
                    <ul className="space-y-3 text-[15px] font-medium">
                      {Object.keys(CATEGORY_GROUPS).map((cat) => (
                        <li 
                          key={cat} 
                          onClick={() => setSortCategory(cat)}
                          className={`cursor-pointer capitalize hover:text-gray-400 ${sortCategory === cat ? 'text-black underline' : 'text-gray-600'}`}
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* --- PRODUCT GRID --- */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-12">
              {sortedProducts.map((product) => {
                const isFavorited = favorites.some((item) => item.id === product.id);

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group flex flex-col"
                  >
                    {/* IMAGE AREA */}
                    <div 
                      className="relative aspect-[4/5] bg-[#f6f6f6] overflow-hidden mb-4"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                      
                      {/* Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToFavorites(product);
                        }}
                        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <motion.div key={isFavorited ? "liked" : "unliked"} animate={isFavorited ? { scale: [1, 1.4, 1] } : { scale: 1 }}>
                          {isFavorited ? <HeartSolid className="w-5 h-5 text-red-500" /> : <HeartOutline className="w-5 h-5" />}
                        </motion.div>
                      </button>

                      {/* Quick Add Slide-up */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* TEXT AREA */}
                    <div className="flex flex-col space-y-1">
                      <h3 className="font-bold text-[15px] uppercase tracking-tight">{product.title}</h3>
                      <p className="pt-2 font-bold text-[15px]">KES {Number(product.price).toLocaleString()}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-40">
                <h3 className="text-xl font-bold">No products found.</h3>
                <p className="text-gray-500 underline cursor-pointer" onClick={() => setSortCategory("all")}>Clear filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}