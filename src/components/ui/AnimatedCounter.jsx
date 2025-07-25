import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedCounter = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = parseInt(targetNumber.replace(/\D/g, ""), 10); // Remove non-numeric
    const increment = end / (duration / 16); // Assume ~60fps
    let current = start;

    const step = () => {
      current += increment;
      if (current < end) {
        setCount(Math.floor(current));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, targetNumber, duration]);

  return (
    <div ref={ref}>
      {count}
      {targetNumber.match(/\D+$/)?.[0] || ""}
    </div>
  );
};

export default AnimatedCounter;