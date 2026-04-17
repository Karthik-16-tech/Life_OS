import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { useState } from "react";
import { Upload, Apple, Flame, Droplets, Wheat } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PieChart, Pie, Cell,
} from "recharts";

const macroData = [
  { name: "Protein", value: 32, fill: "hsl(221, 83%, 53%)" },
  { name: "Carbs", value: 45, fill: "hsl(187, 80%, 53%)" },
  { name: "Fat", value: 18, fill: "hsl(270, 60%, 55%)" },
  { name: "Fiber", value: 8, fill: "hsl(150, 60%, 50%)" },
];

const ingredientData = [
  { name: "Rice", amount: 45 }, { name: "Chicken", amount: 30 },
  { name: "Vegetables", amount: 15 }, { name: "Sauce", amount: 10 },
];

const healthScore = [{ name: "Score", value: 74, fill: "hsl(187, 80%, 53%)" }];

const tooltipStyle = {
  background: "hsl(220, 30%, 10%)", border: "1px solid hsl(220, 20%, 20%)",
  borderRadius: "12px", color: "hsl(210, 40%, 95%)",
};

const FoodIntelligence = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Food Intelligence</h1>
        <p className="text-sm text-muted-foreground">AI-powered nutritional analysis</p>
      </div>

      {!uploaded ? (
        <GlassCard className="max-w-lg mx-auto text-center py-16">
          <div onClick={() => setUploaded(true)} className="cursor-pointer border-2 border-dashed border-primary/30 rounded-2xl p-12 hover:border-primary/60 transition-colors">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium mb-1">Upload Food Image</p>
            <p className="text-xs text-muted-foreground">Click to analyze any meal</p>
          </div>
        </GlassCard>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Food Detected", value: "Chicken Rice Bowl", icon: Apple, color: "text-primary" },
              { label: "Calories", value: "485 kcal", icon: Flame, color: "text-accent" },
              { label: "Protein", value: "32g", icon: Droplets, color: "text-purple-400" },
              { label: "Carbs", value: "45g", icon: Wheat, color: "text-primary" },
            ].map((card, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{card.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </div>
                <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <GlassCard delay={0.2} className="lg:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Macronutrient Breakdown</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={macroData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
                  <XAxis dataKey="name" stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(215, 16%, 46%)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {macroData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard delay={0.3}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Health Impact Score</h3>
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={healthScore} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(220, 20%, 14%)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <p className="text-center text-2xl font-bold text-accent mt-[-40px] relative z-10">74/100</p>
              <p className="text-center text-xs text-muted-foreground mt-1">Good</p>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GlassCard delay={0.4}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Ingredient Analysis</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={ingredientData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={70} strokeWidth={0}>
                    {ingredientData.map((_, i) => (
                      <Cell key={i} fill={["hsl(221, 83%, 53%)", "hsl(187, 80%, 53%)", "hsl(270, 60%, 55%)", "hsl(150, 60%, 50%)"][i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard delay={0.5}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">AI Insights</h3>
              <div className="space-y-3">
                {[
                  { text: "Balanced macronutrient profile detected", type: "success" },
                  { text: "High sodium content — consider reducing sauce", type: "warning" },
                  { text: "Good protein-to-calorie ratio", type: "success" },
                  { text: "Low fiber — add more vegetables", type: "warning" },
                ].map((insight, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${insight.type === "success" ? "bg-emerald-500/8" : "bg-amber-500/8"}`}>
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${insight.type === "success" ? "bg-emerald-400" : "bg-amber-400"}`} />
                    <p className="text-sm text-foreground">{insight.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <button onClick={() => setUploaded(false)} className="mt-6 px-6 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Analyze Another
          </button>
        </>
      )}
    </DashboardLayout>
  );
};

export default FoodIntelligence;
