import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from graphql_jwt.decorators import login_required

from backend.core.models import User
from backend.core.graphql.types import UserType, CurrencyType
from backend.core.graphql.mutations import RegisterUser
from backend.core.graphql.resolvers import resolve_currency, resolve_currencies


class Query(ObjectType):
    me = graphene.Field(UserType)
    currencies = graphene.List(CurrencyType)
    currency = graphene.Field(CurrencyType, id=graphene.Argument(graphene.ID), code=graphene.String())

    @login_required
    def resolve_me(self, info, **kwargs):
        return info.context.user

    @login_required
    def resolve_currencies(self, info, **kwargs):
        return resolve_currencies(info)

    @login_required
    def resolve_currency(self, info, id=None, code=None):
        return resolve_currency(info, id, code)


class Mutation(ObjectType):
    register_user = RegisterUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
