import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchStreak } from "@/services/statistics";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function Streak() {
    const [streak, setStreak] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getStreak = async () => {
            try {
                const data = await fetchStreak();
                setStreak(data.streak);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getStreak();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="relative w-full h-full flex justify-center items-center w-full">
                    <LoadingSpinner size={48} />
                </div>
            ) : (
                <SingleValueStatTemplate
                    label="Streak"
                    value={
                        streak > 0
                            ? `🔥 ${streak.toString()}`
                            : streak.toString()
                    }
                />
            )}
        </div>
    );
}
