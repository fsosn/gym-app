from app.models.user import User, Role
import click
from app.extensions import db
from flask.cli import with_appcontext
from app.utils.validate import validate_register


@click.command("create-admin")
@with_appcontext
def create_admin():
    first_name = click.prompt("Enter first name", type=str)
    last_name = click.prompt("Enter last name", type=str)
    email = click.prompt("Enter email", type=str)
    password = click.prompt(
        "Enter password", type=str, hide_input=True, confirmation_prompt=True
    )

    valid, message = validate_register(first_name, last_name, email, password)
    if not valid:
        click.echo(f"Error: {message}")
        return

    existing_user = User.query.filter_by(email=email).first()
    if not existing_user:
        new_admin = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            role=Role.ADMIN,
        )
        new_admin.set_password(password)
        db.session.add(new_admin)
        db.session.commit()
        click.echo(f"Created admin user with email: {email}")
    else:
        click.echo(f"Admin user already exists with email: {email}")
