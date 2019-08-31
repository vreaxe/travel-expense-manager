from backend.trip.models import Trip, Expense
from backend.graphql.exceptions import NotFoundError

def resolve_trips(info):
    user = info.context.user
    return Trip.objects.filter(users__id=user.id)

def resolve_trip(info, id=None):
    assert id, 'Id is required.'

    if id is not None:
        user = info.context.user
        return Trip.objects.get(id=id, users__id=user.id)

def resolve_expenses(info, trip_id):
    user = info.context.user
    return Expense.objects.filter(trip_id=trip_id).order_by('-date')

def resolve_expense(info, trip_id=None, expense_id=None):
    assert id, 'Id is required.'

    if id is not None:
        user = info.context.user
        return Expense.objects.get(id=expense_id, trip_id=trip_id, trip__users__id=user.id)
