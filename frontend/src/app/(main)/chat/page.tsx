'use client';

import React, {
  useState,
  useRef,
  useEffect,
  FormEvent,
  KeyboardEvent,
} from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import TypewriterMarkdown from '@/components/tools/TypewriteMarkdown';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isError?: boolean;
}

/**
 * ChatPage component that provides a chat interface for users to interact with
 * an AI assistant. It supports sending and receiving messages, handles loading
 * states, and scrolls the chat to the bottom when new messages are added.
 *
 * The component manages user input, displays messages with appropriate styling
 * based on their role (user or assistant), and handles errors in message
 * delivery. It also prevents multiple submissions while a message is being sent.
 *
 * @returns A JSX element representing the chat interface.
 */

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Scrolls the chat to the bottom.
   *
   * This function ensures that the most recent messages are visible by
   * smoothly scrolling to the end of the message list. It is typically
   * called after new messages are added.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Sends a message to the chat API and retrieves the AI's response.
   *
   * This function sends the user's message and previous chat messages (excluding
   * any messages marked as errors) to the server, which processes the input and
   * returns a response from the AI assistant. The function handles errors by
   * logging them and throwing an error.
   *
   * @param content - The content of the message to send.
   * @returns A promise that resolves to the AI's response message.
   * @throws An error if the request to the chat API fails.
   */

  const sendMessage = async (content: string) => {
    try {
      const response = await axios.post('/api/chat', {
        message: content,
        messages: messages
          .filter((m) => !m.isError)
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
      });

      return response.data.message;
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to get response from AI');
    }
  };

  /**
   * Handles form submission and sends the user's message to the chat API.
   *
   * This function is called when the user submits the chat form. It prevents the
   * default form submission behavior, then checks if the input is empty or if the
   * app is currently loading. If either condition is true, it does nothing.
   *
   * If the input is not empty and the app is not loading, it adds the user's
   * message to the chat log and sends the message to the chat API. When the chat
   * API responds, it adds the response to the chat log. If the chat API fails,
   * it adds an error message to the chat log.
   *
   * @param e - The form submission event, if triggered by a form submission.
   */
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(input.trim());

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble connecting right now. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the key press event on the chat input text area.
   *
   * When the user presses Enter without holding the Shift key, this function
   * prevents the default form submission behavior and calls handleSubmit() to
   * send the user's message to the AI.
   *
   * @param e - The KeyboardEvent object triggered by the key press.
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(); // Removed the wrong cast
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-br from-background via-background/95 to-muted/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/3 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/3 rounded-full blur-2xl animate-float animation-delay-1000" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/3 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex space-x-3 animate-fade-in-up ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-10 w-10 mt-1 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                  <AvatarFallback
                    className={`${
                      message.isError
                        ? 'bg-destructive'
                        : 'bg-gradient-to-br from-primary to-primary/80'
                    } text-primary-foreground shadow-lg`}
                  >
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[75%] ${message.role === 'user' ? 'order-first' : ''}`}
              >
                {message.isError ? (
                  <Alert className="border-destructive bg-destructive/5 backdrop-blur-sm animate-scale-in">
                    <AlertDescription className="text-destructive font-medium">
                      {message.content}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Card
                    className={`p-4 shadow-lg hover:shadow-xl transition-all duration-200 animate-scale-in border-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground ml-auto backdrop-blur-sm'
                        : 'bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-white/20 dark:border-white/10'
                    }`}
                  >
                    <div
                      className={`prose prose-sm max-w-none ${
                        message.role === 'user'
                          ? 'prose-invert'
                          : 'prose-gray dark:prose-invert'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      ) : (
                        <TypewriterMarkdown text={message.content} />
                      )}
                    </div>
                  </Card>
                )}
              </div>

              {message.role === 'user' && (
                <Avatar className="h-10 w-10 mt-1 ring-2 ring-secondary/20 hover:ring-secondary/40 transition-all duration-200">
                  <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-lg">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex space-x-3 justify-start animate-fade-in">
              <Avatar className="h-10 w-10 mt-1 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    AI is thinking...
                  </span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="fixed bottom-16 left-0 right-0 mx-4 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl mb-5 border border-white/30 dark:border-white/10 z-10">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-4 max-w-4xl mx-auto"
        >
          <div className="flex-1 relative">
            <Textarea
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about fashion, styling, or your wardrobe..."
              disabled={isLoading}
              rows={1}
              className={cn(
                'flex-1 resize-none text-sm bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200',
                isLoading && 'opacity-70 cursor-not-allowed',
              )}
            />
            {/* Character count or typing indicator could go here */}
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
