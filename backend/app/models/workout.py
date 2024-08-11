from app.extensions import db


class Workout(db.Model):
    __tablename__ = "workout"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    begin_datetime = db.Column(db.DateTime)
    time = db.Column(db.String(10))
    volume = db.Column(db.Float, default=0)
    exercises = db.relationship(
        "WorkoutExercise",
        backref="workout",
        lazy=True,
        cascade="all, delete-orphan",
    )
