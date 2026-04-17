import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);
  const letters = "LifeOS".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="preloader-wrapper"
        >
          <div className="loader-wrapper">
            <div className="loader-spinner" />
            <div className="relative z-10 flex">
              {letters.map((letter, i) => (
                <span key={i} className="loader-letter text-xl font-light tracking-wider">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
