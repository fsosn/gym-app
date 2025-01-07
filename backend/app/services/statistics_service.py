from app.extensions import db
from app.models.workout.workout import Workout
from app.models.workout.workout_exercise import WorkoutExercise
from app.models.exercise import Exercise
from sqlalchemy import func, desc
from datetime import datetime, timezone, timedelta


def get_total_workouts(user_id):
    total_workouts = Workout.query.filter(Workout.user_id == user_id).count()
    return {
        "total_workouts": total_workouts,
    }, 200


def get_total_volume(user_id):
    total_volume = (
        Workout.query.filter(Workout.user_id == user_id)
        .with_entities(func.sum(Workout.volume))
        .scalar()
        or 0
    )
    return {
        "total_volume": total_volume,
    }, 200


def get_top_exercises(user_id, top=5):
    top_exercises = (
        db.session.query(
            Exercise.title, func.count(WorkoutExercise.id).label("count")
        )
        .join(WorkoutExercise, Exercise.id == WorkoutExercise.exercise_id)
        .join(Workout, WorkoutExercise.workout_id == Workout.id)
        .filter(Workout.user_id == user_id)
        .group_by(Exercise.title)
        .order_by(desc("count"))
        .limit(top)
        .all()
    )

    return [
        {"exercise": title, "count": count} for title, count in top_exercises
    ], 200


def get_muscle_distribution(user_id):
    areas = (
        db.session.query(
            Exercise.primary_muscle.label("muscle"),
            func.count(WorkoutExercise.id).label("count"),
        )
        .join(WorkoutExercise, Exercise.id == WorkoutExercise.exercise_id)
        .join(Workout, WorkoutExercise.workout_id == Workout.id)
        .filter(Workout.user_id == user_id)
        .group_by("muscle")
        .order_by(desc("count"))
        .all()
    )

    return [{"muscle": muscle, "count": count} for muscle, count in areas], 200


def get_workouts_over_time(user_id, period="week"):
    valid_periods = {"week", "month", "year"}

    if period not in valid_periods:
        return {
            "error": "Invalid period. Valid options are 'week', 'month', or 'year'."
        }, 400

    today = datetime.today()

    if period == "week":
        start_date = today - timedelta(days=today.weekday())
        step = timedelta(weeks=1)
        total_periods = 12
    elif period == "month":
        start_date = today.replace(day=1) - timedelta(days=1)
        start_date = start_date.replace(day=1)
        step = timedelta(days=30)
        total_periods = 12
    elif period == "year":
        start_date = today.replace(month=1, day=1)
        step = timedelta(days=365)
        total_periods = 3

    periods = []
    current_date = today
    for _ in range(total_periods):
        if period == "week":
            periods.append(
                current_date - timedelta(days=current_date.weekday())
            )
        elif period == "month":
            periods.append(current_date.replace(day=1))
        elif period == "year":
            periods.append(current_date.replace(month=1, day=1))
        current_date -= step

    periods.reverse()

    db_results = (
        Workout.query.filter(Workout.user_id == user_id)
        .with_entities(
            func.date_trunc(period, Workout.begin_datetime).label("period"),
            func.count(Workout.id).label("count"),
        )
        .group_by("period")
        .all()
    )

    db_results_dict = {row.period.date(): row.count for row in db_results}

    result = [
        {
            "date": period.strftime("%Y-%m-%d"),
            "workouts": db_results_dict.get(period.date(), 0),
        }
        for period in periods
    ]

    return result, 200


def get_streak(user_id):
    weekly_workouts = (
        Workout.query.filter(Workout.user_id == user_id)
        .with_entities(
            func.date_trunc("week", Workout.begin_datetime).label("week_start")
        )
        .distinct()
        .order_by(desc("week_start"))
        .all()
    )

    completed_workout_weeks = [
        week_start[0].date() for week_start in weekly_workouts
    ]

    streak = 0
    today = datetime.now(timezone.utc).date()
    week_start = today - timedelta(days=today.weekday())

    for completed_workout_week_start in completed_workout_weeks:
        if completed_workout_week_start == week_start:
            streak += 1
            week_start -= timedelta(weeks=1)
        else:
            break

    return {"streak": streak}, 200
