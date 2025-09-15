# Shopping Cart Management Feature Implementation

def manage_cart(action, item, quantity=1):
    # Simulate cart management logic
    if action == "add":
        return f"Added {quantity} of {item} to the cart"
    elif action == "remove":
        return f"Removed {item} from the cart"
    elif action == "update":
        return f"Updated {item} quantity to {quantity}"
    else:
        return "Error: Invalid cart action"