// src/components/Clients.jsx
import { useEffect, useRef, useState } from "react";

const Clients = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);
  const targetNumber = 20;
  const duration = 1500; // animation duration in ms

  const animateCount = () => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easedProgress = Math.min(progress / duration, 1); // 0 → 1

      setCount(Math.floor(easedProgress * targetNumber));

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount();
          } else {
            // Reset count when section goes out of view
            setCount(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-heading py-16 px-6 text-white flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Over{" "}
        <span
          className={`text-6xl md:text-7xl text-azure-soft inline-block transition-transform duration-300 ${
            count === targetNumber ? "scale-125" : "scale-100"
          }`}
        >
          {count}
        </span>{" "}
        clients attended to
      </h2>
      <p className="text-lg md:text-xl text-azure-soft max-w-xl">
        We’re proud to serve our clients with excellence every day. Your success is our mission.
      </p>
      <div className="mt-10 w-24 h-1 bg-azure-soft rounded-full"></div>
    </section>
  );
};

export default Clients;
