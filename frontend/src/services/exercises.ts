import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import { Exercise } from "@/types/exercise_types";

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
