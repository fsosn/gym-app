from app.models.exercise import (
    Exercise,
    MuscleCategory,
    Equipment,
    ExerciseType,
)
from app.extensions import db


def create_exercise(
    title, primary_muscle, other_muscles, equipment, exercise_type
):
    valid, message = __check_enums(
        primary_muscle, other_muscles, equipment, exercise_type
    )
    if not valid:
        return None, message

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
    if not __check_enums(
        primary_muscle, other_muscles, equipment, exercise_type
    ):
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
    if primary_muscle not in MuscleCategory._value2member_map_:
        return False, "Invalid primary_muscle value."

    for muscle in other_muscles:
        if muscle not in MuscleCategory._value2member_map_:
            return False, f"Invalid muscle value: {muscle}."

    if equipment not in Equipment._value2member_map_:
        return False, "Invalid equipment value."

    if exercise_type not in ExerciseType._value2member_map_:
        return False, "Invalid exercise_type value."

    return True, "All parameters are valid."
