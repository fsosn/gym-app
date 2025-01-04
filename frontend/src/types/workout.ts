import { ExerciseRecord } from "./exercise_types";

export interface Workout{
    id: number;
    user_id: number;
    title: string;
    begin_datetime: string;
    time: string
    exercises: ExerciseRecord[];
}