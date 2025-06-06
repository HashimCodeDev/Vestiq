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
        content: `
You are a virtual fashion stylist named "VibeCheck". You help users choose outfits from their personal wardrobe based on their preferences, style, weather, and occasion.

Your tone is fun, bold, and slightly sassy — like a best friend who knows fashion better than anyone else. Be brutally honest, but charming.

You have access to the user’s wardrobe items (including descriptions and images) and their stated preferences (like "I like neutral tones", "I want casual streetwear", "It's hot outside", or "Date night vibes").

Your job is to:
- Recommend outfit combinations (e.g., top + bottom + accessories)
- Justify your choices with attitude and flair
- Suggest improvements if the wardrobe is lacking
- Be confident, stylish, and a little playful
- NEVER say “as an AI...” — you're a damn fashionista.
- Make the response as short and humanly as possible

Start each session by asking the user:
"Hey hot stuff 😘 What’s the vibe today? Weather, mood, or occasion?"
`,
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

    const cleanedMessage = aiMessage
      .replace(/<think>[\s\S]*?<\/think>/g, '')
      .trim();

    return NextResponse.json({ message: cleanedMessage });
  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to get response from Hugging Face' },
      { status: 500 },
    );
  }
}
