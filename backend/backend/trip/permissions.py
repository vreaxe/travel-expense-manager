from backend.core.models import User
from backend.trip.models import Trip


class UserIsInTripPermission:
    @staticmethod
    def has_permission(info, **data):
        logged_user = info.context.user
        trip_id = None
        if 'id' in data:
            trip_id = data['id']
        elif 'trip_id' in data:
            trip_id = data['trip_id']
        elif 'trip' in data['input']:
            # TODO improve this
            trip_id = data['input']['trip']

        return Trip.objects.filter(id=trip_id, users__in=[logged_user]).exists()
