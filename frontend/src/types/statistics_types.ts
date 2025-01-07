export interface TotalWorkoutsType {
    total_workouts: number;
}

export interface TotalVolumeType {
    total_volume: number;
}

export interface TopExerciseType {
    exercise: string;
    count: number;
}

export interface MuscleCountType {
    muscle: string;
    count: number;
}

export interface WorkoutOverTimeType {
    date: string;
    workouts: number;
}

export interface StreakType {
    streak: number;
}
