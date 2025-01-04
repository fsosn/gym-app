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

    const totalVolume =
        exercises?.reduce((acc, exercise) => {
            return (
                acc +
                exercise.sets
                    .filter((set: Set) => set.completed)
                    .reduce((setAcc: number, curr: Set) => {
                        if (
                            !Number.isNaN(parseInt(curr.weight)) &&
                            !Number.isNaN(parseInt(curr.reps))
                        ) {
                            return (
                                setAcc +
                                parseInt(curr.weight) * parseInt(curr.reps)
                            );
                        } else {
                            return setAcc;
                        }
                    }, 0)
            );
        }, 0) || 0;

    const completedSetsCount =
        exercises?.reduce((acc, exercise) => {
            return (
                acc + exercise.sets.filter((set: Set) => set.completed).length
            );
        }, 0) || 0;

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        } else {
            return `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;
        }
    };

    return { duration, totalVolume, completedSetsCount, formatDuration };
}
