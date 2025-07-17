import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Footer(){
    return(
        <footer className="bg-gradient-to-br from-[#800000] to-[#330000] text-white font-serif items-center justify-center text-center relative w-full border-t-2 shadow-inner">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-start">
                    <img src="/logo.webp" alt="Mkurugenzi Logo" className="w-16 h-16 mb-2" />
                    <span className="text-xl font-signature italic tracking-wide">Mkurugenzi</span>
                </div>
                <div>
                    <h3 className="text-lg hover:underline font-bold mb-3">Contact Us</h3>
                    <p className="mb-1 hover:underline text-sm">Call, Text or WhatsApp us on,</p>
                    <p className="font-semibold hover:underline mb-2 text-sm">+254 716 265 661</p>
                    <p className="text-sm">
                        Email: <a href="mailto:info@mkurugenzi.co.ke" className="hover:underline">info@mkurugenzi.co.ke</a>
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-800" />
            
            <div className="flex flex-col md:flex-row items-center justify-center text-sm text-white px-4 py-4 max-w-6xl mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} Mkurugenzi. Created by GerradSaruni
                </p>
            </div>

            <a href="https://wa.me/254716265661" target="_blank" rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                <FaWhatsapp className="text-lg" />Chat with Us
            </a>
        </footer>
    );
}

export default Footer;