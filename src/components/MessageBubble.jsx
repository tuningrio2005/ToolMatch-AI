import ReactMarkdown from 'react-markdown';
import { User, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

function AIMessage({ content }) {
  return (
    <ReactMarkdown
      className="text-sm leading-relaxed space-y-3"
      components={{
        p: ({ children }) => <p className="text-foreground/90 leading-relaxed">{children}</p>,

        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-foreground pt-2 pb-1 border-b border-border/50">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-semibold text-foreground pt-3 pb-1 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-primary inline-block shrink-0" />
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-semibold text-foreground/80 pt-2">{children}</h3>
        ),

        ul: ({ children }) => <ul className="space-y-1.5 ml-1">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-1.5 ml-1 list-decimal list-inside">{children}</ol>,
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-foreground/85">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
            <span>{children}</span>
          </li>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-muted-foreground not-italic">{children}</em>
        ),

        code: ({ inline, children }) =>
          inline ? (
            <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono">
              {children}
            </code>
          ) : (
            <pre className="bg-muted rounded-xl p-4 overflow-x-auto text-xs font-mono">
              <code>{children}</code>
            </pre>
          ),

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/30 pl-4 py-1 bg-primary/5 rounded-r-lg text-muted-foreground italic">
            {children}
          </blockquote>
        ),

        table: ({ children }) => (
          <div className="overflow-x-auto rounded-xl border border-border shadow-sm my-2">
            <table className="w-full text-xs border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-border/50">{children}</tbody>,
        th: ({ children }) => (
          <th className="px-4 py-2.5 text-left font-semibold text-foreground/80 text-xs uppercase tracking-wide">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2.5 text-foreground/75 align-top">{children}</td>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
        ),

        hr: () => <hr className="border-border/40 my-2" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-3 max-w-3xl mx-auto", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      )}

      <div className={cn("max-w-[88%]", isUser && "flex flex-col items-end")}>
        {isUser ? (
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 text-sm leading-relaxed shadow-sm">
            {message.content}
          </div>
        ) : (
          <div className="bg-card border border-border/40 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm space-y-3">
            <AIMessage content={message.content} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}