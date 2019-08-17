import graphene
from graphql import GraphQLError
from graphql_jwt.shortcuts import get_token
from graphql_jwt import JSONWebTokenMutation
from django.contrib.auth.models import update_last_login

from backend.graphql.exceptions import ValidationError
from backend.core.models import User
from backend.core.graphql.types import UserType
from backend.graphql.mutations import BaseMutation


class AuthenticationUserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class RegisterUser(BaseMutation):
    class Arguments:
        input = AuthenticationUserInput(required=True)

    class Meta:
        description = 'Register new user'

    token = graphene.String()
    user = graphene.Field(UserType)

    def perform_mutation(self, info, input):
        user_exists = User.objects.filter(email=input['email']).exists()
        if not user_exists:
            if len(input['password']) >= 8:
                user = User.objects.create_user(input['email'], input['password'])
                token = get_token(user)
                update_last_login(None, user)
                return RegisterUser(token=token, user=user)
            else:
                raise ValidationError(form_errors={'password': 'The password must have at least 8 characters'})
        else:
            raise ValidationError(form_errors={'email': 'This email is already taken.'})


class ObtainJSONWebToken(JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        update_last_login(None, info.context.user)
        return cls(user=info.context.user)
