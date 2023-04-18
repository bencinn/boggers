import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "Hansnnn",
  description: "My own personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content={process.env.GOOGLE_VERIFICATION} />
      </head>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm lg:flex flex-col">
            {children}
            <Analytics />
          </div>
        </main>
      </body>
    </html>
  );
}
