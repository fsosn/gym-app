from ..models.exercise import Exercise, MuscleCategory, Equipment, ExerciseType
from ..extensions import db


def create_exercise(title, primary_muscle, other_muscles, equipment, exercise_type):
    if not __check_enums(primary_muscle, other_muscles, equipment, exercise_type):
        return None, "Exercise parameters not valid."

    new_exercise = Exercise(
        title=title,
        primary_muscle=primary_muscle,
        other_muscles=other_muscles,
        equipment=equipment,
        exercise_type=exercise_type,
    )
    db.session.add(new_exercise)
    db.session.commit()
    return new_exercise, "Exercise created successfully."


def get_exercise_by_id(exercise_id):
    return Exercise.query.get(exercise_id)


def get_all_exercises():
    return Exercise.query.all()


def update_exercise(
    exercise_id, title, primary_muscle, other_muscles, equipment, exercise_type
):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return None, True, "Exercise not found."
    if not __check_enums(primary_muscle, other_muscles, equipment, exercise_type):
        return None, False, "Exercise parameters not valid."

    exercise.title = title
    exercise.primary_muscle = primary_muscle
    exercise.other_muscles = other_muscles
    exercise.equipment = equipment
    exercise.exercise_type = exercise_type

    db.session.commit()
    return exercise, True, "Exercise updated successfully."


def delete_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return False

    db.session.delete(exercise)
    db.session.commit()
    return True


def __check_enums(primary_muscle, other_muscles, equipment, exercise_type):
    if not (primary_muscle in MuscleCategory):
        return False
    for muscle in other_muscles:
        if not (muscle in MuscleCategory):
            return False
    if not (equipment in Equipment):
        return False
    if not (exercise_type in ExerciseType):
        return False

    return True
