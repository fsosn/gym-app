from flask import Blueprint, request, jsonify
from ..services import auth_service
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid JSON payload."}), 400

    required_fields = ["first_name", "last_name", "email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields."}), 400

    success, message = auth_service.register(
        data.get("first_name"),
        data.get("last_name"),
        data.get("email"),
        data.get("password"),
    )
    if not success:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    valid, result = auth_service.authenticate(data.get("email"), data.get("password"))
    if not valid:
        return jsonify({"message": result}), 401

    return jsonify({"message": "Logged in successfully.", "token": result}), 200


@auth_bp.route("/check-account-details", methods=["GET"])
@jwt_required()
def check_details():
    identity = get_jwt_identity()
    id = identity.get("id")
    email = identity.get("email")
    role = identity.get("role")
    return jsonify({"id": id, "email": email, "role": role}), 200
