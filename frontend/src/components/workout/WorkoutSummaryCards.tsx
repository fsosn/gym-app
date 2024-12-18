import { DurationCard } from "@/components/workout/DurationCard";
import { VolumeCard } from "./VolumeCard";
import { SetsCard } from "./SetsCard";

export function WorkoutSummaryCards({
    duration,
    totalVolume,
    completedSets,
}: any) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <DurationCard duration={duration} />
            <VolumeCard volume={totalVolume} />
            <SetsCard sets={completedSets} />
        </div>
    );
}
