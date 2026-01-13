import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, provider } from "../src/Firebase";


function Authentication({ onClose, onLogin }) {
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (authMode === "signup") {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onLogin?.();
        onClose?.();
        navigate("/");
      }, 1500);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onLogin?.();
        onClose?.();
        navigate("/");
      }, 1500);
    } catch (error) {
      alert("Google Sign In failed: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert("Please enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert("Password reset email sent!");
    } catch (error) {
      alert("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 border border-white/10 hover:border-teal-400/40 backdrop-blur-sm bg-black/40 flex items-center justify-center px-4">
      <div className="bg-[#0D1102] w-full max-w-sm rounded-xl shadow-lg p-4 sm:p-6 relative animate-fadeInScale">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-teal-400 text-md tracking-widest uppercase">
              Indomitable Boutique
            </h2>
            <p className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed">Sign in or create an account if you don't have one.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 text-xl font-serif hover:text-white">
            ×
          </button>
        </div>

        <div className="mb-4">
          <button onClick={handleGoogleSignIn}
           className="w-full flex items-center justify-center gap-2 bg-teal-500 py-2 rounded-md shadow-sm hover:bg-teal-400 transition text-black text-md font-medium text-foreground/90 text-md leading-relaxed">
            <img src="/google.png" alt="Google logo" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gradient-to-l from-transparent via-gray-500/40 to-transparent"/>
          <span className="text-gray-300 text-sm font-medium text-foreground/90 text-md leading-relaxed">or</span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500/40 to-transparent"/>
        </div>

        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-md">
          <button className={`flex-1 py-2 text-sm rounded ${ authMode === "signin" ? "bg-teal-400 text-black text-md font-medium text-foreground/90 text-md leading-relaxed" : "text-black font-medium text-foreground/90 text-md leading-relaxed" }`}
           onClick={() => setAuthMode("signin")}>
            Sign In
          </button>
          <button className={`flex-1 py-2 text-sm rounded ${ authMode === "signup" ? "bg-teal-400 text-black text-md font-medium text-foreground/90 text-md leading-relaxed" : "text-black font-medium text-foreground/90 text-md leading-relaxed" }`}
           onClick={() => setAuthMode("signup")}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-3">
          {authMode === "signup" && (
            <input type="text" placeholder="Full Name" className="text-black text-md font-medium text-foreground/90 text-md leading-relaxed w-full px-3 py-2 border rounded-md bg-gray-200 placeholder-gray-white"
             value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
          )}

          <input type="email" placeholder="Email" className="text-black text-md font-medium text-foreground/90 text-md leading-relaxed w-full px-3 py-2 border rounded-md bg-gray-200 placeholder-gray-white"
           value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>

          <input type="password" placeholder="Password" className="text-black text-md font-medium text-foreground/90 text-md leading-relaxed w-full px-3 py-2 border rounded-md bg-gray-200 placeholder-gray-white mb-2"
           value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>

          <div className="h-px bg-gradient-to-l from-transparent via-gray-500/40 to-transparent mb-4"/>

          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-black text-md font-medium text-foreground/90 text-md leading-relaxed py-2 rounded-md">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {authMode === "signin" && (
          <div className="mt-2 text-right">
            <button onClick={handleForgotPassword} className="text-sm text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed underline hover:text-white">
              Forgot Password?
            </button>
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded bg-green-600 text-md font-medium text-foreground/90 leading-relaxed text-white shadow-md text-sm animate-slideInUp">
          Authentication successful! Redirecting...
        </div>
      )}
    </div>
  );
}

export default Authentication;