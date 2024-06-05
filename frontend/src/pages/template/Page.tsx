import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="flex flex-col h-full mb-16">
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 md:px-6 lg:px-8">{children}</div>
      </main>
      <Navigation />
    </div>
  );
}
