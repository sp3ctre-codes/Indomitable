import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState({});

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
    // 1. Get Selections
    const size = product.sizes?.length ? selectedSizes[product.id] : null;
    const color = product.colors?.length ? selectedColors[product.id] : null;
    const currentQty = getQty(index); // Ensure this is captured clearly

    // 2. Validation
    if (product.sizes?.length && !size) return alert("Please select a size");
    if (product.colors?.length && !color) return alert("Please select a color");

    // 3. Create the "Purchase Object"
    const purchaseData = { 
      ...product, 
      size, 
      color, 
      quantity: currentQty 
    };

    // 4. Execute Actions
    if (onBuyNow) onBuyNow(purchaseData);
    onClose?.();
    navigate("/checkoutpage", {
        state: {
          // Pass the array with the fully constructed object
          cartItems: [purchaseData], 
          fromBuyNow: true,
        },
    });
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center  custom-scrollbar">
      <div className="bg-white w-[92%] max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl relative flex flex-col p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        <div className="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mb-6" />

        {favoriteItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            Favorite items will appear here for quick access.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((product, index) => (
              <div
                key={product.id}
                className="border rounded-2xl p-4 flex flex-col gap-3 bg-gray-50 hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                  <img onClick={() => setPreviewImage(product.image)}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-1 text-center">
                  <h3 className="font-semibold text-black truncate">{product.title}</h3>
                  <p className="text-sm text-gray-500">KES {product.price.toLocaleString()}</p>
                </div>

                {/* SIZE SELECT */}
                {product.sizes?.length > 0 && (
                  <div>
                    <p className="mb-2 font-medium">Select Size</p>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
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

                {/* COLOR SELECT */}
                {product.colors?.length > 0 && (
                  <div>
                    <p className="mb-2 font-medium">Select Color</p>
                    <div className="flex gap-2 flex-wrap">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
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

                {/* QTY */}
                <div>
                  <p className="mb-2 font-medium">Select Quantity</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-3 py-1 border rounded hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{getQty(index)}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-3 py-1 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-3">
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
                  className="mt-2 text-sm border border-gray-300 rounded-full py-1 px-3 hover:bg-red-500 hover:text-white transition self-center"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {previewImage && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg border-4 border-white"/>
        </div>
      )}
    </div>
  );
}
