import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from graphql_jwt.decorators import login_required

from backend.trip.graphql.types import TripType, TripCategoryType, ExpenseType
from backend.trip.graphql.resolvers import resolve_trips, resolve_trip, resolve_trip_categories, resolve_expense, resolve_expenses
from backend.trip.graphql.mutations import CreateTrip, UpdateTrip, DeleteTrip, CreateExpense, UpdateExpense, DeleteExpense
from backend.trip.permissions import UserIsInTripPermission
from backend.graphql.decorators import permission_classes


class Query(ObjectType):
    trips = graphene.List(TripType)
    trip = graphene.Field(TripType, id=graphene.Argument(graphene.ID))
    trip_categories = graphene.List(TripCategoryType, trip_id=graphene.Argument(graphene.ID))
    expenses = graphene.List(ExpenseType, trip_id=graphene.Argument(graphene.ID))
    expense = graphene.Field(ExpenseType, trip_id=graphene.Argument(graphene.ID), expense_id=graphene.Argument(graphene.ID))

    @login_required
    def resolve_trips(self, info, **kwargs):
        return resolve_trips(info)

    @login_required
    def resolve_trip(self, info, id):
        return resolve_trip(info, id)

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def resolve_trip_categories(self, info, trip_id):
        return resolve_trip_categories(info, trip_id)

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def resolve_expenses(self, info, trip_id):
        return resolve_expenses(info, trip_id)

    @login_required
    @permission_classes([UserIsInTripPermission,])
    def resolve_expense(self, info, trip_id, expense_id):
        return resolve_expense(info, trip_id, expense_id)


class Mutation(ObjectType):
    create_trip = CreateTrip.Field()
    update_trip = UpdateTrip.Field()
    delete_trip = DeleteTrip.Field()
    create_expense = CreateExpense.Field()
    update_expense = UpdateExpense.Field()
    delete_expense = DeleteExpense.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
