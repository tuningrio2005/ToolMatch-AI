import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4 px-4 md:px-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative flex items-center bg-card border border-border/60 rounded-2xl shadow-lg shadow-black/5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Compare ChatGPT vs Claude vs Gemini..."
            className="flex-1 bg-transparent px-5 py-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="mr-2 rounded-xl h-9 w-9 bg-primary hover:bg-primary/90 disabled:opacity-30 transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-center text-[11px] text-muted-foreground/50 mt-2">
          Searches the web for the latest AI tool information
        </p>
      </form>
    </div>
  );
}