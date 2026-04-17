import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Insights", href: "#insights" },
];

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-4 left-[18%] z-50 flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 w-[90%] max-w-3xl",
        scrolled
          ? "glass-strong shadow-lg shadow-black/30"
          : "bg-transparent border border-transparent"
      )}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center glow-blue">
          <span className="text-primary font-bold text-sm">L</span>
        </div>
        <span className="text-foreground font-semibold text-sm tracking-wide">
          LifeOS
        </span>
      </Link>

      {/* Center nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>

      {/* Right CTA */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          Login
        </Link>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;
