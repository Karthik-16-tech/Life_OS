import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Activity, Brain, Heart, AlertTriangle, Zap, TrendingUp, Droplets, Moon } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const healthTrend = [
  { name: "Mon", score: 72, calories: 1850 },
  { name: "Tue", score: 78, calories: 2100 },
  { name: "Wed", score: 74, calories: 1920 },
  { name: "Thu", score: 82, calories: 1780 },
  { name: "Fri", score: 88, calories: 2050 },
  { name: "Sat", score: 85, calories: 2200 },
  { name: "Sun", score: 91, calories: 1900 },
];

const weeklyActivity = [
  { day: "Mon", value: 65 }, { day: "Tue", value: 80 }, { day: "Wed", value: 55 },
  { day: "Thu", value: 90 }, { day: "Fri", value: 75 }, { day: "Sat", value: 95 },
  { day: "Sun", value: 60 },
];

const bodyComposition = [
  { name: "Muscle", value: 42, fill: "hsl(221, 83%, 53%)" },
  { name: "Fat", value: 18, fill: "hsl(187, 80%, 53%)" },
  { name: "Water", value: 55, fill: "hsl(270, 60%, 55%)" },
  { name: "Bone", value: 15, fill: "hsl(215, 16%, 46%)" },
];

const tooltipStyle = {
  background: "hsl(220, 30%, 10%)",
  border: "1px solid hsl(220, 20%, 20%)",
  borderRadius: "12px",
  color: "hsl(210, 40%, 95%)",
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your health intelligence overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Health Score", value: "92", sub: "+3.2% this week", icon: Heart, color: "text-primary" },
          { label: "Mental State", value: "78%", sub: "Stable", icon: Brain, color: "text-accent" },
          { label: "Activity Level", value: "High", sub: "12,400 steps", icon: Activity, color: "text-purple-400" },
          { label: "Risk Level", value: "Low", sub: "All clear", icon: AlertTriangle, color: "text-emerald-400" },
        ].map((card, i) => (
          <GlassCard key={i} delay={i * 0.1}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{card.label}</span>
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* AI Assistant + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="lg:col-span-2 relative overflow-hidden" delay={0.2}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">AI Health Assistant</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your digital twin is analyzing patterns...
              </p>
              <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Zap className="w-4 h-4 inline mr-2" />
                Analyze Now
              </button>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 rounded-full opacity-60"
              style={{
                background: "conic-gradient(from 0deg, hsl(221 83% 53% / 0.3), hsl(187 80% 53% / 0.3), hsl(270 60% 55% / 0.3), hsl(221 83% 53% / 0.3))",
                filter: "blur(1px)",
              }}
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        </GlassCard>

        <GlassCard delay={0.3}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: "Hydration", value: "2.4L / 3L", pct: 80, icon: Droplets, color: "bg-accent" },
              { label: "Sleep Quality", value: "7.8h", pct: 85, icon: Moon, color: "bg-primary" },
              { label: "Recovery", value: "92%", pct: 92, icon: TrendingUp, color: "bg-purple-500" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{stat.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${stat.color}`} style={{ width: `${stat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard delay={0.4}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Health Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={healthTrend}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="score" stroke="hsl(221, 83%, 53%)" fill="url(#healthGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(221, 83%, 53%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.5}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="hsl(187, 80%, 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Body Composition + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard delay={0.6}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Body Composition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={bodyComposition} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} strokeWidth={0}>
                {bodyComposition.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {bodyComposition.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.7} className="lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">AI Insights</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { text: "Your health score improved 8% this week", type: "success" },
              { text: "Hydration levels below target — drink more water", type: "warning" },
              { text: "Sleep pattern is consistent and healthy", type: "success" },
              { text: "Consider adding 15 min morning stretching", type: "info" },
            ].map((insight, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
                insight.type === "success" ? "bg-emerald-500/8" : insight.type === "warning" ? "bg-amber-500/8" : "bg-primary/8"
              }`}>
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  insight.type === "success" ? "bg-emerald-400" : insight.type === "warning" ? "bg-amber-400" : "bg-primary"
                }`} />
                <p className="text-sm text-foreground">{insight.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
