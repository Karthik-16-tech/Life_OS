import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { useState, useRef, useEffect } from "react";
import { Send, Mic, Bot, User } from "lucide-react";

interface Message { role: "user" | "ai"; text: string; }

const initialMessages: Message[] = [
  { role: "ai", text: "Hello! I'm your AI Health Doctor. How can I help you today? You can ask me about symptoms, medications, or general health advice." },
];

const aiResponses: Record<string, string> = {
  headache: "Headaches can have many causes including dehydration, stress, or lack of sleep. I recommend drinking water, resting in a dark room, and monitoring if it persists beyond 24 hours.",
  sleep: "Quality sleep is essential. Try maintaining a consistent schedule, avoiding screens 1hr before bed, and keeping your room cool (65-68°F).",
  stress: "Chronic stress impacts your cardiovascular and immune systems. Try deep breathing (4-7-8 technique), regular exercise, and consider mindfulness meditation.",
  default: "That's a great question. Based on general health guidelines, I'd recommend consulting with your primary care physician for personalized advice. In the meantime, maintain a balanced diet and regular exercise routine.",
};

const AIDoctor = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      const key = Object.keys(aiResponses).find((k) => input.toLowerCase().includes(k)) || "default";
      setMessages((prev) => [...prev, { role: "ai", text: aiResponses[key] }]);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">AI Doctor</h1>
        <p className="text-sm text-muted-foreground">Your personal health assistant</p>
      </div>

      <GlassCard className="flex flex-col h-[calc(100vh-180px)]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${
                msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "glass rounded-bl-md text-foreground"
              }`}>
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about your health..."
            className="flex-1 bg-secondary/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary/50 transition-colors"
          />
          <button onClick={send} className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

export default AIDoctor;
