import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import { Workout } from "@/types/workout_types";

export const postWorkout = async (workoutData: any) => {
    try {
        await axios.post(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}`,
            workoutData
        );
    } catch (error) {
        console.error("Error while posting workout:", error);
        throw error;
    }
};

export const fetchWorkouts = async (): Promise<Workout[]> => {
    try {
        const response = await axios.get<Workout[]>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching workouts:", error);
        throw error;
    }
};

export const fetchWorkout = async (workoutId: string): Promise<Workout> => {
    try {
        const response = await axios.get<Workout>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}/${workoutId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching workout with id ${workoutId}:`, error);
        throw error;
    }
};

export const deleteWorkout = async (workoutId: string) => {
    try {
        await axios.delete(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}/${workoutId}`
        );
    } catch (error) {
        console.error("Error while deleting workout:", error);
        throw error;
    }
};
