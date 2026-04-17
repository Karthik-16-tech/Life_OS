import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { useState, useMemo } from "react";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tooltipStyle = {
  background: "hsl(220, 30%, 10%)", border: "1px solid hsl(220, 20%, 20%)",
  borderRadius: "12px", color: "hsl(210, 40%, 95%)",
};

const TimeMachine = () => {
  const [sleep, setSleep] = useState(6);
  const [diet, setDiet] = useState(5);
  const [stress, setStress] = useState(7);
  const [activity, setActivity] = useState(4);

  const predictionData = useMemo(() => {
    const current = 50 + (sleep * 1.5) + (diet * 2) - (stress * 2.5) + (activity * 1.8);
    const optimized = 50 + (8 * 1.5) + (9 * 2) - (2 * 2.5) + (8 * 1.8);
    return Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      current: Math.min(100, Math.max(10, current + (i * (current > 60 ? 0.5 : -1.5)) + Math.random() * 5)),
      optimized: Math.min(100, Math.max(10, optimized + (i * 1.2) + Math.random() * 3)),
    }));
  }, [sleep, diet, stress, activity]);

  const sliders = [
    { label: "Sleep (hrs)", value: sleep, set: setSleep, max: 10 },
    { label: "Diet Quality", value: diet, set: setDiet, max: 10 },
    { label: "Stress Level", value: stress, set: setStress, max: 10 },
    { label: "Activity Level", value: activity, set: setActivity, max: 10 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Time Machine</h1>
        <p className="text-sm text-muted-foreground">Simulate your future health outcomes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-medium text-foreground">Lifestyle Inputs</h3>
          </div>
          <div className="space-y-6">
            {sliders.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-xs font-medium text-foreground">{s.value}</span>
                </div>
                <input
                  type="range" min={0} max={s.max} value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.2} className="lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Health Prediction (12 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
              <XAxis dataKey="month" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="current" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={false} name="Current Path" />
              <Line type="monotone" dataKey="optimized" stroke="hsl(221, 83%, 53%)" strokeWidth={2} dot={false} name="Optimized Path" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Current Future</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Optimized Future</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default TimeMachine;
