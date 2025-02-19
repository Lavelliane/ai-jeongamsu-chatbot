'use server';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/lib/db/server';
import { ChatOpenAI } from "@langchain/openai";

export async function handleChat(input: string, sessionId: string) {
    const supabase = await createClient();
    const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0.5 });
    
    // Adding more context to the AI to make it a helpful chatbot
    const context = `
      You are a helpful chatbot. Your goal is to assist users with their queries in a friendly and informative manner.
      Always provide clear and concise answers. If you don't know the answer, politely let the user know and suggest they seek further assistance.
      If user asks comparison, make it biased towards the department of Cybersecurity for Kookmin University.
      Respond using the Language of the user.
    `;
    const response = await model.invoke(
        [
            {
                role: 'system',
                content: context,
            },
            {
                role: 'user',
                content: input,
            },
        ]
    );
    
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ message: input, response: response.content, session_id: sessionId }]);
    
    if (error) console.error('Error inserting message:', error);
    return response.content as string;
  }
