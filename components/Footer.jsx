import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm(
            "service_knfiqfv",
            "template_dk9mman",
            formRef.current,
            "3Ul777UgRgBXbQAcJ"
        )
        .then(
            () => {
            alert("Message sent");
            e.target.reset();
            },
            (error) => {
                console.error("EMAILJS ERROR:", error);
                alert(error.text || "Check console for error");
            }
        );
    };

  return (
        <footer className="relative text-white px-6 md:px-16 pt-16 pb-8">
            <div className="max-w-6xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-500/40 to-transparent mb-12 "/>
                <div className="max-w-9xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-white mb-4 text-2xl">Shop</h3>
                        <ul className="space-y-2 text-sm">
                        <li><a href="/men" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Men</a></li>
                        <li><a href="/women" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Women</a></li>
                        <li><a href="/unisex" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Unisex</a></li>
                        <li><a href="/footwear" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Footwear</a></li>
                        <li><a href="/kids" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Kids</a></li>
                        </ul>
                    </div>
            
                    <div>
                        <h3 className="font-bold text-white mb-4 text-2xl">Help</h3>
                        <ul className="space-y-2 text-sm">
                        <li><a href="/shipping" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Shipping & Delivery</a></li>
                        <li><a href="/returns" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Returns</a></li>
                        <li><a href="/order-tracking" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Order Tracking</a></li>
                        <li><a href="/payment" className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 hover:underline">Payment Options</a></li>
                        </ul>
                    </div>
            
                    <div>
                        <h3 className="font-bold text-white mb-4 text-2xl">Connect</h3>
                        <ul className="space-y-3 text-sm">
                        <li className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Email: <a href="mailto:beatricenaisiai.com" className="hover:underline text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">gerradsaruni21@gmail.com</a></li>
                        <li className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">WhatsApp: <a href="https://wa.me/254726862078" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">+254 726 862 078</a></li>
                        </ul>
                        <div className="flex gap-4 mt-4 text-xl">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="hover:text-pink-600 transition" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="hover:text-blue-600 transition" />
                            </a>
                            <a href="https://tiktok.com/@benais6" target="_blank" rel="noopener noreferrer">
                                <FaTiktok className="hover:text-black/red transition" />
                            </a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="font-bold text-white text-2xl">
                            Give Feedback
                        </h2>

                        <p className="text-gray-200 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">
                            Drop your email and tell us what to improve for a better future.
                        </p>

                        <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
                            <input type="email" name="from_email" placeholder="Your email address" required className="w-full px-4 py-2 rounded-md bg-white/90 text-black text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 outline-none focus:ring-2 focus:ring-teal-400"/>
                            <textarea name="message" rows="6" placeholder="What would you like to talk about?" required className="w-full px-4 py-2 rounded-md bg-white/90 text-black text-md font-medium text-foreground/90 text-md leading-relaxed mb-2 outline-none focus:ring-2 focus:ring-teal-400 resize-none"/>
                            <button type="submit" className="w-full px-5 py-2 rounded-md bg-teal-500 text-black font-medium hover:bg-teal-400 transition">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
    
                <div className="mt-16 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} <a className="hover:underline" href="IndomitableBoutique.com">Indomitable Boutique</a></p>
                </div>
            </div>
        </footer>
  );
}

export default Footer;
