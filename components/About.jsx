import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-16 py-28 bg-white text-black"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-black tracking-tight mb-20">
          Learn More <span className="text-black/70">About Us</span>
        </h2>

        <div className="space-y-12 text-[17px] leading-relaxed text-black/80">
          <p>
            This boutique was created with a simple idea in mind: style should
            feel personal, not forced. Every piece is chosen for how it fits
            into real life, not just how it looks on a screen. We focus on
            detail, balance, and quality—clothing that speaks quietly but with
            confidence. Nothing here is random or rushed. Each collection is
            curated to stand on its own while still working effortlessly with
            the rest of your wardrobe. This is fashion for people who notice the
            little things—the stitching, the fabric, the silhouette, the moment
            when something just fits right.
          </p>

          <p>
            Our collections move across menswear, womenswear, and unisex designs
            without boxing anyone in. Style isn’t about labels or rules—it’s
            about expression, comfort, and identity. Some pieces are bold,
            others understated, but all are made to be worn with confidence.
            We design for versatility, so what you wear today still feels right
            tomorrow. Trends come and go, but good taste lasts. Here,
            individuality is assumed, not marketed.
          </p>

          <p>
            At the core of this boutique is a respect for authenticity. We don’t
            chase noise or overproduce ideas. We take our time, refine our
            selections, and let the clothing speak for itself. This is a space
            for people who value intention over impulse—who want their wardrobe
            to reflect who they are, not who they’re told to be. Style isn’t
            about owning more. It’s about choosing better. And when something
            truly fits you, it shows without saying a word.
          </p>
        </div>

        {/* Socials */}
        <div className="mt-20 flex justify-center gap-6 text-black/60">
          <a href="#" className="hover:text-black transition">
            <FaInstagram size={22} />
          </a>
          <a href="#" className="hover:text-black transition">
            <FaFacebook size={22} />
          </a>
          <a href="#" className="hover:text-black transition">
            <FaTiktok size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
