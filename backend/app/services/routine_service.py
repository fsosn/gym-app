from app.extensions import db
from app.models.routine.routine import Routine
from app.models.routine.routine_exercise import RoutineExercise
from app.models.routine.routine_set import RoutineSet
from app.models.exercise import Exercise
from sqlalchemy.exc import SQLAlchemyError


def create_routine(data, user_id):
    try:
        title = data.get("title")
        description = data.get("description")

        if not title:
            return {"error": "Title is required"}, 400

        routine = Routine(
            user_id=user_id, title=title, description=description
        )
        db.session.add(routine)
        db.session.flush()

        for exercise_data in data["exercises"]:
            routine_exercise = RoutineExercise(
                routine_id=routine.id,
                exercise_id=exercise_data["exercise_id"],
                position=exercise_data["position"],
            )
            db.session.add(routine_exercise)
            db.session.flush()

            for set_data in exercise_data["sets"]:
                weight = set_data.get("weight", 0)
                reps = set_data.get("reps", 0)
                distance = set_data.get("distance", 0)
                duration = set_data.get("duration", "00:00")

                routine_set = RoutineSet(
                    routine_exercise_id=routine_exercise.id,
                    reps=reps,
                    weight=weight,
                    distance=distance,
                    duration=duration,
                )
                db.session.add(routine_set)

        db.session.commit()

        return {
            "message": "Routine created successfully",
            "id": routine.id,
        }, 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500


def get_routine_by_id(routine_id, user_id):
    routine = Routine.query.filter_by(id=routine_id, user_id=user_id).first()
    if not routine:
        return {"error": "Routine not found"}, 404

    routine_data = {
        "id": routine.id,
        "title": routine.title,
        "description": routine.description,
        "exercises": [
            {
                "id": re.id,
                "title": Exercise.query.get(re.exercise_id).title,
                "position": re.position,
                "sets": [
                    {
                        "id": rs.id,
                        "reps": rs.reps,
                        "weight": rs.weight,
                        "distance": rs.distance,
                        "duration": rs.duration,
                    }
                    for rs in re.sets
                ],
            }
            for re in routine.exercises
        ],
    }
    return routine_data, 200


def get_all_routines(user_id):
    routines = Routine.query.filter_by(user_id=user_id).all()
    routines_data = [
        {
            "id": routine.id,
            "title": routine.title,
            "description": routine.description,
        }
        for routine in routines
    ]
    return routines_data, 200


def update_routine(routine_id, user_id, title, description):
    routine = Routine.query.filter_by(id=routine_id, user_id=user_id).first()
    if not routine:
        return {"error": "Routine not found"}, 404

    if title:
        routine.title = title
    if description:
        routine.description = description

    try:
        db.session.commit()
        return {"message": "Routine updated successfully"}, 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500


def delete_routine(routine_id, user_id):
    routine = Routine.query.filter_by(id=routine_id, user_id=user_id).first()
    if not routine:
        return {"error": "Routine not found"}, 404

    try:
        db.session.delete(routine)
        db.session.commit()
        return {"message": "Routine deleted successfully"}, 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500
