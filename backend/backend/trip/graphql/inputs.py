import graphene

from backend.core.graphql.scalars import Decimal

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
    category = graphene.ID(required=True)
    trip = graphene.ID(required=True)


class UpdateExpenseInput(graphene.InputObjectType):
    title = graphene.String()
    amount = Decimal()
    date = graphene.DateTime()
    category = graphene.ID()
