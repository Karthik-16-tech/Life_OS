import { ReactNode } from "react";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AppSidebar />
      <main className="pt-20 pl-[72px] min-h-screen">
        <div className="p-6 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
