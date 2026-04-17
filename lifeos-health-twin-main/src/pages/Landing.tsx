import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Brain,
  Shield,
  Utensils,
  BarChart3,
  Zap,
  Clock,
  Stethoscope,
} from "lucide-react";
import MetaballBackground from "@/components/MetaballBackground";
import LandingNavbar from "@/components/LandingNavbar";
import UIVerseButton from "@/components/UIVerseButton";

const features = [
  { icon: Activity, title: "Health Analytics", desc: "Real-time monitoring with AI-driven health scoring and predictive trends." },
  { icon: Brain, title: "Mind Mirror", desc: "Emotion detection and mental stability tracking with actionable insights." },
  { icon: Utensils, title: "Food Intelligence", desc: "Snap a photo of your meal and get instant nutritional breakdown." },
  { icon: Shield, title: "Predictive AI", desc: "Simulate future health outcomes and optimize your lifestyle today." },
  { icon: Stethoscope, title: "AI Doctor", desc: "Chat with an AI medical assistant for personalized health guidance." },
  { icon: Clock, title: "Time Machine", desc: "See how today's choices shape your health 5, 10, 20 years from now." },
];

const dashboardPreviewCards = [
  { label: "Calories", value: "1,842", change: "-12%", color: "text-accent" },
  { label: "Steps", value: "8,432", change: "+18%", color: "text-primary" },
  { label: "Sleep", value: "7.2h", change: "+5%", color: "text-purple-400" },
  { label: "Stress", value: "Low", change: "Stable", color: "text-emerald-400" },
];

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <LandingNavbar />

      {/* ======== HERO ======== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <MetaballBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background z-[1]" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Health Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
              <span className="text-foreground">Your Health.</span>
              <br />
              <span className="text-gradient-blue">Under Control.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
              AI-powered insights to predict and improve your future.
              Your digital twin monitors, analyzes, and optimizes everything.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <UIVerseButton to="/dashboard" text="Get Started" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ======== FEATURES ======== */}
      <section id="features" className="relative z-10 py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to <span className="text-gradient-blue">Thrive</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">A complete AI health operating system designed for the future of personal wellness.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass rounded-2xl p-6 group hover:border-primary/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======== DASHBOARD PREVIEW ======== */}
      <section id="product" className="relative z-10 py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">Dashboard</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your Health at a <span className="text-gradient-blue">Glance</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Real-time metrics, AI predictions, and actionable recommendations — all in one place.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-strong rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dashboardPreviewCards.map((c) => (
              <div key={c.label} className="glass rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{c.label}</p>
                <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{c.change}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
            <BarChart3 className="w-10 h-10 text-primary/40 mb-3" />
            <p className="text-sm text-muted-foreground">AI Health Trend Analysis</p>
            <div className="flex gap-1 mt-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-2 rounded-full bg-primary/30" style={{ height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}px` }} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======== AI INSIGHTS ======== */}
      <section id="insights" className="relative z-10 py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">AI Insights</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powered by <span className="text-gradient-blue">Intelligence</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">LifeOS doesn't just track — it thinks. Our AI analyzes patterns across your health data to surface insights you'd never find on your own.</p>
            <div className="space-y-4">
              {[
                { icon: Zap, text: "Real-time health anomaly detection" },
                { icon: Brain, text: "Mental state prediction and intervention" },
                { icon: Shield, text: "Preventive health risk simulation" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl font-medium text-sm text-primary-foreground bg-gradient-to-r from-primary to-accent transition-all duration-300 hover:scale-[1.03]">
              Explore Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
            {[
              { title: "Stress Pattern Detected", desc: "Your cortisol levels spike every Tuesday. Consider scheduling lighter workloads.", severity: "warning" },
              { title: "Sleep Optimization", desc: "Moving bedtime 30 minutes earlier could improve recovery by 23%.", severity: "info" },
              { title: "Nutrition Gap Found", desc: "Vitamin D levels trending down. Increase sun exposure or consider supplements.", severity: "alert" },
            ].map((insight, i) => (
              <motion.div key={insight.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="glass rounded-2xl p-5 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${insight.severity === "warning" ? "bg-amber-400" : insight.severity === "alert" ? "bg-red-400" : "bg-primary"}`} />
                  <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Landing;
