from app.models.exercise import (
    Exercise,
    MuscleCategory,
    Equipment,
    ExerciseType,
)
from app.models.user import Role
from app.extensions import db
from sqlalchemy import or_


def create_exercise(
    user_id,
    title,
    description,
    primary_muscle,
    other_muscles,
    equipment,
    exercise_type,
):
    return _create_exercise(
        user_id,
        title,
        description,
        primary_muscle,
        other_muscles,
        equipment,
        exercise_type,
    )


def create_exercise_admin(
    title,
    description,
    primary_muscle,
    other_muscles,
    equipment,
    exercise_type,
):
    return _create_exercise(
        None,
        title,
        description,
        primary_muscle,
        other_muscles,
        equipment,
        exercise_type,
    )


def get_exercise_by_id(exercise_id, identity):
    role, user_id = identity.get("role"), identity.get("id")

    exercise = db.session.execute(
        db.select(Exercise).filter(Exercise.id == exercise_id)
    ).scalar_one_or_none()

    if not exercise:
        return f"Exercise with id {exercise_id} does not exist.", 404

    if role == Role.ADMIN.name:
        if exercise.user_id is not None and exercise.user_id != user_id:
            return "You do not have access to this exercise.", 403
    else:
        return {
            "id": exercise.id,
            "user_id": exercise.user_id,
            "title": exercise.title,
            "description": exercise.description,
            "primary_muscle": exercise.primary_muscle,
            "other_muscles": [muscle for muscle in exercise.other_muscles],
            "equipment": exercise.equipment,
            "exercise_type": exercise.exercise_type,
        }, 200


def get_all_exercises_user(user_id):
    exercises = (
        db.session.execute(
            db.select(Exercise).filter(
                or_(Exercise.user_id == user_id, Exercise.user_id == None)
            )
        )
        .scalars()
        .all()
    )
    return [
        {
            "id": exercise.id,
            "user_id": exercise.user_id,
            "title": exercise.title,
            "description": exercise.description,
            "primary_muscle": exercise.primary_muscle,
            "other_muscles": [muscle for muscle in exercise.other_muscles],
            "equipment": exercise.equipment,
            "exercise_type": exercise.exercise_type,
        }
        for exercise in exercises
    ]


def get_all_exercises_admin():
    exercises = db.session.execute(db.select(Exercise)).scalars().all()
    return [
        {
            "id": exercise.id,
            "user_id": exercise.user_id,
            "title": exercise.title,
            "description": exercise.description,
            "primary_muscle": exercise.primary_muscle,
            "other_muscles": [muscle for muscle in exercise.other_muscles],
            "equipment": exercise.equipment,
            "exercise_type": exercise.exercise_type,
        }
        for exercise in exercises
    ]


def update_exercise(
    exercise_id,
    title,
    description,
    primary_muscle,
    other_muscles,
    equipment,
    exercise_type,
    identity,
):
    exercise = db.session.execute(
        db.select(Exercise).filter(Exercise.id == exercise_id)
    ).scalar_one_or_none()

    if not exercise:
        return None, True, "Exercise not found.", 404

    role, user_id = identity.get("role"), identity.get("id")
    if role == Role.ADMIN.name:
        if exercise.user_id is not None and exercise.user_id != user_id:
            return "You do not have access to this exercise.", 403

    if not _check_enums(
        primary_muscle, other_muscles, equipment, exercise_type
    ):
        return None, False, "Exercise parameters not valid.", 400

    exercise.title = title
    exercise.description = description
    exercise.primary_muscle = primary_muscle
    exercise.other_muscles = other_muscles
    exercise.equipment = equipment
    exercise.exercise_type = exercise_type

    db.session.commit()
    return exercise.id, True, "Exercise updated successfully.", 200


def delete_exercise(exercise_id, identity):
    role, user_id = identity.get("role"), identity.get("id")

    exercise = db.session.execute(
        db.select(Exercise).filter(Exercise.id == exercise_id)
    ).scalar_one_or_none()

    if not exercise:
        return "Exercise not found.", 404

    if role != Role.ADMIN.name and exercise.user_id != user_id:
        return "You do not have access to this exercise.", 403
    else:
        db.session.delete(exercise)
        db.session.commit()
        return "Exercise deleted successfully.", 200


def _create_exercise(
    user_id,
    title,
    description,
    primary_muscle,
    other_muscles,
    equipment,
    exercise_type,
):
    valid, message = _check_enums(
        primary_muscle, other_muscles, equipment, exercise_type
    )
    if not valid:
        return None, message

    title = title.strip()
    description = description.strip()

    if not title:
        return None, "Title cannot be empty."
    if len(title) > 50:
        return None, "Title cannot be longer than 50 characters."
    if len(description) > 500:
        return None, "Description cannot be longer than 500 characters."

    new_exercise = Exercise(
        user_id=user_id,
        title=title,
        description=description,
        primary_muscle=primary_muscle,
        other_muscles=other_muscles,
        equipment=equipment,
        exercise_type=exercise_type,
    )
    db.session.add(new_exercise)
    db.session.commit()
    return new_exercise, "Exercise created successfully."


def _check_enums(primary_muscle, other_muscles, equipment, exercise_type):
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
