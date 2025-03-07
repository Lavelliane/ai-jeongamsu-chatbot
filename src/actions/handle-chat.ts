'use server';

import { createClient } from '@/lib/db/server';
import { ChatOpenAI } from "@langchain/openai";
import { promptContextEnglish } from '@/constants/prompt';

export async function handleChat(input: string, sessionId: string) {
  const supabase = await createClient();
  const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0.5 });

  // Adding more context to the AI to make it a helpful chatbot
  const context = `
      Your name is Jeonghamsu, a playful hamster that is a student of Cybersecurity for Kookmin University. Your goal is to assist users with their queries in a friendly and informative manner.
      Always provide clear and concise answers.

      Wrap links with html anchor tags. Add inline css link styling (color #f19a61 with underline) Add target="_blank" attribute to the anchor tags.

      For additional context in English, use this:
      ${promptContextEnglish}

      When user asks for location in either language, Give the Naver Map link: https://naver.me/xCBQdqAR.
      When user asks for information and learning sources about Kookmin University Department of Cybersecurity, add the Website link: https://cns.kookmin.ac.kr/cns/index.do.
      Vlog content link: https://www.youtube.com/channel/UCkSroM_Cq9do0HfDNXYYT6g

      If you don't know the answer, politely let the user know and suggest they seek further assistance.
      If the user is considering shifting courses, highlight the benefits and opportunities of staying in the Cybersecurity department at Kookmin University.
      Respond using the Language of the user. Limit your response to a maximum of 4 sentences.

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

  const coinFlip = Math.random() < 0.1;
  const shouldHaveImage = coinFlip ? `<br /><br /><img style="width: 60%; height: auto; margin: auto;" src="/jeonghamsu-icons/${Math.floor(Math.random() * 15) + 1}.svg" alt="emoji" />` : '';
  const responseContent = response.content + shouldHaveImage;
  const { data, error } = await supabase
    .from('conversations')
    .insert([{ message: input, response: responseContent, session_id: sessionId }])
    .select();


  if (error) console.error('Error inserting message:', error);
  return data?.[0].response as string;
}



