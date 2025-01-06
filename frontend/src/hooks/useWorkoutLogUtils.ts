import { ExerciseRecord, Set } from "@/types/exercise_types";
import { useEffect, useState } from "react";

export function useWorkoutLogUtils(
    startTime: number | null,
    exercises: ExerciseRecord[]
) {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (startTime) {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            setDuration(elapsed);

            const timer = setInterval(() => {
                setDuration((prevDuration) => prevDuration + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [startTime]);

    const totalVolume = exercises.reduce((total, exercise) => {
        const exerciseVolume = exercise.sets.reduce((volume, set: Set) => {
            if (
                set.completed &&
                !Number.isNaN(set.weight) &&
                !Number.isNaN(set.reps)
            ) {
                return volume + set.weight * set.reps;
            }
            return volume;
        }, 0);
        return total + exerciseVolume;
    }, 0);

    const completedSetsCount = exercises.reduce((total, exercise) => {
        const completedSets = exercise.sets.filter(
            (set: Set) => set.completed
        ).length;
        return total + completedSets;
    }, 0);

    return { duration, totalVolume, completedSetsCount };
}
