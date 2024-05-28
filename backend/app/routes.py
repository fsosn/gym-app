from flask import Blueprint, request, jsonify
from .services import user_service
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid JSON payload"}), 400

    required_fields = ["first_name", "last_name", "email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    result, message = user_service.register(
        data.get("first_name"),
        data.get("last_name"),
        data.get("email"),
        data.get("password"),
    )
    if not result:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid JSON payload"}), 400

    required_fields = ["email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    result, user_or_message = user_service.authenticate(
        data.get("email"), data.get("password")
    )
    if not result:
        return jsonify({"message": user_or_message}), 401

    token = create_access_token(identity={"email": user_or_message.email})
    return jsonify({"message": "Logged in successfully.", "access_token": token}), 200
