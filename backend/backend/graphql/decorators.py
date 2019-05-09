from backend.graphql.exceptions import PermissionDenied
from functools import wraps

def permissions_required(permissions=None):
    def decorator(function):
        @wraps(function)
        def wrapper(cls, info, **data):
            for permission in permissions:
                if not permission.has_permission(info, **data):
                    raise PermissionDenied()
            return function(cls, info, **data)
        return wrapper
    return decorator
