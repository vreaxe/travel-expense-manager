import graphene
import graphql_jwt

from backend.core.schema import Mutation as CoreMutation, Query as CoreQuery
from backend.core.graphql.mutations import ObtainJSONWebToken
from backend.trip.schema import Mutation as TripMutation, Query as TripQuery

class Query(
    CoreQuery,
    TripQuery,
    graphene.ObjectType
):
    pass


class Mutation(
    CoreMutation,
    TripMutation,
    graphene.ObjectType
):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
