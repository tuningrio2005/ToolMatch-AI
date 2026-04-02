import { ArrowRight } from 'lucide-react';

const suggestions = [
  "Compare ChatGPT vs Claude vs Gemini",
  "Best AI tools for coding in 2025",
  "Midjourney vs DALL-E vs Stable Diffusion",
  "Compare Notion AI vs Jasper vs Copy.ai",
  "GitHub Copilot vs Cursor vs Cody",
  "Best AI video generators compared",
];

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all text-left"
          >
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {suggestion}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}