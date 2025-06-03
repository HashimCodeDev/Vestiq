import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HF_API_KEY) {
  throw new Error('Missing Hugging Face API key');
}

const client = new InferenceClient(HF_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message, messages } = await req.json();

    // Inject a system prompt to guide the assistant’s behavior
    const chatMessages = [
      {
        role: 'system',
        content:
          'You are a fashion assistant helping users with outfit suggestions. Be friendly, concise, and witty.',
      },
      ...messages, // previous messages for context
      { role: 'user', content: message }, // current user message
    ];

    const chatCompletion = await client.chatCompletion({
      provider: 'novita',
      model: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
      messages: chatMessages,
    });

    const aiMessage =
      chatCompletion.choices[0].message?.content || 'No response from model';

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to get response from Hugging Face' },
      { status: 500 },
    );
  }
}
