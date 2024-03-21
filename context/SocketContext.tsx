'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  onlineUsers: string[];
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({
  onlineUsers: [],
  socket: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL!, {
      query: {
        userId: user?.id,
      },
    });

    socketRef.current.on('online-users', setOnlineUsers);

    return () => {
      socketRef.current?.off('online-users');
      socketRef.current?.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
