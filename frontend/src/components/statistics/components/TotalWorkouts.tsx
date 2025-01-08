import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchTotalWorkouts } from "@/services/statistics";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function TotalWorkouts() {
    const [totalWorkouts, setTotalWorkouts] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTotalWorkouts = async () => {
            try {
                const data = await fetchTotalWorkouts();
                setTotalWorkouts(data.total_workouts);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getTotalWorkouts();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="relative w-full h-full flex justify-center items-center w-full">
                    <LoadingSpinner size={48} />
                </div>
            ) : (
                <SingleValueStatTemplate
                    label="Workouts"
                    value={totalWorkouts.toString()}
                />
            )}
        </div>
    );
}
