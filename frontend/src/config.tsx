export const API_ENDPOINTS = {
    BASE_URL: "http://127.0.0.1:5000",
    LOGIN: "/login",
    REGISTER: "/register",
    DETAILS: "/check-account-details",
    EXERCISES: "/exercises",
    WORKOUTS: "/workouts",
    ROUTINES: "/routines",
    STATISTICS: "/stats",
} as const;

export const API_ENDPOINTS_STATS = {
    TOTAL_WORKOUTS: "/total_workouts",
    TOTAL_VOLUME: "/total_volume",
    TOP_EXERCISES: "/top_exercises",
    MUSCLE_DISTRIBUTION: "/muscle_distribution",
    WORKOUTS_OVER_TIME: "/workouts_over_time",
    STREAK: "/streak",
} as const;
