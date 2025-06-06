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
import TypewriterMarkdown from '@/components/TypewriteMarkdown';

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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 pb-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback
                    className={`${
                      message.isError ? 'bg-destructive' : 'bg-primary'
                    } text-primary-foreground`}
                  >
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}
              >
                {message.isError ? (
                  <Alert className="border-destructive">
                    <AlertDescription>{message.content}</AlertDescription>
                  </Alert>
                ) : (
                  <Card
                    className={`p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <TypewriterMarkdown text={message.content} />
                    )}
                  </Card>
                )}
              </div>

              {message.role === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex space-x-3 justify-start">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-3 bg-muted">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="fixed bottom-15 left-0 right-0 mx-4 p-4 bg-card rounded-2xl shadow-sm mb-5 border z-10">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3 max-w-4xl mx-auto"
        >
          <Textarea
            ref={textAreaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message…"
            disabled={isLoading}
            rows={1}
            className={cn(
              'flex-1 resize-none text-sm',
              isLoading && 'opacity-70 cursor-not-allowed',
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
