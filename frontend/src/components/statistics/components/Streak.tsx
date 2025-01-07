import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchStreak } from "@/services/statistics";

export function Streak() {
    const [streak, setStreak] = useState<number>(0);

    useEffect(() => {
        const getStreak = async () => {
            try {
                const data = await fetchStreak();
                setStreak(data.streak);
            } catch (error) {
                console.error(error);
            }
        };

        getStreak();
    }, []);

    return (
        <SingleValueStatTemplate
            label="Streak"
            value={streak > 0 ? `🔥 ${streak.toString()}` : streak.toString()}
        />
    );
}
