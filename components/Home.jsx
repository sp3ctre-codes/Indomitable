import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "Beanie.webp",
  "shat.webp",
  "BurgundyTshirt.webp",
  "BucketHatSize.webp",
];

const cards = [
  {
    title: "Men's Collection",
    image: "/Post.webp",
    description: "Bold. Rugged. Stylish.",
  },
  {
    title: "Women's Trends",
    image: "/bI.webp",
    description: "Elegant. Chic. Empowering.",
  },
  {
    title: "Unisex Vibes",
    image: "/DSC_4576.webp",
    description: "For every identity. Always in style.",
  },
  {
    title: "Exclusive Deals",
    image: "/UnisexTopGray.webp",
    description: "Coz We Gatch you!",
  },
];

export default function HomePage({ onOpenUnisex }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="pt-20 bg-white font-serif">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-black text-white overflow-hidden rounded-b-3xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroImages[currentSlide]}
            src={heroImages[currentSlide]}
            alt="Hero Slide"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="z-10 text-center">
          <img src="/black_170x.avif" alt="logo" className="mx-auto mb-6 w-48" />
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Mkurugenzi</h1>
          <p className="text-lg md:text-xl mt-2 mb-6">Fashion that speaks identity.</p>
          <button
            onClick={onOpenUnisex}
            className="bg-white text-[#800000] px-6 py-2 rounded-full shadow-lg font-bold hover:bg-gray-200 transition"
          >
            Shop Unisex
          </button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#800000]">Explore Our Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">{card.title}</h3>
                <p className="text-gray-200">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#800000] to-[#330000] text-white py-16 text-center rounded-t-3xl">
        <h3 className="text-3xl md:text-4xl font-bold">Don’t Miss Out</h3>
        <p className="text-lg mt-4 mb-6">Be the first to grab our latest drops and exclusive offers!</p>
        <button className="bg-white text-[#800000] px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-200 transition">
          Browse Now
        </button>
      </section>
    </div>
  );
}
