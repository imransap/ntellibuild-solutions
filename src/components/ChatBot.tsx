import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! 👋 I'm SmartRunAI Assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const botResponses: Record<string, string> = {
  pricing: "Our pricing varies based on project scope. Simple automations start at $5,000, while enterprise solutions range from $50,000+. Would you like to schedule a call to discuss your specific needs?",
  demo: "I'd be happy to help you schedule a demo! Click the 'Book a Demo' button in the navigation, or I can guide you through the process. What time works best for you?",
  services: "We offer workflow automation, email automation, lead generation, analytics & reporting, customer support AI, and more. Which service interests you most?",
  timeline: "Implementation typically takes 1-8 weeks depending on complexity. Simple automations can be live within a week, while enterprise solutions take 4-8 weeks.",
  default: "Thanks for your message! For detailed inquiries, I recommend speaking with our team. Would you like to schedule a consultation or ask about a specific service?",
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
      return botResponses.pricing;
    }
    if (lowerMessage.includes("demo") || lowerMessage.includes("trial")) {
      return botResponses.demo;
    }
    if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("what do you")) {
      return botResponses.services;
    }
    if (lowerMessage.includes("time") || lowerMessage.includes("long") || lowerMessage.includes("timeline")) {
      return botResponses.timeline;
    }
    return botResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center shadow-lg hover:scale-110 transition-all glow ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-crimson/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    SmartRunAI
                  </div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.isBot ? "" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.isBot
                      ? "bg-gradient-to-br from-crimson to-crimson-dark"
                      : "bg-secondary"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.isBot
                      ? "bg-secondary text-foreground rounded-bl-md"
                      : "bg-gradient-to-r from-crimson to-crimson-dark text-white rounded-br-md"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-secondary/50 border-border/50"
              />
              <Button type="submit" variant="hero" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
