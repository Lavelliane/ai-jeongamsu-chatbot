'use client';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { LucideMessageCircleQuestion, LucideShield, Send } from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/client';
import { useSearchParams } from 'next/navigation';
import { marked } from 'marked';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Input,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
} from '@heroui/react';
import LoadingDots from './LoadingDots';
import Menubar from './Menubar';
import AboutTab from './AboutTab';
import ChatGuide from './ChatGuide';
import usePremadeQuestions from '@/hooks/usePremadeQuestions';

interface ChatbotInterfaceProps {
  handleChat: (input: string, sessionId: string) => Promise<string>;
  initialMessages: {
    id: string;
    message: string;
    response: string;
    session_id: string;
  }[];
}

const ChatbotInterface = ({
  handleChat,
  initialMessages,
}: ChatbotInterfaceProps) => {
  const t = useTranslations('ChatbotInterface');
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('chat');
  const questions = usePremadeQuestions();

  let sessionId = searchParams.get('session');
  const [client, setClient] = useState<boolean>(false);

  // Auto-focus input after transitions complete
  useEffect(() => {
    if (!isPending && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPending]);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!client) {
      setClient(true);
    }
  }, [client]);

  useEffect(() => {
    if (!sessionId && client) {
      console.log('sessionId is null');
      sessionId = uuidv4();
      console.log('sessionId is', sessionId);
      const url = new URL(window.location.href);
      url.searchParams.set('session', sessionId);
      window.history.replaceState({}, '', url.toString());
      setMessages(initialMessages.filter(msg => msg.session_id === sessionId));
    } else {
      setMessages(initialMessages.filter(msg => msg.session_id === sessionId));
    }
  }, [client]);

  useEffect(() => {
    if (client) {
      const supabase = createClient();

      // Set up real-time subscription with optimistic updates
      const channel = supabase
        .channel('conversations')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'conversations',
          },
          payload => {
            const newMessage = payload.new as {
              id: string;
              message: string;
              response: string;
              session_id: string;
            };

            // Prevent duplicate messages by checking if it already exists
            setMessages(prev => {
              // Check if we have a temporary message with empty response
              const tempIndex = prev.findIndex(
                msg =>
                  msg.message === newMessage.message &&
                  msg.session_id === newMessage.session_id &&
                  msg.response === ''
              );

              if (tempIndex >= 0) {
                // Replace temp message with server message
                return [
                  ...prev.slice(0, tempIndex),
                  newMessage,
                  ...prev.slice(tempIndex + 1),
                ];
              } else if (!prev.some(msg => msg.id === newMessage.id)) {
                // Add as new message if not a duplicate
                return [...prev, newMessage];
              }
              return prev;
            });
          }
        )
        .subscribe();

      // Cleanup subscription on component unmount
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [client]);

  const handleSendMessage = async (directMessage: string | undefined) => {
    if ((message.trim() === '' || isPending) && !directMessage) return;

    if (directMessage && inputRef.current) {
      inputRef.current.focus();
    }

    const currentMessage = directMessage ? directMessage : message;

    setMessage(''); // Clear input immediately

    try {
      // Add user message immediately with optimistic UI
      const tempId = `temp-${Date.now()}`;
      const newUserMessage = {
        id: tempId,
        message: currentMessage,
        response: '',
        session_id: sessionId ?? '',
      };

      setMessages(prev => [...prev, newUserMessage]);

      startTransition(async () => {
        try {
          // Get bot response
          const response = await handleChat(currentMessage, sessionId ?? '');

          // Play voice if available
          try {
            const voice = await fetch('/api/voice', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: response }),
            });

            if (voice.ok) {
              const audioBlob = await voice.blob();
              const audioUrl = URL.createObjectURL(audioBlob);

              if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play().catch(error => {
                  console.error('Audio playback failed:', error);
                });
              }
            }
          } catch (voiceError) {
            console.error('Voice generation failed:', voiceError);
            // Continue without voice
          }

          // Update message with response (optimistic update)
          setMessages(prev => {
            const lastMessageIndex = prev.findIndex(msg => msg.id === tempId);
            if (lastMessageIndex >= 0) {
              const updatedMessages = [...prev];
              updatedMessages[lastMessageIndex] = {
                ...updatedMessages[lastMessageIndex],
                response,
              };
              return updatedMessages;
            }
            return prev;
          });
        } catch (chatError) {
          console.error('Chat response failed:', chatError);
          // Show error in UI
          setMessages(prev => {
            const lastMessageIndex = prev.findIndex(msg => msg.id === tempId);
            if (lastMessageIndex >= 0) {
              const updatedMessages = [...prev];
              updatedMessages[lastMessageIndex] = {
                ...updatedMessages[lastMessageIndex],
                response:
                  t('errorMessage') ||
                  'Sorry, I encountered an error. Please try again.',
              };
              return updatedMessages;
            }
            return prev;
          });
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!client) {
    return null;
  }

  return (
    <div className="flex h-full gap-2 justify-center">
      <audio ref={audioRef} />
      <div className="flex flex-col md:gap-4 h-full w-full max-w-md">
        {/* Main container */}
        <div className="flex-1 w-full flex flex-col mx-auto z-10 bg-white/15 backdrop-blur-md md:rounded-xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="flex bg-shark-900/80 border-b border-shark-700 h-20 px-4 items-center shadow-md">
            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 aspect-square rounded-full bg-white items-center justify-center flex">
                  <Image
                    src={'/jeonghamsu-icons/2.svg'}
                    alt="jeonghamsu mascot"
                    width={'auto'}
                    height={'auto'}
                  />
                </div>
                <div className="md:max-w-lg max-w-[260px] w-full">
                  <h5 className="text-shark-100">{t('name')}</h5>
                  <p className="text-shark-300">{t('description')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageDropdown />
              </div>
            </div>
          </div>
          {tab === 'chat' && (
            <>
              {/* Messages area */}
              <div className="flex-1 h-full overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col gap-2 w-full items-center justify-center text-center text-shark-400 p-8 mx-auto">
                  <LucideShield size={36} />
                  <h6>{t('departmentName')}</h6>
                </div>
                {messages.length === 0 && <ChatGuide />}
                {messages.map(msg => (
                  <div key={msg.id} className="flex flex-col space-y-2">
                    <div className="flex justify-end gap-2 items-start">
                      {
                        msg.message && (
                          <>
                            <p className="md:max-w-[70%] max-w-[60%] p-3 rounded-2xl bg-tanhide-500 text-shark-100">
                              {msg.message}
                            </p>
                            <Image
                              src={'/jeonghamsu-icons/4.svg'}
                              isBlurred
                              alt="message icon"
                              width={36}
                              height={36}
                            />
                          </>
                        )
                      }
                    </div>
                    {msg.response && (
                      <div className="flex justify-start items-start gap-2">
                        <Image
                          src={'/jeonghamsu-icons/16.svg'}
                          isBlurred
                          alt="message icon"
                          width={36}
                          height={36}
                        />
                        {msg.response && (
                          <p
                            className="md:max-w-[70%] max-w-[60%] p-3 rounded-2xl bg-shark-700/80 border border-shark-600 text-shark-100"
                            dangerouslySetInnerHTML={{
                              __html: marked.parse(msg.response),
                            }}
                          ></p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {isPending && <LoadingDots />}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="flex bg-shark-900/80 border-t border-shark-700 px-4 h-16 shadow-md relative">
                {/* Quick questions */}
                <Popover
                  triggerType="menu"
                  shadow="md"
                  shouldCloseOnBlur={true}
                  shouldCloseOnScroll={true}
                  placement="right"
                  offset={0}
                  crossOffset={-96}
                  classNames={{
                    trigger: 'w-fit absolute bottom-20 left-4 z-20',
                    content: 'bg-transparent border-none shadow-none',
                  }}
                >
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      variant="solid"
                      color="primary"
                      radius="full"
                      className="shadow-md"
                    >
                      <LucideMessageCircleQuestion />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Card
                      shadow="none"
                      className="bg-transparent border-none gap-2 items-start max-w-[300px]"
                    >
                      {questions.map(question => (
                        <Button
                          variant="flat"
                          onPress={() => handleSendMessage(question)}
                          className="rounded-full  text-white bg-tanhide-500 py-2 px-4 shadow-sm"
                          key={question}
                        >
                          {question}
                        </Button>
                      ))}
                    </Card>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-1 items-center gap-4">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e =>
                      e.key === 'Enter' &&
                      !isPending &&
                      handleSendMessage(undefined)
                    }
                    variant="flat"
                    placeholder={
                      isPending
                        ? t('waitingMessage') || 'Thinking...'
                        : t('placeholder')
                    }
                    className={`flex-1 rounded-xl outline-none transition-all bg-white shadow-none 
                hover:shadow-md focus:shadow-lg
                ${isPending ? 'bg-opacity-80' : ''}
                `}
                    disabled={isPending}
                    autoFocus
                  />
                  <Button
                    onPress={() => handleSendMessage(undefined)}
                    disabled={isPending}
                    variant="solid"
                    isIconOnly
                    color="primary"
                    className={`transition-all 
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isPending ? 'animate-pulse' : 'hover:scale-105'}
                `}
                  >
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </>
          )}
          {tab === 'about' && (
            <div className="flex-1 h-full overflow-y-auto p-4 space-y-4">
              <AboutTab />
            </div>
          )}
        </div>

        <Menubar tab={tab} setTab={setTab} />
      </div>
    </div>
  );
};

export default ChatbotInterface;
