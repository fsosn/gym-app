from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.services import workout_service

workout_bp = Blueprint("workout_bp", __name__)


@workout_bp.route("/workouts", methods=["POST"])
@jwt_required()
def create_workout():
    data = request.get_json()
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = workout_service.create_workout(data, user_id)
    return jsonify(result), status_code


@workout_bp.route("/workouts/<int:workout_id>", methods=["GET"])
@jwt_required()
def get_workout(workout_id):
    identity = get_jwt_identity()
    user_id = identity.get("id")
    role = identity.get("role")
    result, status_code = workout_service.get_workout_by_id(
        workout_id, user_id, role
    )
    return jsonify(result), status_code


@workout_bp.route("/workouts", methods=["GET"])
@jwt_required()
def get_all_workouts():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    role = identity.get("role")
    result, status_code = workout_service.get_all_workouts(user_id, role)
    return jsonify(result), status_code


@workout_bp.route("/workouts/<int:workout_id>", methods=["PUT"])
@jwt_required()
def update_workout(workout_id):
    data = request.get_json()
    result, status_code = workout_service.update_workout(
        workout_id=workout_id,
        title=data.get("title"),
        begin_datetime=data.get("begin_datetime"),
        time=data.get("time"),
        exercises=data.get("exercises"),
    )
    return jsonify(result), status_code


@workout_bp.route("/workouts/<int:workout_id>", methods=["DELETE"])
@jwt_required()
def delete_workout(workout_id):
    identity = get_jwt_identity()
    user_id = identity.get("id")
    role = identity.get("role")
    result, status_code = workout_service.delete_workout(
        workout_id, user_id, role
    )
    return jsonify(result), status_code
