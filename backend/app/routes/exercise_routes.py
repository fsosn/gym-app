from flask import Blueprint, request, jsonify
from app.decorators import admin_required
from app.services import exercise_service
from flask_jwt_extended import jwt_required, get_jwt_identity

exercise_bp = Blueprint("exercise", __name__)


@exercise_bp.route("/exercises", methods=["POST"])
@jwt_required()
def create_exercise_user():
    data = request.get_json()
    identity = get_jwt_identity()
    exercise, message = exercise_service.create_exercise(
        identity.get("id"),
        data.get("title"),
        data.get("description"),
        data.get("primary_muscle"),
        data.get("other_muscles", []),
        data.get("equipment"),
        data.get("exercise_type"),
    )
    if not exercise:
        return (
            jsonify({"message": message}),
            400,
        )
    else:
        return (
            jsonify({"message": message}),
            201,
        )


@exercise_bp.route("/admin/exercises", methods=["POST"])
@jwt_required()
@admin_required
def create_exercise_admin():
    data = request.get_json()
    exercise, message = exercise_service.create_exercise_admin(
        data.get("title"),
        data.get("description"),
        data.get("primary_muscle"),
        data.get("other_muscles", []),
        data.get("equipment"),
        data.get("exercise_type"),
    )
    if not exercise:
        return (
            jsonify({"message": message}),
            400,
        )
    else:
        return (
            jsonify({"message": message}),
            201,
        )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["GET"])
@jwt_required()
def get_exercise(exercise_id):
    identity = get_jwt_identity()
    result, status_code = exercise_service.get_exercise_by_id(
        exercise_id, identity
    )
    return result, status_code


@exercise_bp.route("/exercises", methods=["GET"])
@jwt_required()
def get_all_exercises_user():
    identity = get_jwt_identity()
    exercises = exercise_service.get_all_exercises_user(identity.get("id"))
    return (
        jsonify(exercises),
        200,
    )


@exercise_bp.route("/admin/exercises", methods=["GET"])
@jwt_required()
@admin_required
def get_all_exercises_admin():
    exercises = exercise_service.get_all_exercises_admin()
    return (
        jsonify(exercises),
        200,
    )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["PUT"])
@jwt_required()
def update_exercise(exercise_id):
    data = request.get_json()
    identity = get_jwt_identity()

    result, valid, message, status_code = exercise_service.update_exercise(
        exercise_id,
        data.get("title"),
        data.get("primary_muscle"),
        data.get("other_muscles", []),
        data.get("equipment"),
        data.get("exercise_type"),
        identity,
    )
    if not result and not valid:
        return jsonify({"message": message}), status_code

    return (
        jsonify({"message": message, "id": result}),
        200,
    )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["DELETE"])
@jwt_required()
def delete_exercise(exercise_id):
    identity = get_jwt_identity()

    message, status_code = exercise_service.delete_exercise(
        exercise_id, identity
    )
    return jsonify({"message": message}), status_code
