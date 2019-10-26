import graphene
from django.db import IntegrityError, transaction
from graphql_jwt.decorators import login_required

from backend.graphql.exceptions import ValidationError
from backend.trip.graphql.types import TripType, ExpenseType
from backend.trip.graphql.inputs import CreateTripInput, UpdateTripInput, CreateOrUpdateTripCategoryInput, CreateExpenseInput, UpdateExpenseInput
from backend.trip.models import Trip, TripUser, TripCategory, Expense
from backend.core.models import Currency
from backend.trip.constants import TripUserRoles
from backend.core.services import get_countries, get_currency
from backend.trip.services import get_trip, get_expense_in_trip, get_category_in_trip
from backend.trip.permissions import UserIsInTripPermission
from backend.graphql.mutations import BaseMutation
from backend.graphql.decorators import permission_classes

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
        editable_fields = (
            'title',
            'budget',
            'start_date',
            'end_date',
            'countries',
        )

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, id, input):
        countries = None
        if 'countries' in input:
            countries = get_countries(input['countries'])

        with transaction.atomic():
            trip = Trip.objects.get(id=id)
            for key, value in input.items():
                if key in UpdateTrip._meta.editable_fields and key is not 'countries':
                    setattr(trip, key, value)
            trip.save()

            if 'countries' in UpdateTrip._meta.editable_fields and countries:
                trip.countries.set(countries)
        return UpdateTrip(trip=trip)


class DeleteTrip(BaseMutation):
    id = graphene.ID()

    class Arguments:
        id = graphene.ID(required=True)

    class Meta:
        description = 'Delete trip'

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, id):
        trip = get_trip(id)

        with transaction.atomic():
            trip.delete()

        return DeleteTrip(id=id)


class CreateOrUpdateTripCategory(BaseMutation):
    trip = graphene.Field(TripType)

    class Arguments:
        trip_id = graphene.ID(required=True)
        categories = graphene.List(CreateOrUpdateTripCategoryInput, required=True)

    class Meta:
        description = 'Create or update trip category'
        editable_fields = (
            'id',
            'name',
            'color',
        )

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, trip_id, categories):
        trip = get_trip(trip_id)

        with transaction.atomic():
            for category in categories:
                category_generated = {'id': None, 'name': None, 'color': None}

                for key, value in category.items():
                    if key in CreateOrUpdateTripCategory._meta.editable_fields:
                        category_generated[key] = value

                if category_generated.get('id'):
                    # Check if the id field exists. If exists, validate that this category belongs to the trip
                    get_category_in_trip(category_generated['id'], trip.id)
                    category_generated['trip'] = trip
                else:
                    category_generated['trip'] = trip

                TripCategory.objects.update_or_create(
                    id=category_generated['id'],
                    defaults=category_generated
                )
            trip.refresh_from_db()

        return CreateOrUpdateTripCategory(trip=trip)


class DeleteTripCategory(BaseMutation):
    id = graphene.ID()

    class Arguments:
        category_id= graphene.ID(required=True)
        trip_id = graphene.ID(required=True)

    class Meta:
        description = 'Delete category trip'

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, category_id, trip_id):
        category = get_category_in_trip(category_id, trip_id)

        with transaction.atomic():
            category.delete()

        return DeleteTripCategory(id=category_id)


class CreateExpense(BaseMutation):
    expense = graphene.Field(ExpenseType)

    class Arguments:
        input = CreateExpenseInput(required=True)

    class Meta:
        description = 'Create expense'

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, input):
        currency = get_currency(input['currency'])
        trip = get_trip(input['trip'])
        category = get_category_in_trip(input['category'], input['trip'])

        with transaction.atomic():
            expense = Expense(
                title = input['title'],
                amount = input['amount'],
                date = input['date'],
                created_by = info.context.user,
                currency = currency,
                category = category,
                trip = trip,
            )
            expense.save()
        return CreateExpense(expense=expense)


class UpdateExpense(BaseMutation):
    expense = graphene.Field(ExpenseType)

    class Arguments:
        expense_id = graphene.ID(required=True)
        trip_id = graphene.ID(required=True)
        input = UpdateExpenseInput(required=True)

    class Meta:
        description = 'Update expense'
        editable_fields = (
            'title',
            'amount',
            'date',
            'category',
        )

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, expense_id, trip_id, input):
        expense = get_expense_in_trip(expense_id, trip_id)
        category = get_category_in_trip(input['category'], trip_id)

        with transaction.atomic():
            expense = Expense.objects.get(id=expense_id)
            for key, value in input.items():
                if key in UpdateExpense._meta.editable_fields:
                    if key is 'category':
                        setattr(expense, key, category)
                    else:
                        setattr(expense, key, value)
            expense.save()

        return UpdateExpense(expense=expense)


class DeleteExpense(BaseMutation):
    id = graphene.ID()

    class Arguments:
        expense_id= graphene.ID(required=True)
        trip_id = graphene.ID(required=True)

    class Meta:
        description = 'Delete expense'

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def perform_mutation(cls, info, expense_id, trip_id):
        expense = get_expense_in_trip(expense_id, trip_id)

        with transaction.atomic():
            expense.delete()

        return DeleteExpense(id=expense_id)
