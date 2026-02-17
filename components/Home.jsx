import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

function HomePage() {
  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden bg-[#f5f5f5]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/Flannels.jpg" 
            alt="Hero Lifestyle"
            className="w-full h-full object-cover object-[50%_30%]"
          />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-black/40 via-transparent to-transparent">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-4">New Season / {new Date().getFullYear()}</p>
            <h1 className="text-white text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              UNYIELDING <br /> STYLE.
            </h1>
            <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-300">
              Shop the Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. THE EDITORIAL "FOCUS" GRID */}
      <section className="px-6 md:px-12 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">The Essentials</h2>
          <span className="text-sm font-bold underline cursor-pointer hover:text-gray-500">View All</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Focus Card */}
          <div className="relative group overflow-hidden bg-gray-100 aspect-[4/5] md:aspect-auto md:h-[800px]">
            <img src="/Flannels.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Focus" />
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-4xl font-black uppercase italic italic mb-2">Streetwear Noir</h3>
              <p className="underline font-bold text-sm cursor-pointer">Explore Series</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 p-12 flex flex-col justify-center items-start space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Featured Capsule</span>
              <h3 className="text-4xl font-bold tracking-tighter">Monochrome Athletics</h3>
              <p className="text-gray-600 max-w-sm">Engineered for the modern minimalist. Performance meets high-fashion tailoring.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold">Shop Now</button>
            </div>
            <div className="relative overflow-hidden aspect-square md:aspect-auto">
                <img src="/Flannels.jpg" className="w-full h-full object-cover" alt="Sub Focus" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT FEED (THE "NIKE" LOOK) */}
      <section className="bg-[#f5f5f5] py-24 px-6 md:px-12">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-10">Trending Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-white overflow-hidden relative">
                             <img src={`https://images.unsplash.com{i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Product" />
                             <button className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-3 rounded-full shadow-lg">
                                <ShoppingBag size={18} />
                             </button>
                        </div>
                        <div className="mt-4 space-y-1">
                            <h4 className="font-bold text-sm uppercase">Indomitable Pro Tee</h4>
                            <p className="text-gray-500 text-sm italic font-medium tracking-tight">Activewear / Black</p>
                            <p className="font-bold">$85.00</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;