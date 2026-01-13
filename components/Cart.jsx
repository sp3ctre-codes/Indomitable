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
      <div className="bg-[#0D1102] text-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[80vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="lg:text-2xl text-2xl font-black tracking-tight lg:my-5 my-2">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 font-serif text-2xl hover:text-white cursor-hand">
            ×
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-500/40 to-transparent mb-12 "/>

        {cartItems.length === 0 ? (
          <p className="lg:text-xl text-lg font-black tracking-tight lg:my-5 my-2">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded"/>
                <div className="flex-grow">
                  <h3 className="font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm tracking-tight mb-1">
                    Size: <span className="font-semibold text-black">{item.size || "—"}</span>
                  </p>

                  <div className="flex items-center space-x-2 mb-1">
                    <button onClick={() => onUpdateQuantity(index, -1)} disabled={item.quantity <= 1} className={`px-2 py-1 rounded tracking-tight text-lg 
                     ${ item.quantity <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300" }`}>
                      −
                    </button>
                    <span className="font-serif text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(index, 1)} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded tracking-tight text-lg">
                      +
                    </button>
                  </div>
                  <p className="text-sm tracking-tight text-gray-600">
                    Price: KES {item.price.toLocaleString()} <br />
                    <span className="font-semibold tracking-tight text-black">
                      Subtotal: KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </p>
                </div>
                <button onClick={() => onRemoveItem(index)} className="text-sm text-white tracking-tight bg-[#900000] px-3 py-1 rounded hover:bg-[#a80000]">
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right space-y-3">
              <p className="font-bold text-lg tracking-tight text-[#800000]">
                Total: KES {total.toLocaleString()}
              </p>
              <button onClick={() => { handleCheckout(); onCheckout?.();}} className="bg-[#900000] tracking-tight hover:bg-[#a80000] text-white px-6 py-2 rounded font-semibold transition">
                Checkout
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
