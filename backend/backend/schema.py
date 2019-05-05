import graphene
import graphql_jwt

import backend.core.schema


class Query(backend.core.schema.Query, graphene.ObjectType):
    pass


class Mutation(backend.core.schema.Mutation, graphene.ObjectType):
    token_auth = backend.core.graphql.mutations.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
