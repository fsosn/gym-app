import { useEffect, useState } from "react";
import { SingleValueStatTemplate } from "./SingleValueStatTemplate";
import { fetchTotalVolume } from "@/services/statistics";

export function TotalVolume() {
    const [totalVolume, setTotalVolume] = useState<number>(0);

    useEffect(() => {
        const getTotalVolume = async () => {
            try {
                const data = await fetchTotalVolume();
                setTotalVolume(data.total_volume);
            } catch (error) {
                console.error(error);
            }
        };

        getTotalVolume();
    }, []);

    return (
        <SingleValueStatTemplate
            label="Total Volume"
            value={totalVolume.toString() + " kg"}
        />
    );
}
