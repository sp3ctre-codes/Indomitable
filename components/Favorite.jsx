import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Favorite({
  open,
  onClose,
  favoriteItems = [],
  onAddToCart,
  onBuyNow,
  onRemoveFavorite,
}) {
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const initialQty = {};
      const initialSizes = {};
      const initialColors = {};

      favoriteItems.forEach((item, idx) => {
        initialQty[idx] = 1;
        if (item.sizes?.length) initialSizes[item.id] = "";
        if (item.colors?.length) initialColors[item.id] = "";
      });

      setQuantities(initialQty);
      setSelectedSizes(initialSizes);
      setSelectedColors(initialColors);
    }
  }, [open, favoriteItems]);

  const getQty = (index) => quantities[index] || 1;

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, getQty(index) + delta),
    }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleAdd = (product, index) => {
    const size = product.sizes?.length ? selectedSizes[product.id] : null;
    const color = product.colors?.length ? selectedColors[product.id] : null;

    if (product.sizes?.length && !size) return alert("Select a size first");
    if (product.colors?.length && !color) return alert("Select a color first");

    onAddToCart({ ...product, size, color, quantity: getQty(index) });
  };

  const handleBuy = (product, index) => {
    const size = product.sizes?.length ? selectedSizes[product.id] : null;
    const color = product.colors?.length ? selectedColors[product.id] : null;
    const currentQty = getQty(index);

    if (product.sizes?.length && !size) return alert("Please select a size");
    if (product.colors?.length && !color) return alert("Please select a color");

    const purchaseData = {
      ...product,
      size,
      color,
      quantity: currentQty,
    };

    if (onBuyNow) onBuyNow(purchaseData);

    onClose?.();

    navigate("/checkoutpage", {
      state: {
        cartItems: [purchaseData],
        fromBuyNow: true,
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-end">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Your Favorites
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {favoriteItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-gray-500 mb-4">
                There are no items in your favorites.
              </p>
              <button
                onClick={onClose}
                className="underline font-bold uppercase text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <AnimatePresence>
                {favoriteItems.map((product, index) => (
                  <motion.div
                    key={product.id || index}
                    layout
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6 border-b border-gray-100 pb-8"
                  >
                    {/* IMAGE */}
                    <div className="w-full aspect-square overflow-hidden rounded-xl">
                      <img
                        onClick={() => setPreviewImage(product.image)}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col gap-1 text-center">
                      <h3 className="font-semibold text-black truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        KES {product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* SIZE */}
                    {product.sizes?.length > 0 && (
                      <div>
                        <p className="mb-2 font-medium">Select Size</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                handleSizeSelect(product.id, size)
                              }
                              className={`px-3 py-1 border rounded-lg text-sm ${
                                selectedSizes[product.id] === size
                                  ? "bg-black text-white"
                                  : "hover:bg-gray-200"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* COLOR */}
                    {product.colors?.length > 0 && (
                      <div>
                        <p className="mb-2 font-medium">Select Color</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() =>
                                handleColorSelect(product.id, color)
                              }
                              className={`px-3 py-1 border rounded-lg text-sm ${
                                selectedColors[product.id] === color
                                  ? "bg-black text-white"
                                  : "hover:bg-gray-200"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* QUANTITY */}
                    <div>
                      <p className="mb-2 font-medium">Select Quantity</p>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(index, -1)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-200"
                        >
                          −
                        </button>

                        <span className="w-6 text-center">
                          {getQty(index)}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantityChange(index, 1)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAdd(product, index)}
                        className="flex-1 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleBuy(product, index)}
                        className="flex-1 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
                      >
                        Buy Now
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => onRemoveFavorite(product.id)}
                      className="text-sm border border-gray-300 rounded-full py-1 px-3 hover:bg-red-500 hover:text-white transition self-center"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
