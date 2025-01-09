from app.extensions import db


class RoutineSet(db.Model):
    __tablename__ = "routine_set"
    id = db.Column(db.Integer, primary_key=True)
    routine_exercise_id = db.Column(
        db.Integer, db.ForeignKey("routine_exercise.id"), nullable=False
    )
    reps = db.Column(db.Integer, default=0)
    weight = db.Column(db.Float, default=0)
    distance = db.Column(db.Float, default=0)
    duration = db.Column(db.Integer, default=0)
