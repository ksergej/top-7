import type {Metadata} from "next";
import {Geist, Geist_Mono, Nunito} from "next/font/google";
import {Header} from "@/components/shared";

export const metadata: Metadata = {
  title: "Top 7 App",
};

export default function HomeLayout({
                                     children,
                                     modal,
                                   }: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header/>
      {children}
      {modal}
    </main>
  );
}
