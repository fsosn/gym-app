from ..models import User
from ..extensions import db


def register(first_name, last_name, email, password):
    try:
        if User.query.filter_by(email=email).first():
            return False, "User already exists"

        new_user = User(first_name=first_name, last_name=last_name, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return True, "Registered successfully."
    except Exception as e:
        return False, str(e)


def authenticate(email, password):
    try:
        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return False, "Invalid credentials"

        return True, user
    except Exception as e:
        return False, str(e)
