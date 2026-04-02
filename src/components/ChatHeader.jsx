import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ChatHeader({ onNewChat }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight">AI Tool Comparator</h1>
          <p className="text-xs text-muted-foreground">Compare any AI tools side by side</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNewChat}
        className="text-muted-foreground hover:text-foreground gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        New Chat
      </Button>
    </div>
  );
}