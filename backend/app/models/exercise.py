from app.extensions import db
from enum import Enum


class MuscleCategory(Enum):
    ABDOMINALS = "Abdominals"
    ABDUCTORS = "Abductors"
    ADDUCTORS = "Adductors"
    BICEPS = "Biceps"
    CALVES = "Calves"
    CARDIO = "Cardio"
    CHEST = "Chest"
    FOREARMS = "Forearms"
    FULL_BODY = "Full Body"
    GLUTES = "Glutes"
    HAMSTRINGS = "Hamstrings"
    LATS = "Lats"
    LOWER_BACK = "Lower Back"
    NECK = "Neck"
    QUADRICEPS = "Quadriceps"
    SHOULDERS = "Shoulders"
    TRAPS = "Traps"
    TRICEPS = "Triceps"
    UPPER_BACK = "Upper Back"
    OTHER = "Other"


class Equipment(Enum):
    NONE = "None"
    BARBELL = "Barbell"
    DUMBBELL = "Dumbbell"
    KETTLEBELL = "Kettlebell"
    MACHINE = "Machine"
    PLATE = "Plate"
    RESISTANCE_BAND = "Resistance Band"
    SUSPENSION_BAND = "Suspension Band"
    OTHER = "Other"


class ExerciseType(Enum):
    WEIGHT_REPS = "Weight & Reps"
    BODYWEIGHT_REPS = "Bodyweight Reps"
    WEIGHTED_BODYWEIGHT = "Weighted Bodyweight"
    ASSISTED_BODYWEIGHT = "Assisted Bodyweight"
    DURATION = "Duration"
    DURATION_WEIGHT = "Duration & Weight"
    DISTANCE_DURATION = "Distance & Duration"
    WEIGHT_DISTANCE = "Weight & Distance"


class Exercise(db.Model):
    __tablename__ = "exercise"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    primary_muscle = db.Column(db.String(50), nullable=False)
    other_muscles = db.Column(db.ARRAY(db.String(50)), nullable=True)
    equipment = db.Column(db.String(50), nullable=False)
    exercise_type = db.Column(db.String(50), nullable=False)
