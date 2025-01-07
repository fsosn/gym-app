import axios from "axios";
import { API_ENDPOINTS, API_ENDPOINTS_STATS } from "@/config";
import {
    MuscleCountType,
    StreakType,
    TopExerciseType,
    TotalVolumeType,
    TotalWorkoutsType,
    WorkoutOverTimeType,
} from "@/types/statistics_types";

export const fetchTotalWorkouts = async (): Promise<TotalWorkoutsType> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.TOTAL_WORKOUTS}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching total number of workouts stats:`, error);
        throw error;
    }
};

export const fetchTotalVolume = async (): Promise<TotalVolumeType> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.TOTAL_VOLUME}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching total volume stats:`, error);
        throw error;
    }
};

export const fetchTopExercises = async (): Promise<TopExerciseType[]> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.TOP_EXERCISES}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching top exercises stats:`, error);
        throw error;
    }
};

export const fetchMuscleDistribution = async (): Promise<MuscleCountType[]> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.MUSCLE_DISTRIBUTION}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching muscle distribution stats:`, error);
        throw error;
    }
};

export const fetchWorkoutsOverTime = async (
    period: string
): Promise<WorkoutOverTimeType[]> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.WORKOUTS_OVER_TIME}/${period}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching workouts over time stats:`, error);
        throw error;
    }
};

export const fetchStreak = async (): Promise<StreakType> => {
    try {
        const response = await axios.get(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS}${API_ENDPOINTS_STATS.STREAK}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching current streak stats:`, error);
        throw error;
    }
};
