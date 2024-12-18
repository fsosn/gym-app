from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.services import routine_service

routine_bp = Blueprint("routine_bp", __name__)


@routine_bp.route("/routines", methods=["POST"])
@jwt_required()
def create_routine():
    data = request.get_json()
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = routine_service.create_routine(data, user_id)
    return jsonify(result), status_code


@routine_bp.route("/routines/<int:routine_id>", methods=["GET"])
@jwt_required()
def get_routine(routine_id):
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = routine_service.get_routine_by_id(
        routine_id, user_id
    )
    return jsonify(result), status_code


@routine_bp.route("/routines", methods=["GET"])
@jwt_required()
def get_all_routines():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = routine_service.get_all_routines(user_id)
    return jsonify(result), status_code


@routine_bp.route("/routines/<int:routine_id>", methods=["PUT"])
@jwt_required()
def update_routine(routine_id):
    data = request.get_json()
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = routine_service.update_routine(
        routine_id=routine_id,
        user_id=user_id,
        title=data.get("title"),
        description=data.get("description"),
    )
    return jsonify(result), status_code


@routine_bp.route("/routines/<int:routine_id>", methods=["DELETE"])
@jwt_required()
def delete_routine(routine_id):
    identity = get_jwt_identity()
    user_id = identity.get("id")
    result, status_code = routine_service.delete_routine(routine_id, user_id)
    return jsonify(result), status_code
