import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { menProducts, womenProducts, unisexProducts } from "../src/data/Products";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ProductPage({
  onAddToCart,
  onAddToFavorites,
  favorites = [],
  isAuthenticated = false,
  onOpenAuth,
}) {
  const { id } = useParams();

  const allProducts = [...menProducts, ...womenProducts, ...unisexProducts];
  const product = allProducts.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const isFavorited = favorites.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      return alert("Please select a size before adding to cart.");
    }
    if (product.colors?.length && !selectedColor) {
      return alert("Please select a color before adding to cart.");
    }
    onAddToCart({
      ...product,
      size: selectedSize || null,
      color: selectedColor || null,
      quantity,
    });
  };

  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
    onAddToFavorites(product);
  };

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">

        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-medium">KES {product.price}</p>

          {product.sizes?.length > 0 && (
            <div>
              <p className="mb-2 font-medium">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div>
              <p className="mb-2 font-medium">Select Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === color ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 font-medium">Select Quantity</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded-sm"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border rounded-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleAddToFavorites}
              className="p-3 border rounded-xl"
            >
              <motion.div
                key={isFavorited ? "liked" : "unliked"}
                animate={isFavorited ? { scale: [1, 1.4, 0.9, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {isFavorited ? (
                  <HeartSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
