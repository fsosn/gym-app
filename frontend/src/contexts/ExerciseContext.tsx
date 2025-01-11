import { createContext, useState, ReactNode, useEffect } from "react";
import { Exercise, ExercisePostRequest } from "@/types/exercise_types";
import {
    fetchExercises,
    postExercise,
    deleteExerciseById,
} from "@/services/exercises";

interface ExerciseContextType {
    exercises: Exercise[];
    isLoading: boolean;
    getExercises: () => Promise<void>;
    createExercise: (exercise: ExercisePostRequest) => Promise<void>;
    deleteExercise: (exerciseId: number) => Promise<void>;
}

export const ExerciseContext = createContext<ExerciseContextType | null>(null);

interface ExerciseProviderProps {
    children: ReactNode;
}

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getExercises = async () => {
        setIsLoading(true);
        try {
            const exercises = await fetchExercises();
            setExercises(exercises);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createExercise = async (exercise: ExercisePostRequest) => {
        try {
            await postExercise(exercise);
            await getExercises();
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    const deleteExercise = async (id: number) => {
        try {
            await deleteExerciseById(id);
            await getExercises();
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <ExerciseContext.Provider
            value={{
                exercises,
                isLoading,
                getExercises,
                createExercise,
                deleteExercise,
            }}
        >
            {children}
        </ExerciseContext.Provider>
    );
};
