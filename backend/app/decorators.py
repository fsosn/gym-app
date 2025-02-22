from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask import jsonify
from app.models.user import User, Role


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()["id"]
        current_user = User.query.get(current_user_id)
        if not current_user or current_user.role.name != Role.ADMIN.name:
            return jsonify({"message": "Admin access required."}), 403
        return fn(*args, **kwargs)

    return wrapper
