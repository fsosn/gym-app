import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchTotalWorkouts } from "@/services/statistics";

export function TotalWorkouts() {
    const [totalWorkouts, setTotalWorkouts] = useState<number>(0);

    useEffect(() => {
        const getTotalWorkouts = async () => {
            try {
                const data = await fetchTotalWorkouts();
                setTotalWorkouts(data.total_workouts);
            } catch (error) {
                console.error(error);
            }
        };

        getTotalWorkouts();
    }, []);

    return (
        <SingleValueStatTemplate
            label="Workouts"
            value={totalWorkouts.toString()}
        />
    );
}
