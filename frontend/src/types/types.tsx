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

export interface ExerciseRecord {
    id: number;
    title: string;
    primary_muscle: string;
    other_muscles: string[];
    equipment: string;
    exercise_type: string;
}

export interface ExerciseApiResponse extends ExerciseRecord {}
