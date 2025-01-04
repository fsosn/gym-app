import { useState } from "react";
import { ExerciseRecord, Exercise, Set } from "@/types/exercise_types";

export const useExerciseList = (initialExercises: ExerciseRecord[] = []) => {
    const [exercises, setExercises] =
        useState<ExerciseRecord[]>(initialExercises);

    const updateExercise = (index: number, newSets: Set[]) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].sets = newSets;
        setExercises(updatedExercises);
    };

    const deleteExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const addExercises = (selectedExercises: Exercise[]) => {
        const newExercises = [
            ...exercises,
            ...selectedExercises.map((exercise) => ({
                id: exercise.id,
                title: exercise.title,
                sets: [{ weight: "", reps: "", completed: false }],
            })),
        ];
        setExercises(newExercises);
    };

    const initExerciseList = (exercises: ExerciseRecord[]) => {
        setExercises(exercises);
    };

    return {
        exercises,
        updateExercise,
        deleteExercise,
        addExercises,
        initExerciseList,
    };
};
