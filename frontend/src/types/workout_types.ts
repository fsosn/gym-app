import { ExerciseRecord } from "./exercise_types";

export interface WorkoutRequest {
    title: string;
    begin_datetime: string;
    time: number;
    exercises: ExerciseRecord[];
}

export interface Workout extends WorkoutRequest {
    id: number;
    user_id: number;
    volume: number;
    total_sets: number;
}
