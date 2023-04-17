import "./globals.css";

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
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm lg:flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
