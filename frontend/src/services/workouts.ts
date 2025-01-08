import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import {
    Workout,
    WorkoutPaginationResponse,
    WorkoutRequest,
} from "@/types/workout_types";

export const postWorkout = async (workoutData: WorkoutRequest) => {
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

export const fetchWorkoutsPage = async (
    page: number = 1,
    perPage: number = 3
): Promise<WorkoutPaginationResponse> => {
    try {
        const response = await axios.get<WorkoutPaginationResponse>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}` +
                `?${API_ENDPOINTS.PAGE}=${page}&${API_ENDPOINTS.PER_PAGE}=${perPage}`
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

export const patchWorkout = async (
    workoutId: number,
    workoutData: WorkoutRequest
) => {
    try {
        await axios.patch(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}/${workoutId}`,
            workoutData
        );
    } catch (error) {
        console.error(
            `Error while patching workout with id ${workoutId}:`,
            error
        );
        throw error;
    }
};
