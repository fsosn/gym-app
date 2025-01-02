from app.models.workout.workout import Workout
from app.models.workout.workout_exercise import WorkoutExercise
from app.models.workout.workout_set import Set
from app.models.exercise import Exercise
from app.extensions import db


def create_workout(data, user_id):
    workout = Workout(
        user_id=user_id,
        title=data["title"],
        begin_datetime=data["begin_datetime"],
        time=data["time"],
    )
    db.session.add(workout)
    db.session.flush()

    total_volume = 0

    for exercise_data in data["exercises"]:
        workout_exercise = WorkoutExercise(
            workout_id=workout.id, exercise_id=exercise_data["exercise_id"]
        )
        db.session.add(workout_exercise)
        db.session.flush()

        for set_data in exercise_data["sets"]:
            weight = set_data.get("weight", 0)
            reps = set_data.get("reps", 0)
            distance = set_data.get("distance", 0)
            duration = set_data.get("duration", "00:00")
            set_volume = weight * reps
            total_volume += set_volume

            workout_set = Set(
                workout_exercise_id=workout_exercise.id,
                reps=reps,
                weight=weight,
                distance=distance,
                duration=duration,
            )
            db.session.add(workout_set)

    workout.volume = total_volume
    db.session.commit()

    return {
        "message": "Workout created.",
        "workout_id": workout.id,
    }, 201


def get_workout_by_id(workout_id, user_id, role):
    workout = Workout.query.get(workout_id)

    if not workout:
        return {"message": "Workout not found"}, 404

    if user_id != workout.user_id and role != "ADMIN":
        return (
            {"message": "Cannot get another user's workout."},
            403,
        )

    return (
        {
            "id": workout.id,
            "title": workout.title,
            "begin_datetime": workout.begin_datetime,
            "time": workout.time,
            "exercises": [
                {
                    "exercise_id": we.exercise_id,
                    "exercise_title": Exercise.query.get(we.exercise_id).title,
                    "sets": [
                        {
                            "reps": s.reps,
                            "weight": s.weight,
                            "distance": s.distance,
                            "duration": s.duration,
                        }
                        for s in we.sets
                    ],
                }
                for we in workout.exercises
            ],
        },
        200,
    )


def get_all_workouts(user_id, role):
    if role == "ADMIN":
        workouts = Workout.query.all()
    else:
        workouts = Workout.query.filter_by(user_id=user_id).all()

    return [
        {
            "id": workout.id,
            "user_id": workout.user_id,
            "title": workout.title,
            "begin_datetime": workout.begin_datetime,
            "time": workout.time,
            "exercises": [
                {
                    "exercise_id": we.exercise_id,
                    "exercise_title": Exercise.query.get(we.exercise_id).title,
                    "sets": [
                        {
                            "reps": s.reps,
                            "weight": s.weight,
                            "distance": s.distance,
                            "duration": s.duration,
                        }
                        for s in we.sets
                    ],
                }
                for we in workout.exercises
            ],
        }
        for workout in workouts
    ], 200


def update_workout(workout_id, title, begin_datetime, time, exercises):
    workout = Workout.query.get(workout_id)
    if not workout:
        return {"message": "Workout not found"}, 404

    workout.title = title
    workout.begin_datetime = begin_datetime
    workout.time = time

    existing_exercises = {we.id: we for we in workout.exercises}

    for exercise_data in exercises:
        exercise_id = exercise_data["exercise_id"]
        sets_data = exercise_data["sets"]

        if "id" in exercise_data and exercise_data["id"] in existing_exercises:
            workout_exercise = existing_exercises.pop(exercise_data["id"])
        else:
            workout_exercise = WorkoutExercise(
                workout_id=workout.id,
                exercise_id=exercise_id,
            )
            db.session.add(workout_exercise)
            db.session.commit()

        existing_sets = {s.id: s for s in workout_exercise.sets}
        for set_data in sets_data:
            if "id" in set_data and set_data["id"] in existing_sets:
                workout_set = existing_sets.pop(set_data["id"])
            else:
                workout_set = Set(workout_exercise_id=workout_exercise.id)

            workout_set.reps = set_data.get("reps", 0)
            workout_set.weight = set_data.get("weight", 0)
            workout_set.distance = set_data.get("distance", 0)
            workout_set.duration = set_data.get("duration", "")
            db.session.add(workout_set)

        for remaining_set in existing_sets.values():
            db.session.delete(remaining_set)

    for remaining_exercise in existing_exercises.values():
        db.session.delete(remaining_exercise)

    db.session.commit()
    return {"message": "Workout successfully updated."}, 200


def delete_workout(workout_id, user_id, role):
    workout = Workout.query.get(workout_id)
    if not workout:
        return {"message": "Workout not found"}, 404

    if user_id != workout.user_id and role != "ADMIN":
        return (
            {"message": "Cannot delete another user's workout."},
            403,
        )

    db.session.delete(workout)
    db.session.commit()
    return {"message": "Workout deleted successfully"}, 200
