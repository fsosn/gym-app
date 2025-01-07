from flask import Flask
from app.config import BaseConfig
from app.extensions import db, migrate, jwt
from app.routes.auth_routes import auth_bp
from app.routes.exercise_routes import exercise_bp
from app.routes.workout_routes import workout_bp
from app.routes.routine_routes import routine_bp
from app.routes.statistics_routes import statistics_bp
from app.manage import create_admin
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
    app.register_blueprint(routine_bp)
    app.register_blueprint(statistics_bp)

    with app.app_context():
        app.cli.add_command(create_admin)

    return app
