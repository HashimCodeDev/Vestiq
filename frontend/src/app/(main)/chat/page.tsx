// app/chat/page.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey there! Ask me anything.' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: data.reply },
    ]);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-10 p-4 space-y-4">
        <div className="space-y-2 border rounded p-4 h-[400px] overflow-y-auto bg-muted">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.role === 'user' ? 'text-right' : 'text-left'}
            >
              <div className="inline-block rounded px-3 py-2 bg-background shadow text-sm">
                <b>{msg.role === 'user' ? 'You' : 'AI'}:</b> {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
          />

          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
