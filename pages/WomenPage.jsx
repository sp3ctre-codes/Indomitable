import React, { useEffect, useRef, useState } from "react";
import CategoryPage from "./CategoryPage";
import { womenProducts } from "../src/data/Products";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";  

export default function WomenPage({ onAddToCart, onAddToFavorites, isAuthenticated, setShowAuthModal }) {
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
        <title>Women</title>
      </Helmet>
       <CategoryPage
            title="Women's Collection"
            products={womenProducts}
            onAddToCart={onAddToCart}
            onAddToFavorites={onAddToFavorites}
            onBuyNow={handleBuyNow}
        /> 


         {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
    
  );
}
