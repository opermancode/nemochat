import './globals.css';

export const metadata = {
  title: 'NemoChat',
  description: 'Isolated Messaging System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
