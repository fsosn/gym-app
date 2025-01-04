import { ExerciseRecord } from "./exercise_types";

export interface Workout {
    id: number;
    user_id: number;
    title: string;
    begin_datetime: string;
    time: string;
    volume: number;
    total_sets: number;
    exercises: ExerciseRecord[];
}
