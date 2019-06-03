import graphene
from django.db import IntegrityError, transaction
from graphql_jwt.decorators import login_required

from backend.graphql.exceptions import ValidationError
from backend.core.graphql.scalars import Decimal
from backend.trip.graphql.types import TripType, ExpenseType
from backend.trip.models import Trip, TripUser, Expense
from backend.core.models import Currency
from backend.trip.constants import TripUserRoles
from backend.core.services import get_countries, get_currency
from backend.trip.services import get_trip
from backend.trip.permissions import UserIsInTripPermission
from backend.graphql.mutations import BaseMutation
from backend.graphql.decorators import permission_classes


class CreateTripInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    budget = Decimal(required=True)
    start_date = graphene.DateTime(required=True)
    end_date = graphene.DateTime(required=True)
    base_currency = graphene.ID(required=True)
    countries = graphene.List(graphene.ID, required=True)


class UpdateTripInput(graphene.InputObjectType):
    title = graphene.String()
    budget = Decimal()
    start_date = graphene.DateTime()
    end_date = graphene.DateTime()
    countries = graphene.List(graphene.ID)


class CreateExpenseInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    amount = Decimal(required=True)
    date = graphene.DateTime(required=True)
    currency = graphene.ID(required=True)
    trip = graphene.ID(required=True)


class CreateTrip(BaseMutation):
    trip = graphene.Field(TripType)

    class Arguments:
        input = CreateTripInput(required=True)

    class Meta:
        description = 'Create trip'

    @login_required
    def perform_mutation(cls, info, input):
        base_currency = get_currency(input['base_currency'], 'base_currency')
        countries = get_countries(input['countries'])

        with transaction.atomic():
            trip = Trip(
                title=input['title'],
                budget=input['budget'],
                start_date=input['start_date'],
                end_date=input['end_date'],
                base_currency=base_currency,
            )
            trip.full_clean()
            trip.save()

            trip.countries.add(*countries)

            TripUser.objects.create(
                user=info.context.user,
                trip=trip,
                role=TripUserRoles.DEFAULT
            )
        return CreateTrip(trip=trip)


class UpdateTrip(BaseMutation):
    trip = graphene.Field(TripType)

    class Arguments:
        id = graphene.ID(required=True)
        input = UpdateTripInput(required=True)

    class Meta:
        description = 'Update trip'

    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, id, input):
        countries = None
        if 'countries' in input:
            countries = get_countries(input['countries'])

        with transaction.atomic():
            trip = Trip.objects.get(id=id)
            for key, value in input.items():
                setattr(trip, key, value)
            trip.full_clean()
            trip.save()

            if countries:
                trip.countries.add(*countries)
        return UpdateTrip(trip=trip)


class CreateExpense(BaseMutation):
    expense = graphene.Field(ExpenseType)

    class Arguments:
        input = CreateExpenseInput(required=True)

    class Meta:
        description = 'Create expense'

    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, input):
        currency = get_currency(input['currency'])
        trip = get_trip(input['trip'])

        with transaction.atomic():
            expense = Expense(
                title = input['title'],
                amount = input['amount'],
                date = input['date'],
                created_by = info.context.user,
                currency = currency,
                trip = trip,
            )
            expense.full_clean()
            expense.save()
        return CreateExpense(expense=expense)
