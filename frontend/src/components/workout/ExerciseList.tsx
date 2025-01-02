import { ExerciseCard } from "@/components/workout/ExerciseCard";

export function ExerciseList({
    exercises,
    onExerciseChange,
    onDelete,
    isWorkoutActive,
}: any) {
    return (
        <>
            {exercises &&
                exercises.length > 0 &&
                exercises.map((exercise: any, index: number) => (
                    <ExerciseCard
                        key={index}
                        exerciseName={exercise.title}
                        sets={exercise.sets}
                        onSetsChange={(newSets: any) =>
                            onExerciseChange(index, newSets)
                        }
                        onDelete={() => onDelete(index)}
                        isWorkoutActive={isWorkoutActive}
                    />
                ))}
        </>
    );
}
