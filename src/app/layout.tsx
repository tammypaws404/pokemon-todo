import './globals.css';
import { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';

export const metadata = {
  title: 'Pokémon To-Do',
  description: 'Catch Pokémon by completing tasks!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <StatusBar />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}