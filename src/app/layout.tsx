import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ListsProvider } from '@/contexts/ListsContext';

export const metadata = {
  title: 'Pokémon To-Do',
  description: 'Catch Pokémon by completing tasks!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* FOUC prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <ListsProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
          </div>
        </ListsProvider>
      </body>
    </html>
  );
}
