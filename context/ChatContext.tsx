'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Chat } from '@/types';

type ChatContextType = {
  chat: Chat | null;
  setChat: Dispatch<SetStateAction<Chat | null>>;
};

const SelectedChatContext = createContext<ChatContextType>({
  chat: null,
  setChat: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useState<Chat | null>(null);

  return (
    <SelectedChatContext.Provider value={{ chat, setChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
}

export const useCurrentChat = () => useContext(SelectedChatContext);
