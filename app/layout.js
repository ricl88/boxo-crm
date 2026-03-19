import './globals.css';

export const metadata = {
  title: 'BOXO CRM',
  description: 'Annonseadministrasjon for BOXO',
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
