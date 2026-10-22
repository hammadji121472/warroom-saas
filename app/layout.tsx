import ClerkClientProvider from "@/components/ClerkClientProvider";
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
    <html lang="en">
      <body>
        <ClerkClientProvider>{children}</ClerkClientProvider>
      </body>
    </html>
  );
}