from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.services import statistics_service

statistics_bp = Blueprint("statistics_bp", __name__)


@statistics_bp.route("/stats/total_workouts", methods=["GET"])
@jwt_required()
def get_total_workouts():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_total_workouts(user_id)
    return jsonify(result), status_code


@statistics_bp.route("/stats/total_volume", methods=["GET"])
@jwt_required()
def get_total_volume():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_total_volume(user_id)
    return jsonify(result), status_code


@statistics_bp.route("/stats/top_exercises", methods=["GET"])
@jwt_required()
def get_top_exercises():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_top_exercises(user_id)
    return jsonify(result), status_code


@statistics_bp.route("/stats/muscle_distribution", methods=["GET"])
@jwt_required()
def get_muscle_distribution():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_muscle_distribution(user_id)
    return jsonify(result), status_code


@statistics_bp.route(
    "/stats/workouts_over_time/<string:period>", methods=["GET"]
)
@jwt_required()
def get_workouts_over_time(period):
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_workouts_over_time(
        user_id, period
    )
    return jsonify(result), status_code


@statistics_bp.route("/stats/streak", methods=["GET"])
@jwt_required()
def get_streak():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = statistics_service.get_streak(user_id)
    return jsonify(result), status_code
