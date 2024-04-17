import type { Metadata } from "next";
import '@/app/global.css'
import { Plus_Jakarta_Sans } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Crypto Index Pool Pro",
  icons: {
    icon: '/icons/cip.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.className} text-neutral-300`}>
      <body>
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
