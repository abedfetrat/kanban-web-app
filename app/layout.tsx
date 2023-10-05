import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanaban Task Management",
  description: "Kanaban is a task managment application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <style color="orange"></style>
      </Head>
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
