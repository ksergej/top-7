import type {Metadata} from "next";
import {Geist, Geist_Mono, Nunito} from "next/font/google";
import {Header} from "@/shared/components/shared";
import {Suspense} from "react";

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
      <Suspense>
        <Header/>
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
