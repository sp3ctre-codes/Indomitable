import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer({ onOpenMen, onOpenWomen, onOpenUnisex }) {
  const formRef = useRef();

  const footerActions = {
    Men: onOpenMen,
    Women: onOpenWomen,
    Unisex: onOpenUnisex,
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_knfiqfv",
        "template_dk9mman",
        formRef.current,
        "3Ul777UgRgBXbQAcJ"
      )
      .then(() => {
        alert("Message sent");
        e.target.reset();
      })
      .catch((error) => {
        console.error("EMAILJS ERROR:", error);
        alert("Email failed — check console");
      });
  };

  // 👇 Framer Motion variant for the footer drift effect
  const footerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.footer
      className="relative text-black px-6 md:px-16 pt-16 pb-8"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ twice: true, amount: 0.25 }} // animate once, stay visible
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-black/50 to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* SHOP (optional) */}
          {/* <div>
            <h3 className="font-bold text-2xl mb-4">Shop</h3>
            {Object.keys(footerActions).map((label) => (
              <button
                key={label}
                onClick={() => footerActions[label]?.()}
                className="block hover:underline text-black px-3 py-1 relative group"
              >
                {label}
              </button>
            ))}
          </div> */}

          {/* CONNECT */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Connect</h3>
            <p className="mb-2">
              Email:{" "}
              <a href="mailto:gerradsaruni21@gmail.com" className="hover:underline">
                gerradsaruni21@gmail.com
              </a>
            </p>
            <p className="mb-2">
              WhatsApp:{" "}
              <a
                href="https://wa.me/254726862078"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                +254 726 862 078
              </a>
            </p>
            <p className="mb-2">
              Join our WhatsApp Community:{" "}
              <a
                href="https://chat.whatsapp.com/..."
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                WhatsApp Group
              </a>
            </p>

            <div className="flex gap-4 mt-4 text-xl text-black">
              <FaInstagram className="hover:text-black transition" />
              <FaFacebook className="hover:text-black transition" />
              <FaTiktok className="hover:text-black transition" />
            </div>
          </div>

          {/* HELP */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Help</h3>
            <ul className="space-y-2 text-black">
              <li>
                <a href="/shipping" className="hover:underline">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="/order-tracking" className="hover:underline">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="/payment" className="hover:underline">
                  Payment Options
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Company</h3>
            <ul className="space-y-2 text-black">
              <li>
                <a href="/AboutPage" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:underline">
                  Purpose
                </a>
              </li>
              <li>
                <a href="/order-tracking" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/payment" className="hover:underline">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* FEEDBACK */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Give Feedback</h3>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-3">
              <input
                type="email"
                name="from_email"
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-gray-300 rounded-md text-black"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your message"
                required
                className="w-full px-4 py-2 bg-gray-300 rounded-md text-black resize-none"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black/40 hover:text-black transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-black">
          © {new Date().getFullYear()} Indomitable Boutique
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
