import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Story World Builder',
  description: 'A centralized tool for writers to organize their creative universe.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="nav-link">
            Projects Dashboard
          </Link>
          <Link href="/character-builder" className="nav-link">
            Character Builder
          </Link>
          <Link href="/location-designer" className="nav-link">
            Location Designer
          </Link>
          <Link href="/plot-timeline" className="nav-link">
            Plot Timeline
          </Link>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
