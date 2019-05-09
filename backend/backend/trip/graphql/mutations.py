import graphene
from django.db import IntegrityError, transaction
from graphql_jwt.decorators import login_required

from backend.graphql.exceptions import ValidationError
from backend.core.graphql.scalars import Decimal
from backend.trip.graphql.types import TripType
from backend.trip.models import Trip, TripUser
from backend.core.models import Currency
from backend.trip.constants import TripUserRoles
from backend.core.services import get_countries, get_currency
from backend.trip.permissions import UserIsInTripPermission
from backend.graphql.mutations import BaseMutation
from backend.graphql.decorators import permissions_required


class CreateTripInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    budget = Decimal(required=True)
    start_date = graphene.DateTime(required=True)
    end_date = graphene.DateTime(required=True)
    base_currency = graphene.Int(required=True)
    countries = graphene.List(graphene.ID, required=True)


class UpdateTripInput(graphene.InputObjectType):
    title = graphene.String()
    budget = Decimal()
    start_date = graphene.DateTime()
    end_date = graphene.DateTime()
    countries = graphene.List(graphene.ID)


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

    @permissions_required([UserIsInTripPermission,])
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
