import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Database, 
  MessageSquare, 
  BarChart3, 
  ArrowRight,
  Zap,
  CheckCircle2,
  Play,
  RotateCcw
} from "lucide-react";

const automationSteps = [
  { id: 1, icon: Zap, label: "New Lead Captured", color: "from-yellow-500 to-orange-500", description: "Form submission detected" },
  { id: 2, icon: Database, label: "Data Stored", color: "from-green-500 to-emerald-500", description: "Lead saved to CRM" },
  { id: 3, icon: MessageSquare, label: "AI Analysis", color: "from-purple-500 to-pink-500", description: "Lead score: 87/100" },
  { id: 4, icon: Mail, label: "Email Sent", color: "from-blue-500 to-cyan-500", description: "Personalized welcome email" },
  { id: 5, icon: BarChart3, label: "Analytics Updated", color: "from-crimson to-crimson-dark", description: "Dashboard refreshed" },
];

export const WorkflowBuilder = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const runDemo = () => {
    setIsRunning(true);
    setCompletedSteps([]);
    setActiveStep(0);

    automationSteps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
        setCompletedSteps(prev => [...prev, index]);
        
        if (index === automationSteps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
          }, 1000);
        }
      }, (index + 1) * 1200);
    });
  };

  const resetDemo = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setCompletedSteps([]);
  };

  return (
    <section id="solutions" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            Live Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Automation in Action
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Watch how SmartRunAI processes a new lead in real-time
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Automation Flow */}
          <div className="glass-card rounded-2xl p-8">
            {/* Steps */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 overflow-x-auto pb-4">
              {automationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3 shrink-0">
                  <div className="relative">
                    {/* Step Node */}
                    <div 
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-500 shadow-lg ${
                        completedSteps.includes(index)
                          ? `bg-gradient-to-br ${step.color} scale-110`
                          : activeStep === index
                          ? `bg-gradient-to-br ${step.color} animate-pulse scale-105`
                          : "bg-secondary/50 border border-border"
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      ) : (
                        <step.icon className={`w-6 h-6 md:w-8 md:h-8 ${
                          activeStep === index ? "text-white" : "text-muted-foreground"
                        }`} />
                      )}
                    </div>
                    
                    {/* Progress Ring */}
                    {activeStep === index && !completedSteps.includes(index) && (
                      <div className="absolute inset-0 rounded-xl border-2 border-crimson animate-ping" />
                    )}
                  </div>

                  {/* Arrow */}
                  {index < automationSteps.length - 1 && (
                    <ArrowRight className={`hidden md:block w-6 h-6 transition-colors duration-300 ${
                      completedSteps.includes(index) ? "text-crimson" : "text-muted-foreground/30"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {automationSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`text-center transition-all duration-300 ${
                    completedSteps.includes(index) || activeStep === index
                      ? "opacity-100"
                      : "opacity-40"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    completedSteps.includes(index) ? "text-crimson" : "text-muted-foreground"
                  }`}>
                    {completedSteps.includes(index) ? step.description : "Waiting..."}
                  </p>
                </div>
              ))}
            </div>

            {/* Status Bar */}
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-gradient-to-r from-crimson to-crimson-dark transition-all duration-500 ease-out"
                style={{ width: `${(completedSteps.length / automationSteps.length) * 100}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {completedSteps.length === automationSteps.length ? (
                  <span className="text-green-500 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Automation Complete! Lead processed in 6 seconds
                  </span>
                ) : isRunning ? (
                  <span className="animate-pulse">Processing step {activeStep + 1} of {automationSteps.length}...</span>
                ) : (
                  <span>Click to see the automation in action</span>
                )}
              </div>
              
              <div className="flex gap-3">
                {completedSteps.length > 0 && (
                  <Button variant="glass" onClick={resetDemo} disabled={isRunning}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
                <Button 
                  variant="hero" 
                  onClick={runDemo}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Demo Automation
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
