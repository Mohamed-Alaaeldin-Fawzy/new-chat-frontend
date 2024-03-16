import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { UsersProvider } from '@/context/UsersContext';
import { ProtectedRoute } from './ProtectedRoute';
import { IsSidebarOpenProvider } from '@/context/IsSidebarOpen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creative Evolution Chat App',
  description: 'Full stack Chat App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UsersProvider>
            <ProtectedRoute>
              <ChatProvider>
                <IsSidebarOpenProvider>{children}</IsSidebarOpenProvider>
              </ChatProvider>
            </ProtectedRoute>
          </UsersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
