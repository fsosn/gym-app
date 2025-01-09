import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

interface PageProps {
    title?: string;
    children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
    return (
        <div className="flex flex-col h-full mb-16">
            <main className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 md:px-6 lg:px-8">
                    {title && (
                        <h1 className="text-3xl font-bold mb-4 text-blue-500">
                            {title}
                        </h1>
                    )}
                    <div>{children}</div>
                </div>
                <Navigation />
            </main>
        </div>
    );
}
