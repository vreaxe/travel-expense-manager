import graphene
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError, transaction

from backend.graphql.exceptions import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from backend.core.graphql.scalars import Decimal
from backend.trip.graphql.types import TripType
from backend.trip.models import Trip, TripUser
from backend.core.models import Currency
from backend.trip.constants import TripUserRoles
from backend.core.services import get_countries, get_currency


class TripInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    budget = Decimal(required=True)
    start_date = graphene.DateTime(required=True)
    end_date = graphene.DateTime(required=True)
    base_currency = graphene.Int(required=True)
    countries = graphene.List(graphene.ID, required=True)


class CreateTrip(graphene.Mutation):
    class Arguments:
        input = TripInput(required=True)

    class Meta:
        description = 'Create trip'

    trip = graphene.Field(TripType)

    def mutate(self, info, input):
        base_currency = get_currency(input['base_currency'], 'base_currency')
        countries = get_countries(input['countries'])

        try:
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
        except DjangoValidationError as django_validation_error:
            raise ValidationError(form_errors=django_validation_error.message_dict)
        return CreateTrip(trip=trip)
