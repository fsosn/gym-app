import { DurationCard } from "@/components/workout/workout_details/summary_cards/DurationCard";
import { VolumeCard } from "./summary_cards/VolumeCard";
import { SetsCard } from "./summary_cards/SetsCard";

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
