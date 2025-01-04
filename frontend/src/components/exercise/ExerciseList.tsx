import { ExerciseCard } from "@/components/exercise/ExerciseCard";
import { ExerciseRecord, Set } from "@/types/exercise_types";

interface ExerciseListProps {
    exercises: ExerciseRecord[] | null;
    onExerciseChange?: (index: number, newSets: Set[]) => void;
    onDelete?: (index: number) => void;
    isRoutine: boolean;
    isFinishedWorkout: boolean;
}

export function ExerciseList({
    exercises,
    onExerciseChange,
    onDelete,
    isRoutine,
    isFinishedWorkout,
}: ExerciseListProps) {
    return (
        <>
            {exercises &&
                exercises.length > 0 &&
                exercises.map((exercise: ExerciseRecord, index: number) => (
                    <ExerciseCard
                        key={index}
                        exerciseName={exercise.title}
                        sets={exercise.sets}
                        onSetsChange={
                            onExerciseChange
                                ? (newSets: Set[]) =>
                                      onExerciseChange(index, newSets)
                                : undefined
                        }
                        onDelete={onDelete ? () => onDelete(index) : undefined}
                        isRoutine={isRoutine}
                        isFinishedWorkout={isFinishedWorkout}
                    />
                ))}
        </>
    );
}
