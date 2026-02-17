// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import CategoryFilterPage from "../pages/CategoryFilterPage";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";
import Auth from "../components/Auth";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Favorite from "../components/Favorite";
import CheckoutPage from "../pages/Checkoutpage";
import AboutPage from "../pages/AboutPage";
import { menProducts, womenProducts, unisexProducts } from "./data/Products";
import MenPage from "../pages/MenPage";
import WomenPage from "../pages/WomenPage";
import UnisexPage from "../pages/UnisexPage";

const allProducts = [...menProducts, ...womenProducts, ...unisexProducts];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cartToast, setCartToast] = useState(false);
  const [favToast, setFavToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));
  }, []);

  // ---------- AUTH ----------
  const loginUser = async (email, password) => {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    return data;
  };

  const signupUser = async (email, password) => {
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    if (!res.ok) throw new Error("Signup failed");
    return loginUser(email, password);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setCartItems([]);
    setFavorites([]);
    navigate("/");
  };

  // ---------- CART ----------
  const addToCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (i) => i.title === product.title && i.size === product.size
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += product.quantity || 1;
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setCartToast(true);
    setTimeout(() => setCartToast(false), 2500);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, delta) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to checkout your items.");
      setShowAuthModal(true);
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkoutpage", { state: { cartItems } });
  };

  // ---------- FAVORITES ----------
  const addToFavorites = (product) => {
    if (!isAuthenticated) {
      alert("Please sign in to add to favorites.");
      setShowAuthModal(true);
      return;
    }
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    setFavToast(true);
    setTimeout(() => setFavToast(false), 2500);
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  // ---------- BUY NOW ----------
  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate("/checkoutpage", { state: { cartItems: [product], fromBuyNow: true } });
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalFavCount = favorites.length;

  return (
    <div className="relative min-h-screen">
      <Navbar
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenCart={() => setShowCart(true)}
        onCheckout={handleCheckout}
        cartItemCount={totalCartCount}
        favoriteItemCount={totalFavCount}
        favoriteItems={favorites}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
        onRemoveFavorite={removeFromFavorites}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
        products={allProducts}
      />

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Auth
            onClose={() => setShowAuthModal(false)}
            loginUser={loginUser}
            signupUser={signupUser}
          />
        </div>
      )}

      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          isAuthenticated={isAuthenticated}
          onShowAuthModal={() => setShowAuthModal(true)}
        />
      )}

      {showFavorites && (
        <Favorite
          open={showFavorites}
          onClose={() => setShowFavorites(false)}
          favoriteItems={favorites}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          onRemoveFavorite={removeFromFavorites}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/men"
          element={
            <MenPage
              onAddToCart={addToCart}
              onAddToFavorites={addToFavorites}
              isAuthenticated={isAuthenticated}
              setShowAuthModal={setShowAuthModal}
            />
          }
        />
        <Route
          path="/women"
          element={
            <WomenPage
              onAddToCart={addToCart}
              onAddToFavorites={addToFavorites}
              isAuthenticated={isAuthenticated}
              setShowAuthModal={setShowAuthModal}
            />
          }
        />
        <Route
          path="/unisex"
          element={
            <UnisexPage
              onAddToCart={addToCart}
              onAddToFavorites={addToFavorites}
              isAuthenticated={isAuthenticated}
              setShowAuthModal={setShowAuthModal}
            />
          }
        />
        <Route
          path="/:section/:category"
          element={
            <CategoryFilterPage
              products={allProducts}
              favorites={favorites}
              onAddToFavorites={addToFavorites}
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductPage
              onAddToCart={addToCart}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
              isAuthenticated={isAuthenticated}
              onOpenAuth={() => setShowAuthModal(true)}
            />
          }
        />
        <Route path="/checkoutpage" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="/AboutPage" element={<AboutPage />} />
      </Routes>

      {cartToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-50">
          Added to cart!
        </div>
      )}
      {favToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded z-50">
          Added to favorites!
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
