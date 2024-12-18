from app.extensions import db


class Routine(db.Model):
    __tablename__ = "routine"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    exercises = db.relationship(
        "RoutineExercise",
        backref="routine",
        lazy=True,
        cascade="all, delete-orphan",
    )
