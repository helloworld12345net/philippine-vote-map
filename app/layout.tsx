import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import InAppBrowserWarning from "@/components/InAppBrowserWarning";
export const metadata = {
  title: "Philippine Vote Map",
  description: "Duterte Supporters Vote Map",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-adsense-account"
            content="ca-pub-3046539488911586"
          />
        </head> 
        <body>
  <InAppBrowserWarning />
  {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
