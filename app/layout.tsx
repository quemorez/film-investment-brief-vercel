import "./globals.css";
import { ReactNode } from "react";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";

export const metadata = {
  title: "Film Investment Brief",
  description: "Generate and send polished media investment briefings."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
