import graphene
from graphql import GraphQLError

from backend.graphql.exceptions import ValidationError
from backend.core.models import User
from backend.core.graphql.types import UserType


class AuthenticationUserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class RegisterUser(graphene.Mutation):
    class Arguments:
        input = AuthenticationUserInput(required=True)

    class Meta:
        description = 'Register new user'

    user = graphene.Field(UserType)

    def mutate(self, info, input):
        user_exists = User.objects.filter(email=input['email']).exists()
        if not user_exists:
            user = User.objects.create_user(input['email'], input['password'])
            return RegisterUser(user=user)
        else:
            raise ValidationError(form_errors={'email': "This email is already taken."})
