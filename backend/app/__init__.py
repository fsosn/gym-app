from flask import Flask
from .config import BaseConfig
from .extensions import db, migrate, jwt
from .routes.auth_routes import auth_bp
from .routes.exercise_routes import exercise_bp
from .routes.workout_routes import workout_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.json.sort_keys = False
    app.config.from_object(BaseConfig)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(exercise_bp)
    app.register_blueprint(workout_bp)

    return app
