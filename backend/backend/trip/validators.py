from django.core.exceptions import ValidationError

def validate_expense_created_by(tripId, user):
    from backend.trip.models import Trip
    if not Trip.objects.filter(id=tripId, users__id=user.id).exists():
        raise ValidationError({'created_by': 'This user doesn\'t belongs to the trip'})

def validate_expense_category_belongs_to_trip(tripId, categoryId):
    from backend.trip.models import TripCategory
    if not TripCategory.objects.filter(id=categoryId, trip_id=tripId).exists():
        raise ValidationError({'category': 'This category doesn\'t belongs to the trip'})
