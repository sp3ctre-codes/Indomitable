import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Footer from "../components/Footer";
import Auth from "../components/Auth";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import GenericModal from "../components/GenericModal";
import Notifications from "../components/Notifications";
import CheckoutPage from "../Pages/Checkoutpage";
import { auth } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [notificationMessages, setNotificationMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loggedIn = !!user;
      setIsAuthenticated(loggedIn);
      setNotificationMessages(loggedIn ? ["Welcome to Mkurugenzi Merchandise!"] : []);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem("lastUserCart", JSON.stringify(cartItems));
      }
      await signOut(auth);
      setUserType(null);
      setCartItems([]);
      alert("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addToCart = (newProduct) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.title === newProduct.title && item.size === newProduct.size
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newProduct.quantity || 1;
        return updated;
      } else {
        return [...prev, { ...newProduct, quantity: newProduct.quantity || 1 }];
      }
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const updateCartQuantity = (index, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const menProducts = [
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
    { image: "/BlackHoodie.webp", title: "BeigeHoodie", price: 1500 },
    { image: "/shat.webp", title: "Hoodie", price: 2500 },
  ];

  const womenProducts = [
    { image: "/Beanie.webp", title: "Beanie Hat Black", price: 2000 },
    { image: "/BucketHatSize.webp", title: "Bucket Hat Black", price: 1700 },
  ];

  const unisexProducts = [
    { image: "/Beanie.webp", title: "Oversized Hoodie", price: 2000 },
    { image: "/BucketHatSize.webp", title: "Joggers", price: 1700 },
  ];

  const allProducts = [...menProducts, ...womenProducts, ...unisexProducts];

  const switchModal = (type) => {
    setModalType(null);
    setTimeout(() => setModalType(type), 150);
  };

  const getCurrentModalProps = () => {
    switch (modalType) {
      case "men":
        return {
          title: "Men's Collection",
          products: menProducts,
          onSwitchToWomen: () => switchModal("women"),
          onSwitchToUnisex: () => switchModal("unisex"),
        };
      case "women":
        return {
          title: "Women's Collection",
          products: womenProducts,
          onSwitchToMen: () => switchModal("men"),
          onSwitchToUnisex: () => switchModal("unisex"),
        };
      case "unisex":
        return {
          title: "Unisex Collection",
          products: unisexProducts,
          onSwitchToMen: () => switchModal("men"),
          onSwitchToWomen: () => switchModal("women"),
        };
      default:
        return null;
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed to Checkout.");
      setShowAuthModal(true);
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkoutpage", { state: { cartItems } });
  };

  const currentModalProps = getCurrentModalProps();

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar onOpenAuth={() => setShowAuthModal(true)} onOpenCart={() => setShowCart(true)} onOpenUnisex={() => setModalType("unisex")} onOpenMen={() => setModalType("men")}
        onOpenWomen={() => setModalType("women")} onOpenNotifications={() => setShowNotifications(true)} cartItemCount={totalCartCount} onCheckout={handleCheckout}
        isAuthenticated={isAuthenticated} onLogout={logout} products={allProducts} onAddToCart={addToCart} cartItems={cartItems}/>

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Auth onClose={() => setShowAuthModal(false)} setUserType={setUserType} />
        </div>
      )}

      {showCart && (
        <Cart onClose={() => setShowCart(false)} cartItems={cartItems} onRemoveItem={removeFromCart} onUpdateQuantity={updateCartQuantity}
          isAuthenticated={isAuthenticated} onShowAuthModal={() => setShowAuthModal(true)}/>
      )}

      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} isAuthenticated={isAuthenticated} messages={notificationMessages}/>
      )}

      {currentModalProps && (
        <GenericModal
          {...currentModalProps} onClose={() => setModalType(null)} onAddToCart={addToCart} isAuthenticated={isAuthenticated} onShowAuthModal={() => setShowAuthModal(true)}
          cartItems={cartItems} onRemoveFromCart={removeFromCart} onUpdateCartQuantity={updateCartQuantity}  onOpenCart={() => setShowCart(true)}/>
      )}


      <Routes>
        <Route path="/" element={<HomePage onOpenUnisex={() => setModalType("unisex")} />} />
        <Route path="/checkoutpage" element={<CheckoutPage cartItems={cartItems} />} />
      </Routes>

      {showToast && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded bg-green-600 text-white shadow-md text-sm z-50">
          Added to cart successfully!
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
