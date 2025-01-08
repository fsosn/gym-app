import { ExerciseRecord } from "./exercise_types";
import { Pagination } from "./pagination_types";

export interface Routine {
    id: number;
    title: string;
    description: string;
    exercises: ExerciseRecord[];
}

export interface RoutinePaginationResponse {
    routines: Routine[];
    pagination: Pagination;
}
