from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token
from app.utils.validate import validate_register, validate_login


def register(first_name, last_name, email, password):
    if email and User.query.filter_by(email=email).first():
        return False, "User already exists."

    valid, message = validate_register(first_name, last_name, email, password)

    if not valid:
        return False, message

    new_user = User(first_name=first_name, last_name=last_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return True, "Registered successfully."


def authenticate(email, password):
    valid, message = validate_login(email, password)
    if not valid:
        return False, message

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return False, "Invalid credentials."

    token = create_access_token(
        identity={"id": user.id, "email": user.email, "role": user.role.name}
    )

    return True, token
