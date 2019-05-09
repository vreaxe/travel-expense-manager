import graphene
from graphene_django.types import DjangoObjectType

from backend.trip.models import Trip, TripUser, Expense


class TripUserType(DjangoObjectType):
    class Meta:
        model = TripUser


class TripType(DjangoObjectType):
    # Rename field trip_user to users
    users = graphene.List(TripUserType)
    daily_budget = graphene.Float()

    @graphene.resolve_only_args
    def resolve_users(self):
        return self.trip_user.all()

    @graphene.resolve_only_args
    def resolve_daily_budget(self):
        total = 0
        expenses = self.expenses.all()
        for expense in expenses:
            # TODO: Support exchange currency
            total += expense.amount

        days = (expenses.last().created_at - expenses.first().created_at).days + 1

        return (total / days)

    class Meta:
        model = Trip
        exclude_fields = ('trip_user',)


class ExpenseType(DjangoObjectType):
    class Meta:
        model = Expense
