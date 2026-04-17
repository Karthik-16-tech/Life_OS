import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Brain,
  Stethoscope,
  Dumbbell,
  Clock,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, path: "/dashboard", label: "Dashboard" },
  { icon: UtensilsCrossed, path: "/food", label: "Food Intelligence" },
  { icon: Brain, path: "/mind", label: "Mind Mirror" },
  { icon: Stethoscope, path: "/doctor", label: "AI Doctor" },
  { icon: Dumbbell, path: "/fitness", label: "Fitness" },
  { icon: Clock, path: "/timemachine", label: "Time Machine" },
  { icon: Settings, path: "/settings", label: "Settings" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col items-center py-6 w-[72px]"
    >
      <div className="glass-strong rounded-2xl py-4 px-2 flex flex-col items-center gap-1 mt-16 flex-1 max-h-[480px]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10 glow-blue"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 w-5 h-5" />
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
