import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import { Exercise, ExercisePostRequest } from "@/types/exercise_types";

export const fetchExercises = async (): Promise<Exercise[]> => {
    try {
        const response = await axios.get<Exercise[]>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.EXERCISES}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};

export const postExercise = async (exerciseData: ExercisePostRequest) => {
    try {
        await axios.post(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.EXERCISES}`,
            exerciseData
        );
    } catch (error) {
        console.error("Error while posting exercise:", error);
        throw error;
    }
};

export const deleteExerciseById = async (id: number) => {
    try {
        await axios.delete(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.EXERCISES}/${id}`
        );
    } catch (error) {
        console.error("Error while deleting exercise:", error);
        throw error;
    }
};
