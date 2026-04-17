import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            title: "Profile", icon: User, items: [
              { label: "Name", value: "Alex Johnson" },
              { label: "Email", value: "alex@lifeos.ai" },
              { label: "Age", value: "28" },
            ]
          },
          {
            title: "Notifications", icon: Bell, items: [
              { label: "Health Alerts", value: "Enabled" },
              { label: "Daily Summary", value: "Enabled" },
              { label: "Reminders", value: "Enabled" },
            ]
          },
          {
            title: "Privacy & Security", icon: Shield, items: [
              { label: "Data Sharing", value: "Disabled" },
              { label: "Two-Factor Auth", value: "Enabled" },
              { label: "Data Export", value: "Available" },
            ]
          },
          {
            title: "Appearance", icon: Palette, items: [
              { label: "Theme", value: "Dark" },
              { label: "Language", value: "English" },
              { label: "Units", value: "Metric" },
            ]
          },
        ].map((section, i) => (
          <GlassCard key={i} delay={i * 0.1}>
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
            </div>
            <div className="space-y-3">
              {section.items.map((item, j) => (
                <div key={j} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
