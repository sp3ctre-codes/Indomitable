import React, { useEffect, useRef, useState } from "react";
import Checkout from "../components/Checkout";
import { Helmet } from "react-helmet";

const AnimatedScrollWrapper = ({ children }) => {
  const containerRef = useRef();
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const nodes = Array.from(containerRef.current.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = nodes.indexOf(entry.target);
            setVisibleItems((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => nodes.forEach((node) => observer.unobserve(node));
  }, [children]);

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child, idx) => (
        <div
          style={{ transitionDelay: `${idx * 150}ms` }}
          className={`transform transition-all duration-700 ease-out ${
            visibleItems.includes(idx)
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-10 scale-95 blur-sm"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Indomitable Boutique</title>
      </Helmet>
      <div className="bg-wrapper">
        <AnimatedScrollWrapper>
          <Checkout />
        </AnimatedScrollWrapper>
      </div>
    </>
  );
}

export default CheckoutPage;
