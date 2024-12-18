from app.extensions import db


class RoutineExercise(db.Model):
    __tablename__ = "routine_exercise"
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(
        db.Integer, db.ForeignKey("routine.id"), nullable=False
    )
    exercise_id = db.Column(
        db.Integer, db.ForeignKey("exercise.id"), nullable=False
    )
    position = db.Column(db.Integer, nullable=False)
    sets = db.relationship(
        "RoutineSet",
        backref="routine_exercise",
        lazy=True,
        cascade="all, delete-orphan",
    )
