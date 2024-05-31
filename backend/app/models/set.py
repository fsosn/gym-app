from ..extensions import db


class Set(db.Model):
    __tablename__ = "set"
    id = db.Column(db.Integer, primary_key=True)
    workout_exercise_id = db.Column(
        db.Integer, db.ForeignKey("workout_exercise.id"), nullable=False
    )
    reps = db.Column(db.Integer, default=0)
    weight = db.Column(db.Float, default=0)
    distance = db.Column(db.Float, default=0)
    duration = db.Column(db.String(10), default="00:00")
