import { PropsWithChildren } from "react";

import "./globals.css";
import ClientProviders from "./providers";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
