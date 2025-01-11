export enum MuscleCategory {
    ABDOMINALS = "Abdominals",
    ABDUCTORS = "Abductors",
    ADDUCTORS = "Adductors",
    BICEPS = "Biceps",
    CALVES = "Calves",
    CARDIO = "Cardio",
    CHEST = "Chest",
    FOREARMS = "Forearms",
    FULL_BODY = "Full Body",
    GLUTES = "Glutes",
    HAMSTRINGS = "Hamstrings",
    LATS = "Lats",
    LOWER_BACK = "Lower Back",
    NECK = "Neck",
    QUADRICEPS = "Quadriceps",
    SHOULDERS = "Shoulders",
    TRAPS = "Traps",
    TRICEPS = "Triceps",
    UPPER_BACK = "Upper Back",
    OTHER = "Other",
}

export enum Equipment {
    NONE = "None",
    BARBELL = "Barbell",
    DUMBBELL = "Dumbbell",
    KETTLEBELL = "Kettlebell",
    MACHINE = "Machine",
    PLATE = "Plate",
    RESISTANCE_BAND = "Resistance Band",
    SUSPENSION_BAND = "Suspension Band",
    OTHER = "Other",
}

export enum ExerciseType {
    WEIGHT_REPS = "Weight & Reps",
    BODYWEIGHT_REPS = "Bodyweight Reps",
    WEIGHTED_BODYWEIGHT = "Weighted Bodyweight",
    ASSISTED_BODYWEIGHT = "Assisted Bodyweight",
    DURATION = "Duration",
    DURATION_WEIGHT = "Duration & Weight",
    DISTANCE_DURATION = "Distance & Duration",
    WEIGHT_DISTANCE = "Weight & Distance",
}

interface BaseExercise {
    id: number;
    title: string;
}

export interface Exercise extends BaseExercise {
    description: string;
    primary_muscle: MuscleCategory;
    other_muscles: MuscleCategory[];
    equipment: Equipment;
    exercise_type: ExerciseType;
}

export interface Set {
    weight?: number;
    reps?: number;
    distance?: number;
    duration?: number;
    completed: boolean;
}

export interface ExerciseRecord extends BaseExercise {
    sets: Set[];
    exercise_type: ExerciseType;
}

export interface ExercisePostRequest {
    title: string;
    description: string;
    primary_muscle: MuscleCategory;
    other_muscles: MuscleCategory[];
    equipment: Equipment;
    exercise_type: ExerciseType;
}
