import React from "react";
import { useNavigate } from "react-router-dom";

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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed to checkout.");
      onClose();
      if (onShowAuthModal) onShowAuthModal(); 
      return;
    }

    onClose();
    navigate("/checkoutpage", {
      state: { cartItems },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[80vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-serif text-[#800000]">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 font-serif text-2xl hover:text-black">
            ×
          </button>
        </div>

        <div className="w-full border-t border-gray-300 mb-4" />

        {cartItems.length === 0 ? (
          <p className="text-gray-600 font-serif">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded"/>
                <div className="flex-grow">
                  <h3 className="font-semibold font-serif text-[#800000]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-serif text-gray-600 mb-1">
                    Size: <span className="font-semibold text-black">{item.size || "—"}</span>
                  </p>

                  <div className="flex items-center space-x-2 mb-1">
                    <button onClick={() => onUpdateQuantity(index, -1)} disabled={item.quantity <= 1} className={`px-2 py-1 rounded font-serif text-lg 
                     ${ item.quantity <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300" }`}>
                      −
                    </button>
                    <span className="font-serif text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(index, 1)} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-serif text-lg">
                      +
                    </button>
                  </div>
                  <p className="text-sm font-serif text-gray-600">
                    Price: KES {item.price.toLocaleString()} <br />
                    <span className="font-semibold text-black">
                      Subtotal: KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </p>
                </div>
                <button onClick={() => onRemoveItem(index)} className="text-sm text-white font-serif bg-[#900000] px-3 py-1 rounded hover:bg-[#a80000]">
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right space-y-3">
              <p className="font-bold text-lg font-serif text-[#800000]">
                Total: KES {total.toLocaleString()}
              </p>
              <button onClick={() => { handleCheckout(); onCheckout?.();}} className="bg-[#900000] font-serif hover:bg-[#a80000] text-white px-6 py-2 rounded font-semibold transition">
                Checkout
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
