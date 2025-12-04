import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Database, 
  MessageSquare, 
  BarChart3, 
  Plus, 
  ArrowRight,
  Zap,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const availableNodes = [
  { id: "trigger", type: "trigger", icon: Zap, label: "Trigger", color: "from-yellow-500 to-orange-500" },
  { id: "email", type: "email", icon: Mail, label: "Email", color: "from-blue-500 to-cyan-500" },
  { id: "data", type: "data", icon: Database, label: "Database", color: "from-green-500 to-emerald-500" },
  { id: "ai", type: "ai", icon: MessageSquare, label: "AI Process", color: "from-purple-500 to-pink-500" },
  { id: "analytics", type: "analytics", icon: BarChart3, label: "Analytics", color: "from-crimson to-crimson-dark" },
];

interface WorkflowNode {
  id: string;
  type: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

export const WorkflowBuilder = () => {
  const [workflow, setWorkflow] = useState<WorkflowNode[]>([
    { ...availableNodes[0], id: "node-1" },
  ]);

  const addNode = (node: typeof availableNodes[0]) => {
    const newNode: WorkflowNode = { ...node, id: `node-${Date.now()}` };
    setWorkflow([...workflow, newNode]);
    toast.success(`Added ${node.label} to workflow`);
  };

  const removeNode = (id: string) => {
    if (workflow.length > 1) {
      setWorkflow(workflow.filter((n) => n.id !== id));
    }
  };

  return (
    <section id="solutions" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            Interactive Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Build Your Workflow
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Drag and drop automation components to visualize your custom workflow
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Available Nodes */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-display text-lg font-semibold mb-4 text-foreground">
              Available Components
            </h3>
            <div className="flex flex-wrap gap-3">
              {availableNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => addNode(node)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover:scale-105 group"
                >
                  <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                    <node.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">
                    {node.label}
                  </span>
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Canvas */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-crimson" />
              Your Workflow
            </h3>

            <div className="flex items-center gap-4 overflow-x-auto pb-4 min-h-[120px]">
              {workflow.map((node, index) => (
                <div key={node.id} className="flex items-center gap-4 shrink-0">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => removeNode(node.id)}
                  >
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${node.color} flex flex-col items-center justify-center transition-all group-hover:scale-110 shadow-lg`}>
                      <node.icon className="w-8 h-8 text-white mb-1" />
                      <span className="text-xs text-white/80">{node.label}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      ×
                    </div>
                  </div>

                  {index < workflow.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}

              {/* Add More Prompt */}
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center shrink-0">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {workflow.length} component{workflow.length > 1 ? "s" : ""} in workflow
              </p>
              <Button variant="hero" onClick={() => toast.success("Workflow saved! Our team will contact you.")}>
                Save & Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
