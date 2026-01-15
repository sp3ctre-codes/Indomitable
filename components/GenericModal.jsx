import React, { useEffect, useState } from "react";
import { ShareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}) {
  const [visible, setVisible] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
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
      [index]: Math.max(0, (prev[index] || 0) + delta),
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

    if (!size) return alert("Please select a size before adding to cart.");
    onAddToCart({ ...product, quantity, size });
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

  const renderSwitchButtons = () => {
    switch (title) {
      case "Unisex Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToMen)} className="text-black text-lg font-medium text-foreground/90 text-md leading-relaxed relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Men</button>
            <button onClick={() => handleClose(onSwitchToWomen)} className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold text-black text-lg font-medium text-foreground/90 text-md leading-relaxed after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Women</button>
          </>
        );
      case "Men's Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToWomen)} className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold text-black text-lg font-medium text-foreground/90 text-md leading-relaxed after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Women</button>
            <button onClick={() => handleClose(onSwitchToUnisex)} className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold text-black text-lg font-medium text-foreground/90 text-md leading-relaxed after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Unisex</button>
          </>
        );
      case "Women's Collection":
        return (
          <>
            <button onClick={() => handleClose(onSwitchToMen)} className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold text-black text-lg font-medium text-foreground/90 text-md leading-relaxed after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Men</button>
            <button onClick={() => handleClose(onSwitchToUnisex)} className="relative text-white font-sans px-3 py-2 rounded-md transition duration-300 font-semibold text-black text-lg font-medium text-foreground/90 text-md leading-relaxed after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                  after:translate-x-[-50%] after:w-0 after:h-[2px] after:bg-teal-400 
                  after:transition-all after:duration-500 group-hover:after:w-full">Unisex</button>
          </>
        );
      default:
        return null;
    }
  };

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className={`transition-opacity duration-200 ease-in-out ${visible ? "opacity-100" : "opacity-0"} bg-gray-800/20 text-white p-6 rounded-2xl shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-teal-400 text-sm tracking-widest uppercase">Indomitable Boutique</h2>
            </div>
            <button onClick={() => handleClose(onClose)} className="text-gray-500 hover:bg-black/20 rounded-md px-4 py-2 cursor-pointer text-2xl font-bold hover:text-white">
              ×
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-medium text-foreground/90 text-md leading-relaxed]">{title}</h2>
            <div className="flex gap-3 mt-1">
                {renderSwitchButtons()}
            </div>
          </div>

          <hr className="border-gray-300 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products?.map((product, index) => { const quantity = quantities[index] || 0;
              const selectedSize = selectedSizes[index] || "";

              return (
                <div key={index} className="bg-white border rounded-xl shadow p-4 flex flex-col">
                    <img src={product.image} alt={product.title} onClick={() => setPreviewImage(product.image)}
                    className="w-full h-48 object-cover rounded-md mb-2 hover:scale-105 transition-transform duration-300 cursor-pointer"/>
                    <div className="flex justify-between items-center mb-1">
                    <h3 className="text-black text-lg font-medium text-foreground/90 text-md leading-relaxed">{product.title}</h3>
                    <button onClick={() => handleShare(product)} className="text-black text-lg font-medium text-foreground/90 text-md leading-relaxed">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    </div>
                    <p className="text-black text-lg font-medium text-foreground/90 text-md leading-relaxed">KES {product.price}</p>

                    <div className="mb-3">
                    <select value={selectedSize} onChange={(e) => handleSizeChange(index, e.target.value)} className="w-full px-2 py-1 border rounded text-sm text-black text-lg font-medium text-foreground/90 text-md leading-relaxed">
                        <option value="">Select Size</option>
                        {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                    <button onClick={() => handleQuantityChange(index, -1)} className="bg-black/50 hover:bg-gray-300 rounded px-3 text-lg">
                        −
                    </button>
                    <span className="g:text-5xl text-md text-black font-medium lg:my-5 my-2y">{quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)} className="bg-black/50 hover:bg-gray-300 rounded px-3 text-lg">
                        +
                    </button>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                    <button onClick={() => handleAddToCart(product, quantity, selectedSize)} className="w-full px-4 py-2 text-white rounded-md bg-teal-400 text-lg font-medium text-foreground/90 text-md leading-relaxed rounded]">
                        Add to Cart
                    </button>
                    <button onClick={() => handleBuyNow(product, quantity, selectedSize)} className="w-full px-4 py-2 border text-black rounded-md text-lg font-medium text-foreground/90 text-md leading-relaxed ">
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
    </>
  );
}
