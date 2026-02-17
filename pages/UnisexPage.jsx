import React, { useEffect, useRef, useState } from "react";
import CategoryPage from "./CategoryPage";
import { unisexProducts } from "../src/data/Products";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UnisexPage({ onAddToCart, onAddToFavorites, isAuthenticated, setShowAuthModal }) {
  const navigate = useNavigate();
  const [showAuthModal] = useState(false);

  const handleBuyNow = (item) => {
  if (!isAuthenticated) {
    setShowAuthModal(true);
    return;
  }

  navigate("/Checkoutpage", {
    state: {
      cartItems: [item],
      fromBuyNow: true,
    },
  });
};

  return (
    <>
      <Helmet>
        <title>Unisex</title>
      </Helmet>
      <CategoryPage
      title="Unisex Category"
      products={unisexProducts}
      onAddToCart={onAddToCart}
      onAddToFavorites={onAddToFavorites}
      onBuyNow={handleBuyNow}
    />

    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
