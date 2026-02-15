import React, { useState } from "react";
import { ShareIcon, HeartIcon } from "lucide-react";
import { motion } from "framer-motion";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function CategoryPage({
  title,
  products,
  onAddToCart,
  onAddToFavorites,
  onBuyNow,
  favorites = [],
}) {
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const getQty = (index) => quantities[index] || 1;

  const handleMouseMove = (e) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, getQty(index) + delta),
    }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const isFavorited = (productId) =>
    favorites.some((item) => item.id === productId);

  return (
    <div
      className="min-h-screen bg-white text-black pt-28 pb-16 relative"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10 tracking-tight">{title}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const favorited = isFavorited(product.id);

            return (
              <div
                key={`${product.id}-${index}`}
                className="border rounded-2xl p-4 flex flex-col hover:shadow-lg transition"
              >
                <div
                  className="relative"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    onClick={() => setPreviewImage(product.image)}
                    className="w-full h-90 object-cover rounded-md mb-2 
                               hover:scale-105 transition-transform duration-300 
                               cursor-pointer"
                  />

                  {/* Mobile label */}
                  <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      Click image to preview
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <h3 className="text-lg font-semibold">{product.title}</h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigator.share
                          ? navigator.share({
                              title: product.title,
                              text: `Check out ${product.title}`,
                              url: window.location.href,
                            })
                          : navigator.clipboard.writeText(
                              `${product.title} - ${window.location.href}`
                            )
                      }
                      className="text-gray-500 hover:text-black"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onAddToFavorites(product)}
                      className="p-1 rounded-full transition-colors relative"
                    >
                      <motion.div
                        key={favorited ? "liked" : "unliked"}
                        initial={{ scale: 1 }}
                        animate={
                          favorited
                            ? { scale: [1, 1.4, 1.1, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.4, times: [0, 0.3, 0.6, 1] }}
                      >
                        {favorited ? (
                          <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-gray-400 hover:text-black" />
                        )}
                      </motion.div>
                    </button>
                  </div>
                </div>

                <p className="font-medium mt-1 mb-3">KES {product.price}</p>

                <div className="flex items-center gap-4 mb-3">
                  {product.sizes?.length > 0 && (
                    <select
                      value={selectedSizes[product.id] || ""}
                      onChange={(e) =>
                        handleSizeSelect(product.id, e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="" disabled>
                        Select Size
                      </option>
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="flex items-center border border-black rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4">{getQty(index)}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() =>
                      onAddToCart({
                        ...product,
                        size: selectedSizes[product.id] || null,
                        quantity: getQty(index),
                      })
                    }
                    className="py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      onBuyNow({
                        ...product,
                        size: selectedSizes[product.id] || null,
                        quantity: getQty(index),
                      })
                    }
                    className="py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop floating label */}
      {isHoveringImage && (
        <div
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
          className="hidden md:block fixed z-50 pointer-events-none 
                     bg-black/80 text-white text-sm 
                     px-4 py-2 rounded-full backdrop-blur-sm"
        >
          Click image to preview
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm 
                     flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[80vh] object-contain 
                       rounded-xl shadow-2xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
