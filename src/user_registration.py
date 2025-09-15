# User Registration Feature Implementation

def register_user(name, email, password):
    # Validate input
    if not name or not email or not password:
        return "Error: Missing required fields"

    # Simulate registration logic
    return f"User {name} registered successfully with email {email}"