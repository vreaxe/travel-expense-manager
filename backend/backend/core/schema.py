import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from graphql_jwt.decorators import login_required

from backend.core.models import User
from backend.core.graphql.types import UserType, CurrencyType, CountryType
from backend.core.graphql.mutations import RegisterUser
from backend.core.graphql.resolvers import resolve_currency, resolve_currencies, resolve_country, resolve_countries


class Query(ObjectType):
    me = graphene.Field(UserType)
    currencies = graphene.List(CurrencyType)
    currency = graphene.Field(CurrencyType, id=graphene.Argument(graphene.ID), code=graphene.String())
    countries = graphene.List(CountryType)
    country = graphene.Field(CountryType, id=graphene.Argument(graphene.ID), code=graphene.String())

    @login_required
    def resolve_me(self, info, **kwargs):
        return info.context.user

    @login_required
    def resolve_currencies(self, info, **kwargs):
        return resolve_currencies(info)

    @login_required
    def resolve_currency(self, info, id=None, code=None):
        return resolve_currency(info, id, code)

    @login_required
    def resolve_countries(self, info, **kwargs):
        return resolve_countries(info)

    @login_required
    def resolve_country(self, info, id=None, code=None):
        return resolve_country(info, id, code)


class Mutation(ObjectType):
    register_user = RegisterUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
