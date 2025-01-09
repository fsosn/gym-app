import { ExerciseCard } from "@/components/exercise/exercise_card/ExerciseCard";
import { ExerciseRecord, Set } from "@/types/exercise_types";

interface ExerciseListProps {
    exercises: ExerciseRecord[] | null;
    onExerciseChange?: (index: number, newSets: Set[]) => void;
    onDelete?: (index: number) => void;
    onMoveExerciseUp?: (index: number) => void;
    onMoveExerciseDown?: (index: number) => void;
    isRoutine: boolean;
    isFinishedWorkout: boolean;
}

export function ExerciseList({
    exercises,
    onExerciseChange,
    onDelete,
    onMoveExerciseUp,
    onMoveExerciseDown,
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
                        exerciseType={exercise.exercise_type!}
                        sets={exercise.sets}
                        onSetsChange={
                            onExerciseChange
                                ? (newSets: Set[]) =>
                                      onExerciseChange(index, newSets)
                                : undefined
                        }
                        onDelete={onDelete ? () => onDelete(index) : undefined}
                        onMoveUp={
                            onMoveExerciseUp && index > 0
                                ? () => onMoveExerciseUp(index)
                                : undefined
                        }
                        onMoveDown={
                            onMoveExerciseDown && index < exercises.length - 1
                                ? () => onMoveExerciseDown(index)
                                : undefined
                        }
                        isRoutine={isRoutine}
                        isFinishedWorkout={isFinishedWorkout}
                    />
                ))}
        </>
    );
}
