from flask import Flask
from .config import BaseConfig
from .extensions import db, migrate, jwt
from .routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(BaseConfig)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)

    return app
