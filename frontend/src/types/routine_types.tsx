import { Exercise } from "./exercise_types";

export interface Routine {
    id: number;
    title: string;
    description: string;
    exercises: Exercise[];
}
