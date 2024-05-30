import re


def validate_register(first_name, last_name, email, password):
    if not first_name or not last_name or not email or not password:
        return False, "First name, last name, email and password are required."

    if len(first_name) < 2 or len(last_name) < 2:
        return False, "First name and last name must be at least 2 characters long."

    if len(first_name) > 50 or len(last_name) > 50:
        return False, "First name and last name must be maximum 50 characters long."

    valid_email, email_message = validate_email(email)

    if not valid_email:
        return False, email_message

    valid_password, message = validate_password(password)

    if not valid_password:
        return False, message

    return True, "Register credentials are valid."


def validate_login(email, password):
    valid_email, email_message = validate_email(email)

    if not valid_email:
        return False, email_message

    valid_password, message = validate_password(password)

    if not valid_password:
        return False, message

    return True, "Login credentials are valid."


def validate_email(email):
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    if not re.match(email_regex, email):
        return False, "Invalid email address."
    else:
        return True, "Valid email address."


def validate_password(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    if len(password) > 50:
        return False, "Password must be maximum 50 characters long."
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter."
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter."
    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least one digit."
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character."

    return True, "Password is valid."
