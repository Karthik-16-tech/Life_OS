import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-4 left-4 z-50 h-12 flex items-center justify-between px-5 rounded-2xl glass-strong">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <span className="text-primary font-bold text-xs">L</span>
        </div>
        <span className="text-foreground font-semibold text-sm tracking-wide hidden sm:block">
          LifeOS
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <User className="w-4 h-4" />
        </button>
        <Link
          to="/"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
