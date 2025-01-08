import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import { Routine, RoutinePaginationResponse } from "@/types/routine_types";

export const fetchRoutinesPage = async (
    page: number = 1,
    perPage: number = 3
): Promise<RoutinePaginationResponse> => {
    try {
        const response = await axios.get<RoutinePaginationResponse>(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}?page=${page}&per_page=${perPage}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching routines:", error);
        throw error;
    }
};

export const fetchRoutine = async (routineId: string): Promise<Routine> => {
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

export const createRoutine = async (data: any) => {
    try {
        await axios.post(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}`,
            data
        );
    } catch (error) {
        console.error("Error while creating routine:", error);
        throw error;
    }
};

export const updateRoutine = async (id: string, data: any) => {
    try {
        await axios.put(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${id}`,
            data
        );
    } catch (error) {
        console.error("Error while updating routine:", error);
        throw error;
    }
};

export const deleteRoutine = async (id: string) => {
    try {
        await axios.delete(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${id}`
        );
    } catch (error) {
        console.error("Error while deleting routine:", error);
        throw error;
    }
};
