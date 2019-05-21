import graphene
from graphene_django.types import DjangoObjectType

from backend.trip.models import Trip, TripUser, Expense


class ExpenseType(DjangoObjectType):
    class Meta:
        model = Expense


class TripUserType(DjangoObjectType):
    class Meta:
        model = TripUser


class TripType(DjangoObjectType):
    # Rename field trip_user to users
    users = graphene.List(TripUserType)
    total_spent = graphene.Float()
    daily_avg_spent = graphene.Float()
    expenses = graphene.List(ExpenseType)

    @graphene.resolve_only_args
    def resolve_users(self):
        return self.trip_user.all()

    @graphene.resolve_only_args
    def resolve_total_spent(self):
        total = 0
        expenses = self.expenses.order_by('date').all()
        for expense in expenses:
            # TODO: Support exchange currency
            total += expense.amount

        return total

    @graphene.resolve_only_args
    def resolve_daily_avg_spent(self):
        # TODO: Improve. No repeat
        total = 0
        expenses = self.expenses.order_by('date').all()
        for expense in expenses:
            # TODO: Support exchange currency
            total += expense.amount

        last_expense = 0
        first_expense = 0

        if len(expenses) > 0:
            if expenses.last():
                last_expense = expenses.last().date.date()
            if expenses.first():
                first_expense = expenses.first().date.date()

            days = (last_expense - first_expense).days + 1

            return (total / days)

        return 0

    @graphene.resolve_only_args
    def resolve_expenses(self):
        return self.expenses.order_by('date').all()

    class Meta:
        model = Trip
        exclude_fields = ('trip_user',)
