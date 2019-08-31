from django.core.exceptions import ValidationError

def validate_expense_created_by(tripId, user):
    from backend.trip.models import Trip
    if not Trip.objects.filter(id=tripId, users__id=user.id).exists():
        raise ValidationError({'created_by': 'This user doesn\'t belongs to the trip'})
