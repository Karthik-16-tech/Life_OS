import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Dumbbell, Footprints, Flame, Leaf, Bell } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from "recharts";

const dailyActivity = [
  { day: "Mon", steps: 8200, calories: 420 }, { day: "Tue", steps: 10500, calories: 520 },
  { day: "Wed", steps: 7100, calories: 380 }, { day: "Thu", steps: 11200, calories: 560 },
  { day: "Fri", steps: 9400, calories: 480 }, { day: "Sat", steps: 12800, calories: 640 },
  { day: "Sun", steps: 6500, calories: 340 },
];

const monthlyProgress = [
  { week: "W1", fitness: 65 }, { week: "W2", fitness: 70 }, { week: "W3", fitness: 72 },
  { week: "W4", fitness: 78 },
];

const meditationData = [
  { day: "Mon", mins: 15 }, { day: "Tue", mins: 20 }, { day: "Wed", mins: 10 },
  { day: "Thu", mins: 25 }, { day: "Fri", mins: 15 }, { day: "Sat", mins: 30 },
  { day: "Sun", mins: 20 },
];

const tooltipStyle = {
  background: "hsl(220, 30%, 10%)", border: "1px solid hsl(220, 20%, 20%)",
  borderRadius: "12px", color: "hsl(210, 40%, 95%)",
};

const Fitness = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Fitness & Meditation</h1>
        <p className="text-sm text-muted-foreground">Track your daily activity and mindfulness</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Steps Today", value: "9,432", icon: Footprints, color: "text-primary" },
          { label: "Calories Burned", value: "487", icon: Flame, color: "text-accent" },
          { label: "Exercise Time", value: "45 min", icon: Dumbbell, color: "text-purple-400" },
          { label: "Calm Score", value: "85", icon: Leaf, color: "text-emerald-400" },
        ].map((card, i) => (
          <GlassCard key={i} delay={i * 0.1}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{card.label}</span>
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard delay={0.2}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="steps" fill="hsl(221, 83%, 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.3}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Meditation Consistency</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={meditationData}>
              <defs>
                <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 80%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 80%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="mins" stroke="hsl(187, 80%, 53%)" fill="url(#medGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(187, 80%, 53%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard delay={0.4} className="lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Monthly Fitness Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="week" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="fitness" stroke="hsl(270, 60%, 55%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(270, 60%, 55%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.5}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Reminders</h3>
          <div className="space-y-3">
            {[
              { text: "Morning workout at 7:00 AM", icon: Dumbbell, time: "2h left" },
              { text: "Meditation session at 2:00 PM", icon: Leaf, time: "8h left" },
              { text: "Evening walk at 6:00 PM", icon: Footprints, time: "12h left" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <r.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{r.text}</p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </div>
                <Bell className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Fitness;
