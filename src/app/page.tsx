import { createClient } from '@/lib/db/server';
import LandingPage from './_components/LandingPage';
import { handleChat } from '@/actions/handle-chat';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sessionId = searchParams.session as string;
  
  // If no session ID in URL, generate one and redirect
  if (!sessionId) {
    const newSessionId = uuidv4();
    redirect(`/?session=${newSessionId}`);
  }

  const supabase = await createClient();
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId);

  if (error) console.error('Error fetching conversations:', error);

  return (
    <div className="flex flex-col w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage 
          handleChat={handleChat} 
          initialMessages={conversations as { id: string; message: string; response: string }[]} 
        />
      </Suspense>
      <div>test</div>
    </div>
  );
}