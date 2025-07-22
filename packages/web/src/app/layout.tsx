import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI PE Fund - Portfolio Management',
  description: 'AI-powered Private Equity portfolio management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="flex min-h-screen">
          <nav className="w-64 bg-white border-r border-gray-200 px-4 py-6">
            <div className="flex items-center mb-8">
              <h1 className="text-xl font-bold text-gray-900">AI PE Fund</h1>
            </div>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/portfolio" 
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="/deals" 
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Deals
                </a>
              </li>
              <li>
                <a 
                  href="/analytics" 
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </nav>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}