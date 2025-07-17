import React, { useEffect, useState } from "react";
import { ShareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

export default function GenericModal({
   title,
  onClose,
  products,
  onAddToCart,
  onSwitchToMen,
  onSwitchToWomen,
  onSwitchToUnisex,
  isAuthenticated,
  onShowAuthModal,
  cartItems,
  onRemoveFromCart,
  onUpdateCartQuantity,
}) {
  const [visible, setVisible] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = (callback) => {
    setVisible(false);
    setTimeout(() => {
      if (callback) callback();
    }, 200);
  };

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + delta),
    }));
  };

  const handleSizeChange = (index, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [index]: size,
    }));
  };

  const handleBuyNow = (product, quantity, size) => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed.");
      onShowAuthModal?.();
      return;
    }

    if (!size) return alert("Please select a size before buying.");

    setVisible(false);
    setTimeout(() => {
      onClose?.();
      navigate("/checkoutpage", {
        state: {
          cartItems: [{ ...product, quantity, size }],
          fromBuyNow: true,
        },
      });
    }, 250);
  };

  const handleAddToCart = (product, quantity, size) => {
    if (!isAuthenticated) {
      alert("Please sign in to add items to cart.");
      onShowAuthModal?.();
      return;
    }

    if (!size) {
      alert("Please select both size before adding to cart.");
      return;
    }

    onAddToCart({ ...product, quantity, size });
  };

  const handleCheckout = () => {
    setShowCart(false);   
    setVisible(false);      
    setTimeout(() => {
      onClose?.();            
      navigate("/checkoutpage", {
        state: {
          cartItems,
        },
      });
    }, 250);
  };


  const handleShare = async (product) => {
    const shareData = {
      title: product.title,
      text: `Check out this item: ${product.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${product.title} - ${window.location.href}`);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      alert("Unable to share.");
    }
  };

  const OpenCartButton = (
    <button onClick={() => setShowCart(true)} 
     className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
      Open Cart
    </button>
  );



  const renderSwitchButtons = () => {
    switch (title) {
      case "Unisex Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToMen)} 
             className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
              Men
            </button>
            <button onClick={() => handleClose(onSwitchToWomen)} 
             className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
              Women
            </button>
            {OpenCartButton}
          </>
        );
      case "Men's Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToWomen)} 
             className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
              Women
            </button>
            <button onClick={() => handleClose(onSwitchToUnisex)} 
             className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
              Unisex
            </button>
            {OpenCartButton}
          </>
        );
      case "Women's Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToMen)} 
             className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
              Men
            </button>
            <button onClick={() => handleClose(onSwitchToUnisex)}
              className="relative text-md font-serif text-[#900000] hover:text-[#a80000] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#900000] hover:after:w-full after:transition-all after:duration-300">
                Unisex
            </button>
            {OpenCartButton}
          </>
        );
      default:
        return null;
    }
  };

  const sizes = ["Small", "Medium", "Large", "XLarge", "2XLarge", "3XLarge"];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className={`transition-opacity duration-200 ease-in-out ${visible ? "opacity-100" : "opacity-0"} bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#900000]">Mkurugenzi Merche</h2>
            </div>
            <button onClick={() => handleClose(onClose)} className="text-gray-500 text-2xl font-bold hover:text-black">
              ×
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#900000]">{title}</h2>
            <div className="flex gap-3 mt-1">
                {renderSwitchButtons()}
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products?.map((product, index) => { const quantity = quantities[index] || 1;
              const selectedSize = selectedSizes[index] || "";


              return (
                <div key={index} className="bg-white border rounded-xl shadow p-4 flex flex-col">
                    <img src={product.image} alt={product.title} onClick={() => setPreviewImage(product.image)}
                    className="w-full h-48 object-cover rounded-md mb-2 hover:scale-105 transition-transform duration-300 cursor-pointer"/>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-serif font-semibold text-[#900000]">{product.title}</h3>
                      <button onClick={() => handleShare(product)} className="text-[#900000] hover:text-[#700000]">
                          <ShareIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm font-serif text-gray-700 mb-2">KES {product.price}</p>

                    <div className="mb-3">
                      <select value={selectedSize} onChange={(e) => handleSizeChange(index, e.target.value)} className="w-full px-2 py-1 font-serif border rounded text-sm text-[#800000]">
                          <option value="">Select Size</option>
                          {sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                          ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <button onClick={() => handleQuantityChange(index, -1)} className="bg-gray-200 hover:bg-gray-300 rounded px-3 text-lg">
                          −
                      </button>
                      <span className="font-serif text-md">{quantity}</span>
                      <button onClick={() => handleQuantityChange(index, 1)} className="bg-gray-200 hover:bg-gray-300 rounded px-3 text-lg">
                          +
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <button onClick={() => handleAddToCart(product, quantity, selectedSize)} className="w-full px-4 py-2 font-serif bg-[#900000] text-white rounded hover:bg-[#a80000]">
                          Add to Cart
                      </button>
                    <button onClick={() => handleBuyNow(product, quantity, selectedSize)} className="w-full px-4 py-2 font-serif border border-[#800000] text-[#800000] rounded">
                        Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg border-4 border-white"/>
        </div>
      )}
      {showCart && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Cart onClose={() => setShowCart(false)} cartItems={cartItems} onRemoveItem={onRemoveFromCart} onUpdateQuantity={onUpdateCartQuantity} isAuthenticated={isAuthenticated}
            onShowAuthModal={onShowAuthModal} onCheckout={handleCheckout}/>
        </div>
      )}


    </>
  );
}
