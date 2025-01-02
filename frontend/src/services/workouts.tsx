import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export const postWorkout = async (workoutData: any) => {
    await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}`,
        workoutData
    );
};
