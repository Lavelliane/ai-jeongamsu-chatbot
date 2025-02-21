'use server'

import { createClient } from '@/lib/db/server';

export async function handleAddEmoji(sessionId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('conversations')
        .insert([{ message: '', response: `<img src="/jeonghamsu-icons/${Math.floor(Math.random() * 16)}.svg" alt="emoji" />`, session_id: sessionId }])
        
    if (error) {
        console.error('Error adding emoji:', error);
        throw new Error('Failed to add emoji');
    }

    return data;
}
