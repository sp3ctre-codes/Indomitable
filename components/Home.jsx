import React from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaEnvelope, FaPhone, FaCreditCard } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const products = [
  { img:"/barcelona.webp", name: "Men's Timberland Classic Premium", price: 4499 },
  { img:"/woolen.jpg", name: "Women's Elegant Leather Boots", price: 5299 },
  { img:"/air.webp", name: "Unisex Hoodie Collection", price: 2499 },
  { img:"/boxers.webp", name: "Footwear - Casual Sneakers", price: 3499 },
];

function HomePage() {
  const products = [
  {
    id: 1,
    name: "Yarission Men Vests cotton(3pcs)",
    image: "/yarission1.jpg",
    discount: "-70%",
    oldPrice: "1000.00",
    price: "Ksh 1,480.00",
    reviews: 1,
  },
  {
    id: 2,
    name: "Body Soft Bathing Scrubber",
    image: "/images/scrubber.jpg",
    discount: "-60%",
    oldPrice: "Ksh 150.00",
    price: "Ksh 60.00",
    reviews: 1,
  },
  {
    id: 3,
    name: "V9 Jeans for Men",
    image: "/v9jeans.jpg",
    discount: "-46%",
    oldPrice: "Ksh 920.00",
    price: "Ksh 499.00",
    reviews: 3,
  },
  {
    id: 4,
    name: "Nike Airforce White",
    image: "/Nike-Airforce.jpg",
    discount: "-54%",
    oldPrice: "Ksh 2,849.00",
    price: "Ksh 1,299.00",
    reviews: 3,
  },
  {
    id: 5,
    name: "Nike Air Force 1 (White)",
    image: "/images/airforce.jpg",
    discount: "-36%",
    oldPrice: "Ksh 3,750.00",
    price: "Ksh 2,399.00",
    reviews: 2,
  },
  {
    id: 6,
    name: "Fashionable Beach Sandals",
    image: "/images/sandals.jpg",
    discount: "-41%",
    oldPrice: "Ksh 1,650.00",
    price: "Ksh 979.00",
    reviews: 1,
  },
  {
    id: 1,
    name: "Men’s Loafers Rubber Shoes",
    image: "/images/shoe1.jpg",
    discount: "-70%",
    oldPrice: "Ksh 4,990.00",
    price: "Ksh 1,480.00",
    reviews: 1,
  },
  {
    id: 2,
    name: "Body Soft Bathing Scrubber",
    image: "/images/scrubber.jpg",
    discount: "-60%",
    oldPrice: "Ksh 150.00",
    price: "Ksh 60.00",
    reviews: 1,
  },
  {
    id: 3,
    name: "VICTAN White Standard Men’s",
    image: "/images/tissue.jpg",
    discount: "-46%",
    oldPrice: "Ksh 920.00",
    price: "Ksh 499.00",
    reviews: 3,
  },
  {
    id: 4,
    name: "4 in 1 Women Handbag",
    image: "/images/bag.jpg",
    discount: "-54%",
    oldPrice: "Ksh 2,849.00",
    price: "Ksh 1,299.00",
    reviews: 3,
  },
  {
    id: 5,
    name: "Nike Air Force 1 (White)",
    image: "/images/airforce.jpg",
    discount: "-36%",
    oldPrice: "Ksh 3,750.00",
    price: "Ksh 2,399.00",
    reviews: 2,
  },
  {
    id: 6,
    name: "Fashionable Beach Sandals",
    image: "/images/sandals.jpg",
    discount: "-41%",
    oldPrice: "Ksh 1,650.00",
    price: "Ksh 979.00",
    reviews: 1,
  },
  {
    id: 1,
    name: "Men’s Loafers Rubber Shoes",
    image: "/images/shoe1.jpg",
    discount: "-70%",
    oldPrice: "Ksh 4,990.00",
    price: "Ksh 1,480.00",
    reviews: 1,
  },
  {
    id: 2,
    name: "Body Soft Bathing Scrubber",
    image: "/images/scrubber.jpg",
    discount: "-60%",
    oldPrice: "Ksh 150.00",
    price: "Ksh 60.00",
    reviews: 1,
  },
  {
    id: 3,
    name: "VICTAN White Standard Men’s",
    image: "/images/tissue.jpg",
    discount: "-46%",
    oldPrice: "Ksh 920.00",
    price: "Ksh 499.00",
    reviews: 3,
  },
  {
    id: 4,
    name: "4 in 1 Women Handbag",
    image: "/images/bag.jpg",
    discount: "-54%",
    oldPrice: "Ksh 2,849.00",
    price: "Ksh 1,299.00",
    reviews: 3,
  },
];

const ProductCard = ({ product }) => (
  <div className="border border-white/10 hover:border-teal-600/40 transition w-full max-w-xl rounded-md p-3 bg-white hover:shadow-md transition">
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full text-black h-90 object-contain"
      />

      <span className="absolute top-2 left-2 bg-teal-400 text-black text-xs px-2 py-1 rounded-full">
        {product.discount}
      </span>
    </div>

    <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
      {"★★★★★"}
    </div>

    <p className="text-xs text-gray-500">
      {product.reviews} review{product.reviews > 1 && "s"}
    </p>

    <h3 className="text-sm font-medium mt-1 line-clamp-2">
      {product.name}
    </h3>

    <div className="mt-1">
      <span className="text-gray-400 line-through text-xs">
        {product.oldPrice}
      </span>
      <p className="text-black font-semibold">
        {product.price}
      </p>
    </div>
  </div>
);

  return (
     <main className="min-h-screen text-white">
      <section className="relative px-6 md:px-16 mb-1 py-44">
        <div className="justify-center text-center items-center max-w-5xl mx-auto">
          {/* <div className="w-74 h-74 lg:w-114 lg:h-114 bg-teal-400 rounded-full border-2 border-orange-400 overflow-hidden">
            <img src="/shopping-bag.png" alt="Profile" className="w-full h-full object-cover"/>
          </div> */}
          <span className="text-teal-400 text-sm tracking-widest uppercase">
            Indomitable <span className="text-white">APPAREL</span>
          </span>
          <h1 className="lg:text-5xl text-3xl font-black tracking-tight lg:my-5 my-2">
            A <span className="text-teal-400">detail-focused</span> clothing apparrel to fit your <span className="text-teal-400">style</span>
          </h1>
          <p className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed">
            Step into discovering your style with us
          </p>
          <p className="g:text-5xl text-xl font-medium lg:my-5 my-2y">
            "Fashion that speaks"
          </p>
        </div>
      </section>

      <section className="text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center font-black tracking-tight mb-2">
            What we <span className="text-teal-400">Sell</span>
          </h2>
          <section className="max-w-8xl w-full mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-24">
        <h2 className="text-center text-3xl text-white font-black tracking-tight mb-24">
          <span className="text-teal-400">Learn More </span> About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="w-74 h-74 lg:w-114 lg:h-114 rounded-full border-2 border-teal-400 overflow-hidden">
              <img src="/shopping-bag.png" alt="Profile" className="w-full h-full object-cover"/>
            </div>

            <h3 className="text-white text-xl text-center font-medium text-foreground/90 text-md leading-relaxed">Indomitable Boutique</h3>
              
            <div className="flex gap-4 text-xl text-primary">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="w-6 h-6 hover:text-teal-400 transition" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="w-6 h-6 hover:text-teal-400 transition" />
              </a>
              <a href="https://tiktok.com/@benais6">
              <FaTiktok className="w-6 h-6 hover:text-teal-400 transition" />
              </a>
            </div>
          </div>

          <div className="bg-[#151515] border border-white/10 hover:border-teal-400/40 transition rounded-2xl p-6 w-full max-w-xl">
            <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300">
              Education
            </span>

            <h3 className="lg:text-3xl text-3xl font-black tracking-tight lg:my-5 my-2">
              Moringa School
            </h3>

            <p className="text-sm tracking-widest text-gray-400 mt-1">
              Junior Software Engineer
            </p>
            <p className="text-sm text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
              Feb 2025 – Jul 2025
            </p>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              The Challenge
            </h4>
            <p className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-3">
              The software development curriculum needed modernization to prepare
              students for real-world engineering challenges.
            </p>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              What I Did
            </h4>
            <ul className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
              <li>• Learnt how to be a problem solver using codes</li>
              <li>• Integrated debugging & UI/UX principles</li>
              <li>• Applied Agile workflows</li>
            </ul>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-3">
              Results
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-teal-400 rounded-xl p-4 text-center">
                <p className="text-teal-400 text-xl font-semibold">40%</p>
                <p className="text-gray-300 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Practical Skills</p>
              </div>
              <div className="border border-teal-400 rounded-xl p-4 text-center">
                <p className="text-teal-400 text-xl font-semibold">60%</p>
                <p className="text-gray-300 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Problem Solving</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[ "Open to feedback", "Transparent", "Honest", "+5 years experience" ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#151515] border border-white/10 hover:border-teal-400/40 transition rounded-2xl p-6 w-full max-w-xl">
            <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300">
              Education
            </span>

            <h3 className="lg:text-3xl text-3xl font-black tracking-tight lg:my-5 my-2">
              Moringa School
            </h3>

            <p className="text-sm tracking-widest text-gray-400 mt-1">
              Junior Software Engineer
            </p>
            <p className="text-sm text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
              Feb 2025 – Jul 2025
            </p>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              The Challenge
            </h4>
            <p className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-3">
              The software development curriculum needed modernization to prepare
              students for real-world engineering challenges.
            </p>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              What I Did
            </h4>
            <ul className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
              <li>• Learnt how to be a problem solver using codes</li>
              <li>• Integrated debugging & UI/UX principles</li>
              <li>• Applied Agile workflows</li>
            </ul>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-3">
              Results
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-teal-400 rounded-xl p-4 text-center">
                <p className="text-teal-400 text-xl font-semibold">40%</p>
                <p className="text-gray-300 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Practical Skills</p>
              </div>
              <div className="border border-teal-400 rounded-xl p-4 text-center">
                <p className="text-teal-400 text-xl font-semibold">60%</p>
                <p className="text-gray-300 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Problem Solving</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "Node", "Python", "Django", "JavaScript", "Git"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#151515] border border-white/10 hover:border-teal-400/40 transition rounded-2xl p-6 w-full max-w-xl">
            <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300">
              Skills
            </span>

            <h3 className="lg:text-3xl text-3xl font-black tracking-tight lg:my-5 my-2">
              What I Work With
            </h3>
            <p className="text-sm tracking-widest text-gray-400 mt-1">
              Junior Software Engineer
            </p>
            <p className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
               Solid at building modern UIs with React, Next.js, and Tailwind CSS.
               I care about layout, spacing, and flow — not just “does it work”, but “does it feel right”.
            </p>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
              Skills I Work With
            </h4>
            <ul className="text-gray-300 text-lg font-medium text-foreground/90 text-md leading-relaxed mb-2">
              <li>• JavaScript Fundamentals</li>
              <li>• UI implimentations & Design Sense</li>
              <li>• Debugging & Problem Solving</li>
              <li>• Version Control (Git & GitHub)</li>
              <li>• Real-World Problem Translation</li>
              <li>• Feedback-Friendly</li>
            </ul>

            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-3">
              Results
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-teal-400 rounded-xl p-4 text-center">
                <p className="text-teal-400 text-xl font-semibold">100%</p>
                <p className="text-gray-300 text-md font-medium text-foreground/90 text-md leading-relaxed mb-2">Practical Skills</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
