import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { supabase } from '../api/supabaseClient';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
const MemoMessageBubble = memo(MessageBubble);
import TypingIndicator from '../components/TypingIndicator';
import WelcomeHero from '../components/WelcomeHero';
import SuggestionChips from '../components/SuggestionChips';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isLoading, scrollToBottom]);

  const handleSend = useCallback(async (userMessage) => {
    const newUserMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    const conversationHistory = [...messages, newUserMessage]
      .slice(-6)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `You are an expert AI tool analyst. The user wants to compare or learn about AI tools.

Based on the conversation and the user's latest request, provide a comprehensive, well-structured comparison.

CONVERSATION:
${conversationHistory}

INSTRUCTIONS:
- Search the web for the LATEST information about these AI tools (pricing, features, updates, reviews)
- Create a detailed comparison with clear sections
- Use markdown tables when comparing multiple tools side by side
- Include: Overview, Key Features, Pricing, Pros & Cons, Best For, and a Verdict
- Be specific with numbers, pricing tiers, and feature details
- If the user asks a general question (not comparing specific tools), recommend and compare the top tools in that category
- Keep it informative but concise — no fluff
- Use markdown formatting (headers, bold, tables, lists) for readability`;

    try {
      // 1. Call the Supabase Edge Function instead of Base44 InvokeLLM
      const { data, error: fnError } = await supabase.functions.invoke('compare-tools', {
        body: { prompt },
      });

      if (fnError) throw fnError;

      const response = data.result;
      const aiMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, aiMessage]);

      // 2. Save to database using Supabase Client instead of Base44 entities
      const toolNames = extractToolNames(userMessage);
      if (toolNames.length >= 2) {
        const { error: dbError } = await supabase
          .from('ai_comparisons')
          .insert({
            tools_compared: toolNames,
            comparison_summary: typeof response === 'string' ? response.substring(0, 500) : '',
            query: userMessage,
          });
          
        if (dbError) {
          console.error("Error saving to database:", dbError);
        }
      }
    } catch (error) {
      console.error("Error processing request:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I encountered an error processing your request." }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const extractToolNames = (text) => {
    const vsPattern = /\b([\w\s.]+?)\s+vs\.?\s+([\w\s.]+?)(?:\s+vs\.?\s+([\w\s.]+?))?(?:\s+vs\.?\s+([\w\s.]+?))?\b/i;
    const match = text.match(vsPattern);
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).map((t) => t.trim());
    }
    return [];
  };

  const handleNewChat = useCallback(() => {
    setMessages([]);
  }, []);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onNewChat={handleNewChat} />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-4 space-y-6">
          {isEmpty && (
            <>
              <WelcomeHero />
              <SuggestionChips onSelect={handleSend} />
            </>
          )}

          {messages.map((msg, i) => (
            <MemoMessageBubble key={i} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}