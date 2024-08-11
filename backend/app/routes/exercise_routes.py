from flask import Blueprint, request, jsonify
from app.services import exercise_service
from flask_jwt_extended import jwt_required
from app.decorators import admin_required

exercise_bp = Blueprint("exercise", __name__)


@exercise_bp.route("/exercises", methods=["POST"])
@jwt_required()
@admin_required
def create_exercise():
    data = request.get_json()

    exercise, message = exercise_service.create_exercise(
        data.get("title"),
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

    return (
        jsonify({"message": message}),
        201,
    )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["GET"])
@jwt_required()
def get_exercise(exercise_id):
    exercise = exercise_service.get_exercise_by_id(exercise_id)
    if not exercise:
        return jsonify({"message": "Exercise not found"}), 404

    return (
        jsonify(
            {
                "id": exercise.id,
                "title": exercise.title,
                "primary_muscle": exercise.primary_muscle,
                "other_muscles": [muscle for muscle in exercise.other_muscles],
                "equipment": exercise.equipment,
                "exercise_type": exercise.exercise_type,
            }
        ),
        200,
    )


@exercise_bp.route("/exercises", methods=["GET"])
@jwt_required()
def get_all_exercises():
    exercises = exercise_service.get_all_exercises()
    return (
        jsonify(
            [
                {
                    "id": exercise.id,
                    "title": exercise.title,
                    "primary_muscle": exercise.primary_muscle,
                    "other_muscles": [
                        muscle for muscle in exercise.other_muscles
                    ],
                    "equipment": exercise.equipment,
                    "exercise_type": exercise.exercise_type,
                }
                for exercise in exercises
            ]
        ),
        200,
    )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["PUT"])
@jwt_required()
@admin_required
def update_exercise(exercise_id):
    data = request.get_json()

    exercise, valid, message = exercise_service.update_exercise(
        exercise_id,
        data.get("title"),
        data.get("primary_muscle"),
        data.get("other_muscles", []),
        data.get("equipment"),
        data.get("exercise_type"),
    )
    if not exercise and not valid:
        return jsonify({"message": message}), 400
    if not exercise:
        return jsonify({"message": message}), 404

    return (
        jsonify({"message": message, "id": exercise.id}),
        200,
    )


@exercise_bp.route("/exercises/<int:exercise_id>", methods=["DELETE"])
@jwt_required()
@admin_required
def delete_exercise(exercise_id):
    success = exercise_service.delete_exercise(exercise_id)
    if not success:
        return jsonify({"message": "Exercise not found"}), 404

    return jsonify({"message": "Exercise deleted successfully."}), 200
