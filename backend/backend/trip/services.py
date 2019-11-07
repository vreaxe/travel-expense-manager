from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _

from backend.trip.models import Trip, TripCategory, Expense
from backend.graphql.exceptions import ValidationError

def get_trip(trip_id, field_name='trip'):
    try:
        return Trip.objects.get(id=trip_id)
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Trip not found'}
        )

def get_expense_in_trip(expense_id, trip_id, field_name='expense'):
    try:
        return Expense.objects.get(id=expense_id, trip_id=trip_id)
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Expense not found'}
        )

def get_category_in_trip(category_id, trip_id, field_name='category'):
    try:
        return TripCategory.objects.get(id=category_id, trip_id=trip_id)
    except ObjectDoesNotExist:
        raise ValidationError(
            form_errors={field_name: 'Category not found'}
        )
