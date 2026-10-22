import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "WarRoom SaaS",
  description: "Command Your Business Strategy In Real-Time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}