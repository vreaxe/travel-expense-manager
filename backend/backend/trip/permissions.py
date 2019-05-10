from backend.core.models import User
from backend.trip.models import Trip


class UserIsInTripPermission:
    @staticmethod
    def has_permission(info, **data):
        logged_user = info.context.user
        trip_id = data['id'] if 'id' in data else data['trip_id']
        return Trip.objects.filter(id=trip_id, users__in=[logged_user]).exists()
