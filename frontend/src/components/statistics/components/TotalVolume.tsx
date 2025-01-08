import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchTotalVolume } from "@/services/statistics";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function TotalVolume() {
    const [totalVolume, setTotalVolume] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTotalVolume = async () => {
            try {
                const data = await fetchTotalVolume();
                setTotalVolume(data.total_volume);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getTotalVolume();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="relative w-full h-full flex justify-center items-center w-full">
                    <LoadingSpinner size={48} />
                </div>
            ) : (
                <SingleValueStatTemplate
                    label="Total Volume"
                    value={totalVolume.toString() + " kg"}
                />
            )}
        </div>
    );
}
