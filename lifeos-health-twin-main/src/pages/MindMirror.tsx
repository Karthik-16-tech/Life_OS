import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Brain, Eye, Smile, AlertCircle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar,
} from "recharts";

const moodData = [
  { time: "8AM", mood: 65 }, { time: "10AM", mood: 72 }, { time: "12PM", mood: 68 },
  { time: "2PM", mood: 55 }, { time: "4PM", mood: 60 }, { time: "6PM", mood: 75 },
  { time: "8PM", mood: 80 },
];

const stressSleep = [
  { day: "Mon", stress: 40, sleep: 7.5 }, { day: "Tue", stress: 55, sleep: 6.5 },
  { day: "Wed", stress: 35, sleep: 8 }, { day: "Thu", stress: 60, sleep: 6 },
  { day: "Fri", stress: 45, sleep: 7 }, { day: "Sat", stress: 25, sleep: 8.5 },
  { day: "Sun", stress: 30, sleep: 8 },
];

const weeklyStability = [
  { day: "Mon", score: 72 }, { day: "Tue", score: 68 }, { day: "Wed", score: 78 },
  { day: "Thu", score: 65 }, { day: "Fri", score: 80 }, { day: "Sat", score: 88 },
  { day: "Sun", score: 85 },
];

const tooltipStyle = {
  background: "hsl(220, 30%, 10%)", border: "1px solid hsl(220, 20%, 20%)",
  borderRadius: "12px", color: "hsl(210, 40%, 95%)",
};

const MindMirror = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mind Mirror</h1>
        <p className="text-sm text-muted-foreground">AI mental state analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Emotion", value: "Calm", icon: Smile, color: "text-accent" },
          { label: "Stability", value: "82%", icon: Brain, color: "text-primary" },
          { label: "Stress Level", value: "Low", icon: AlertCircle, color: "text-emerald-400" },
          { label: "Focus Score", value: "88", icon: Eye, color: "text-purple-400" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard delay={0.2} className="lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Mood Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={moodData}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 80%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 80%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="time" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="mood" stroke="hsl(187, 80%, 53%)" fill="url(#moodGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(187, 80%, 53%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.3}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Mental Stability</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyStability}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 46%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="hsl(187, 80%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.4}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Stress vs Sleep</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={stressSleep}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="day" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="stress" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 84%, 60%)" }} name="Stress" />
              <Line type="monotone" dataKey="sleep" stroke="hsl(221, 83%, 53%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(221, 83%, 53%)" }} name="Sleep (hrs)" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">Stress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Sleep</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.5}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">AI Insights</h3>
          <div className="space-y-3">
            {[
              { text: "Stress levels peak in early afternoon — schedule breaks", type: "warning" },
              { text: "Mood improves significantly in the evening", type: "success" },
              { text: "Recommend 10 min meditation at 2PM", type: "info" },
              { text: "Sleep quality correlates with lower next-day stress", type: "success" },
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

export default MindMirror;
