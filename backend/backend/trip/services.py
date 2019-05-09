from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _

from backend.trip.models import Trip
from backend.graphql.exceptions import ValidationError

def get_trip(trip_id, field_name='trip'):
    try:
        trip = Trip.objects.get(id=trip_id)
        return trip
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Trip not found'}
        )
