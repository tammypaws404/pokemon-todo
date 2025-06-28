import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Pokémon To-Do',
  description: 'Catch Pokémon by completing tasks!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}