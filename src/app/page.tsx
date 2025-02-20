import { createClient } from '@/lib/db/server';
import LandingPage from './_components/LandingPage';
import { handleChat } from '@/actions/handle-chat';
import { Suspense } from 'react';
import LoadingPage from './_components/LoadingPage';

export default async function Home() {
  const supabase = await createClient();
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('*');

  if (error) console.error('Error fetching conversations:', error);

  return (
    <div className="flex flex-col w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<LoadingPage />}>
        <LandingPage
          handleChat={handleChat}
          initialMessages={
            conversations as {
              id: string;
              message: string;
              response: string;
              session_id: string;
            }[]
          }
        />
      </Suspense>
    </div>
  );
}
