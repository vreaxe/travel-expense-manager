import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from graphql_jwt.decorators import login_required

from backend.trip.graphql.types import TripType, ExpenseType
from backend.trip.graphql.resolvers import resolve_trips, resolve_trip, resolve_expense
from backend.trip.graphql.mutations import CreateTrip, UpdateTrip


class Query(ObjectType):
    trips = graphene.List(TripType)
    trip = graphene.Field(TripType, id=graphene.Argument(graphene.ID))
    expense = graphene.Field(ExpenseType, id=graphene.Argument(graphene.ID))

    @login_required
    def resolve_trips(self, info, **kwargs):
        return resolve_trips(info)

    @login_required
    def resolve_trip(self, info, id):
        return resolve_trip(info, id)

    @login_required
    def resolve_expense(self, info, id):
        return resolve_expense(info, id)


class Mutation(ObjectType):
    create_trip = CreateTrip.Field()
    update_trip = UpdateTrip.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
