import { Sparkles } from 'lucide-react';

export default function WelcomeHero() {
  return (
    <div className="text-center max-w-2xl mx-auto pt-12 pb-8">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
        Compare AI Tools Instantly
      </h2>
      <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
        Ask me to compare any AI tools — I'll search the web for the latest info and give you a detailed, side-by-side breakdown.
      </p>
    </div>
  );
}