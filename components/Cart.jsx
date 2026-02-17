import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, X } from "lucide-react";

export default function Cart({
  cartItems,
  onClose,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
  isAuthenticated,
  onShowAuthModal,
}) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed to checkout.");
      onClose();
      onShowAuthModal?.();
      return;
    }

    for (let item of cartItems) {
      if ((item.sizes?.length && !item.size) || (item.colors?.length && !item.color)) {
        alert(`Please select size and color for ${item.title} before checking out.`);
        return;
      }
    }

    onClose();
    navigate("/checkoutpage", { state: { cartItems } });
  };

  return (
     <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-end">
      {/* Slide-in from right (Nike App style) */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Items Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-gray-500 mb-4">There are no items in your bag.</p>
              <button onClick={onClose} className="underline font-bold uppercase text-sm">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-8">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div 
                    key={item.id || index}
                    layout
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-6 border-b border-gray-100 pb-8"
                  >
                    {/* Image - Nike uses a light gray background for product photos */}
                    <div className="w-32 h-40 bg-[#f6f6f6] flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} onClick={() => setPreviewImage(item.image)} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg uppercase tracking-tight leading-tight">{item.title}</h3>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <p className="font-bold text-lg">KES {item.price.toLocaleString()}</p>
                          <p>Size: <span className="text-black font-medium">{item.size || "—"}</span></p>
                          <p>Color: <span className="text-black font-medium">{item.color || "—"}</span></p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(index, -1)}
                            className="p-1 hover:text-gray-400 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(index, 1)}
                            className="p-1 hover:text-gray-400 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button 
                          onClick={() => onRemoveItem(index)}
                          className="text-gray-400 hover:text-black transition p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-bold">KES {total.toLocaleString()}</span>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white font-bold py-5 rounded-full hover:bg-zinc-800 transition-all uppercase tracking-widest text-sm"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white text-black font-bold py-4 rounded-full border border-gray-200 hover:border-black transition-all uppercase tracking-widest text-sm"
              >
                View Bag
              </button>
            </div>
          </div>
        )}
      </motion.div>
      {previewImage && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg border-4 border-white"/>
        </div>
      )}
    </div>
  );
}
