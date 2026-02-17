import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";  

export default function Auth({ onClose, loginUser, signupUser, onLogin }) {
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (authMode === "signup") {
        await signupUser(formData.email, formData.password, formData.fullName);
      } else {
        await loginUser(formData.email, formData.password);
      }

      onLogin?.(); // update App state immediately
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose?.();
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-[450px] p-8 md:p-10 relative shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-black" />
        </button>

        {/* Brand Header */}
        <div className="mb-8 text-left">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-4">
            Indomitable Boutique
          </h2>
          <h1 className="text-xl font-bold mb-2">
            {authMode === "signin" ? "YOUR ACCOUNT FOR EVERYTHING" : "BECOME A MEMBER"}
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your email to join us or sign in.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black outline-none transition-all placeholder:text-gray-400"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black outline-none transition-all placeholder:text-gray-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black outline-none transition-all placeholder:text-gray-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <p className="text-[11px] text-gray-500 leading-tight">
            By logging in, you agree to Indomitable's <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Use</span>.
          </p>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors active:scale-[0.98]"
          >
            {authMode === "signin" ? "Sign In" : "Join Us"}
          </button>
        </form>

        {error && <p className="text-red-600 text-xs mt-3 font-medium text-center">{error}</p>}

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Or continue with</span></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-sm hover:border-black transition-colors font-semibold text-sm">
            <FcGoogle size={20} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-sm hover:border-black transition-colors font-semibold text-sm">
            <FaFacebook className="text-[#1877F2]" size={20} /> Facebook
          </button>
        </div>

        {/* Mode Toggle */}
        <p className="mt-8 text-center text-sm text-gray-500">
          {authMode === "signin" ? "Not a Member? " : "Already a Member? "}
          <button 
            onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
            className="text-black font-bold underline underline-offset-4"
          >
            {authMode === "signin" ? "Join Us." : "Sign In."}
          </button>
        </p>
      </motion.div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded bg-green-600 text-white shadow-md animate-slideInUp">
          Authentication successful! Redirecting...
        </div>
      )}
    </div>
  );
}
