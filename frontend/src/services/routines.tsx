import axios from "axios";
import { API_ENDPOINTS } from "../config";
import { Routine } from "@/types/routine_types";

export const fetchRoutines = async (): Promise<Routine[]> => {
    try {
        const response = await axios.get<Routine[]>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching routines:", error);
        throw error;
    }
};

export const fetchRoutine = async (routineId: number): Promise<Routine> => {
    try {
        const response = await axios.get<Routine>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${routineId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching routine with id ${routineId}:`, error);
        throw error;
    }
};
